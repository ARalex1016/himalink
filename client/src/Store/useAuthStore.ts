import { create } from "zustand";

// Firebase
import { auth, googleProvider } from "../config/firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Utils
import { getUserDetails } from "../Utils/UserDetails";

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
    const data = await getUserDetails();

    const country: Country = {
      name: data?.country,
      code: data?.country_code,
      currency: data?.currency,
    };

    if (firebaseUser) {
      const user: User = {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName || "No Name",
        email: firebaseUser.email || "No Email",
        emailVerified: firebaseUser.emailVerified,
        phone: firebaseUser.phoneNumber || undefined,
        photoURL: firebaseUser.photoURL || undefined,
      };

      useAuthStore.getState().setuser(user);
      useAuthStore.getState().setCountry(country);
    } else {
      useAuthStore.getState().setuser(null);
      useAuthStore.getState().setCountry(country);
    }
  });
};

export default useAuthStore;
