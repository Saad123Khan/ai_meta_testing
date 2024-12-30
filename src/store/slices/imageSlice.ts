import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageState {
  generatedImage: String;
  selectedFiles: any[];
  selectedImages: any[];
  selectedVideos: any[];
  selectedLogo: any[];
  bgColor: String;
  newColor: String;
  cropImageModal: boolean;
  imageToCrop: null | any; // Adjust the type if you know the structure of store
}

const initialState: ImageState = {
  generatedImage: "",
  selectedFiles: [],
  selectedImages: [],
  selectedVideos: [],
  selectedLogo: [],
  bgColor: "black",
  newColor: "pink",
  cropImageModal: false,
  imageToCrop: null,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setGeneratedImage: (state, action) => {
      state.generatedImage = action.payload;
    },
    setSelectedFiles: (state, action: PayloadAction<any[]>) => {
      state.selectedFiles = action.payload;
    },
    addSelectedFile: (state, action: PayloadAction<any>) => {
      state.selectedFiles.push(action.payload);
    },
    removeSelectedFile: (state, action: PayloadAction<any>) => {
      state.selectedFiles = state.selectedFiles.filter(
        (file) => file !== action.payload
      );
    },
    setSelectedImage: (state, action: PayloadAction<any[]>) => {
      state.selectedImages = action.payload;
    },
    addSelectedImage: (state, action: PayloadAction<any>) => {
      if (!state.selectedImages) {
        state.selectedImages = [];
      }
      state.selectedImages.push(action.payload);
    },
    addSelectedVideo: (state, action: PayloadAction<any>) => {
      if (!state.selectedVideos) {
        state.selectedVideos = [];
      }
      console.log("wer are here accord", action.payload);
      state.selectedVideos.push(action.payload);
    },
    removeSelectedImage: (state, action: PayloadAction<any>) => {
      state.selectedImages = state.selectedImages.filter(
        (file) => file !== action.payload
      );
    },
    setSelectedLogo: (state, action: PayloadAction<any[]>) => {
      state.selectedLogo = action.payload;
    },
    setBgColor: (state, action: PayloadAction<string>) => {
      state.bgColor = action.payload;
    },
    setNewColor: (state, action: PayloadAction<string>) => {
      state.newColor = action.payload;
    },
    setCropImageModal: (state, action: PayloadAction<boolean>) => {
      state.cropImageModal = action.payload;
    },
    setImageToCrop: (state, action: PayloadAction<any>) => {
      state.imageToCrop = action.payload;
    },
  },
});

export const {
  setGeneratedImage,
  setSelectedFiles,
  addSelectedFile,
  removeSelectedFile,
  setSelectedImage,
  addSelectedImage,
  addSelectedVideo,
  removeSelectedImage,
  setSelectedLogo,
  setBgColor,
  setNewColor,
  setCropImageModal,
  setImageToCrop,
} = imageSlice.actions;

export default imageSlice.reducer;
