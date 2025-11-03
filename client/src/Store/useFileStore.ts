import { create } from "zustand";
import axios from "axios";

interface FileState {
  isUploading: boolean;
  error: string | null;

  uploadImage: (file: File) => Promise<string | null>;
}

export const useFileStore = create<FileState>((set) => ({
  isUploading: false,
  error: null,

  uploadImage: async (file: File) => {
    try {
      // Restrict only image types
      if (!file.type.startsWith("image/")) {
        set({ error: "Only image files are allowed." });
        return;
      }

      set({ isUploading: true, error: null });

      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset);

      const uploadResponse = await axios.post(uploadUrl, formData);

      set({ isUploading: false });
      return uploadResponse.data.secure_url as string;
    } catch (err: any) {
      set({
        error: err?.response?.data?.error?.message || "Upload failed",
        isUploading: false,
      });
      return null;
    }
  },
}));
