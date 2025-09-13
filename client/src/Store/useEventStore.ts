import { create } from "zustand";

// Firebase
import { db } from "../config/firebase";
import { collection, doc, addDoc, getDocs, getDoc } from "firebase/firestore";

// Type
import type { Event } from "../type";

interface EventStore {
  events: Event[];
  getEvents: () => Promise<void>;
  getEvent: (eventId: string) => Promise<Event | null>;
  createEvent: (event: Event) => Promise<void>;
}

const useEventStore = create<EventStore>((set) => ({
  events: [],

  getEvents: async () => {
    try {
      const snapshot = await getDocs(collection(db, "events"));

      const events: Event[] = snapshot.docs.map((doc) => {
        const data = doc.data() as Event;
        return { id: doc.id, ...data };
      });

      set({ events });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  getEvent: async (eventId) => {
    try {
      const eventSnap = await getDoc(doc(db, "events", eventId));

      if (eventSnap.exists()) {
        const data = eventSnap.data() as Event;
        return { id: eventSnap.id, ...data };
      }

      // ✅ Always return null if not found
      return null;
    } catch (error: any) {
      console.log("No such document!");
      throw new Error(error.message);
    }
  },

  createEvent: async (event: Event) => {
    try {
      const docRef = await addDoc(collection(db, "events"), event);

      console.log("Document written with ID:", docRef.id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
}));

export default useEventStore;
