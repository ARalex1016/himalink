import { create } from "zustand";

// Components
import AlertBox from "../Components/AlertBox";

// Firebase
import { auth, googleProvider, db } from "../config/firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Utils
import { getUserDetailsWithIPAPI } from "../Utils/UserDetails";

// Type
import type { User, Country } from "../type";

interface ManualSigninData {
  email: string;
  password: string;
}

interface AuthStore {
  user: User | null;
  country: Country | null;
  setuser: (user: User | null) => void;
  setCountry: (country: Country | null) => void;
  signinWithGoogle: () => Promise<void>;
  signinManual: (data: ManualSigninData) => Promise<void>;
  loginManual: (data: ManualSigninData) => Promise<void>;
  logout: () => Promise<void>;
}

const createUserDocIfNotExists = async (user: User) => {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      displayName: user.displayName || "No Name",
      email: user.email || "No Email",
      emailVerified: user.emailVerified,
      phone: user.phone || null,
      photoURL: user.photoURL || null,
      createdAt: new Date(),
    });
  }
};

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  country: {
    name: "",
    code: "",
    currency: "",
  },

  setuser: (user: User | null) => set({ user }),

  setCountry: (country: Country | null) => set({ country }),

  signinWithGoogle: async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);

      const firebaseUser = res.user;

      const user: User = {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName || "No Name",
        email: firebaseUser.email || "No Email",
        emailVerified: firebaseUser.emailVerified,
        phone: firebaseUser.phoneNumber || undefined,
        photoURL: firebaseUser.photoURL || undefined,
      };

      // Create Firestore document if not exists
      await createUserDocIfNotExists(user);

      set({ user });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  signinManual: async ({ email, password }) => {
    try {
      let res = await createUserWithEmailAndPassword(auth, email, password);

      const firebaseUser = res.user;

      const user: User = {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName || "No Name",
        email: firebaseUser.email || "No Email",
        emailVerified: firebaseUser.emailVerified,
        phone: firebaseUser.phoneNumber || undefined,
        photoURL: firebaseUser.photoURL || undefined,
      };

      // Create Firestore document if not exists
      await createUserDocIfNotExists(user);

      set({ user });
    } catch (error: any) {
      throw new Error(error);
    }
  },

  loginManual: async ({ email, password }) => {
    try {
      let res = await signInWithEmailAndPassword(auth, email, password);

      const firebaseUser = res.user;

      const user: User = {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName || "No Name",
        email: firebaseUser.email || "No Email",
        emailVerified: firebaseUser.emailVerified,
        phone: firebaseUser.phoneNumber || undefined,
        photoURL: firebaseUser.photoURL || undefined,
      };

      set({ user });
    } catch (error: any) {
      throw new Error(error);
    }
  },

  logout: async () => {
    try {
      await auth.signOut();

      set({ user: null });
    } catch (error: any) {
      throw new Error(error);
    }
  },
}));

export const initAuthListener = () => {
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (!firebaseUser) {
      const setCountry = useAuthStore.getState().setCountry;

      try {
        let data = await getUserDetailsWithIPAPI();

        setCountry({
          name: data.country_name,
          code: data.country,
          currency: data.currency,
          lng: data.longitude,
          lat: data.latitude,
        });
      } catch (error: any) {
        AlertBox({
          title: "Error",
          text: "Error getting your location",
          icon: "error",
        });
      }
    } else {
    }
  });
};

export default useAuthStore;
