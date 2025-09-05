import { create } from "zustand";

// Firebase
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";

// Type
import type { AuthStore, User } from "../type";

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setuser: (user: User) => set({ user }),

  signupWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const firebaseUser = result.user;

      console.log(result.user);

      const user: User = {
        id: firebaseUser.uid,
        displayName: firebaseUser.displayName || "No Name",
        email: firebaseUser.email || "No Email",
      };

      set({ user });
    } catch (error: any) {}
  },

  logout: async () => {},
}));

export default useAuthStore;
