// Store/useUserStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

// Type
import type { User } from "../type";

interface UserStore {
  /**
   * Fetch user details by userId
   * @param userId - Firebase UID of the user
   * @returns User object or null if not found
   */
  getUserById: (userId: string) => Promise<User | null>;
}

export const useUserStore = create<UserStore>()(
  devtools(() => ({
    getUserById: async (userId) => {
      if (!userId) return null;
      try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          console.warn(`User not found for ID: ${userId}`);
          return null;
        }
        return userSnap.data() as User;
      } catch (error) {
        console.error("Error fetching user:", error);
        return null;
      }
    },
  }))
);
