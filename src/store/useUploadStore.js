// src/store/useUploadStore.js
import create from 'zustand';

const useUploadStore = create((set) => ({
  uploadedFile: null,
  setUploadedFile: (file) => set({ uploadedFile: file }),
}));

export default useUploadStore;
