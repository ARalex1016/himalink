import { create } from "zustand";

// Firebase
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

interface FileStore {
  uploading: boolean;
  uploadProgress: number;
  uploadFile: (file: File, folder?: string) => Promise<string | null>;
}

export const useFileStore = create<FileStore>((set) => ({
  uploading: false,
  uploadProgress: 0,

  uploadFile: async (file, folder = "uploads") => {
    set({ uploading: true, uploadProgress: 0 });

    try {
      const fileRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            set({ uploadProgress: progress });
          },
          (error) => {
            console.error("Upload error:", error);
            set({ uploading: false, uploadProgress: 0 });
            reject(null);
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            set({ uploading: false, uploadProgress: 100 });
            resolve(url);
          }
        );
      });
    } catch (err) {
      console.error(err);
      set({ uploading: false, uploadProgress: 0 });
      return null;
    }
  },
}));
