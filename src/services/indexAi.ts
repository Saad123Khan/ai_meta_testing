import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

// Define types for request body and response data
interface AiImageBody {
  prompt: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
interface generateNewAdTypes {
  prompt: string;
  websiteUrl: string;
  brandName: string;
}
interface generateSuggestionsTypes {
  prompt: string;
  platform: string;
  brandName: string;
}

interface generateImageTypes {
  prompt: string;
  platform: string;
  brandName: string;
}

interface retrieveImageTypes {
  id: string;
}

// Define the structure of the API methods
interface API {
  createAiImage: (body: AiImageBody) => Promise<AxiosResponse>;
  createAiVideo: (body: any) => Promise<AxiosResponse>;
  generateNewAd: (
    body: generateNewAdTypes
  ) => Promise<AxiosResponse>;
  generateSuggestion: (
    body: generateSuggestionsTypes
  ) => Promise<AxiosResponse>;
  generateImage: (body: any) => Promise<AxiosResponse>; 
  generateVideo: (body: any) => Promise<AxiosResponse>;
  retrieveImage: (body: any) => Promise<AxiosResponse>;
  retrieveVideo: (body: any) => Promise<AxiosResponse>;
  removeBgImage: (body: any) => Promise<AxiosResponse>;
  faceEnhance: (body: any) => Promise<AxiosResponse>;
  imageUpscale: (body: any) => Promise<AxiosResponse>;
  textToSpeech: (body: any) => Promise<AxiosResponse>;
  generateTone: (body: any) => Promise<AxiosResponse>;
}

// Create the backend server function
const createBackendServer = (baseURL: string): API => {
  const api: AxiosInstance = axios.create({
    baseURL: `${baseURL}`,
    withCredentials: false,
    headers: {
      Accept: "application/json",
    },
  });

  // Interceptor to handle responses and errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const message = error?.response?.data?.message;
      error.message = message ?? error.message;

      if (error?.response?.data?.errors) {
        error.errors = error?.response?.data?.errors;
      }

      if (error?.response?.status === 401) {
        // Handle unauthorized error (e.g., redirect to logout page)
        // window.location.href = "/logout"; 
      }

      return Promise.reject(error);
    }
  );
  
  // Create image API method
  const createAiImage = async (
    body: AiImageBody
  ): Promise<AxiosResponse<AuthResponse>> => {
    return api.post("/create-ai-image", { prompt: body });
  };

  // Create video API method
  const createAiVideo = async (
    body: any
  ): Promise<AxiosResponse<AuthResponse>> => {
    return api.post("/create-ai-video", body);
  };

  // Create generateNewAd API method
  const generateNewAd = async (
    body: generateNewAdTypes
  ): Promise<AxiosResponse<AuthResponse>> => {
    return api.post("/idea-generation", body);
  };

  // Create generate Suggestions API method
  const generateSuggestion = async (
    body: generateSuggestionsTypes
  ): Promise<AxiosResponse<AuthResponse>> => {
    return api.post("/generate_suggestions", body);
  };

  // Create generate Image API method
  const generateImage = async (
    body: any
  ): Promise<AxiosResponse> => {
    return api.post("/generate-images", body);
  };

  // Create change tone
  const generateTone = async (
    body: any
  ): Promise<AxiosResponse> => {
    return api.post("/change-tone", body);
  };

  // Create generate video API method
  const generateVideo = async (
    body: any
  ): Promise<AxiosResponse> => {
    return api.post("/create-video", body);
  };

  // Retrieve ai image API method
  const retrieveImage = async (id: any) => {
    return api.get(`/retrieve-ai-image/${id}`);
  };

  // Retrieve ai video API method
  const retrieveVideo = async (id: any) => {
    return api.get(`/retrieve-ai-video/${id}`);
  };

  // remove background image API method
  const removeBgImage = async (file: any) => {
    return api.post(`/remove-background`, file);
  };

  // face enhance API method
  const faceEnhance = async (file: any) => {
    return api.post(`/face-image-enhancer`, file);
  };

  // image upscale API method
  const imageUpscale = async (file: any) => {
    return api.post(`/enhance-image`, file);
  };

  // Text to speechAPI method
  const textToSpeech = async (file: any) => {
    return api.post(`/text-to-speech`, file);
  };

  // Returning all the API functions
  return {
    createAiImage,
    createAiVideo,
    generateNewAd,
    generateSuggestion,
    generateImage,
    retrieveImage,
    retrieveVideo,
    generateVideo,
    generateTone,
    removeBgImage,
    faceEnhance,
    imageUpscale,
    textToSpeech,
  };
};

// Create the API instance
const aiApis = createBackendServer(
  process.env.NEXT_PUBLIC_SERVER_URL_AI as string
);

export default aiApis;