import { create } from "zustand";

// Firebase
import { auth, googleProvider } from "../config/firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Type
import type { User } from "../type";

interface ManualSigninData {
  email: string;
  password: string;
}

interface AuthStore {
  user: User | null;
  setuser: (user: User | null) => void;
  signinWithGoogle: () => Promise<void>;
  signinManual: (data: ManualSigninData) => Promise<void>;
  loginManual: (data: ManualSigninData) => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setuser: (user: User | null) => set({ user }),

  signinWithGoogle: async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);

      const firebaseUser = res.user;

      const user: User = {
        id: firebaseUser.uid,
        displayName: firebaseUser.displayName || "No Name",
        email: firebaseUser.email || "No Email",
        emailVerified: firebaseUser.emailVerified,
        phoneNumber: firebaseUser.phoneNumber || undefined,
        providerId: firebaseUser.providerId,
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

      console.log(res);
    } catch (error: any) {
      throw new Error(error);
    }
  },

  loginManual: async ({ email, password }) => {
    try {
      let res = await signInWithEmailAndPassword(auth, email, password);

      const firebaseUser = res.user;

      const user: User = {
        id: firebaseUser.uid,
        displayName: firebaseUser.displayName || "No Name",
        email: firebaseUser.email || "No Email",
        emailVerified: firebaseUser.emailVerified,
        phoneNumber: firebaseUser.phoneNumber || undefined,
        providerId: firebaseUser.providerId,
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
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      const user: User = {
        id: firebaseUser.uid,
        displayName: firebaseUser.displayName || "No Name",
        email: firebaseUser.email || "No Email",
        emailVerified: firebaseUser.emailVerified,
        phoneNumber: firebaseUser.phoneNumber || undefined,
        providerId: firebaseUser.providerId,
        photoURL: firebaseUser.photoURL || undefined,
      };

      useAuthStore.getState().setuser(user);
    } else {
      useAuthStore.getState().setuser(null);
    }
  });
};

export default useAuthStore;
