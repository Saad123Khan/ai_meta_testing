import CustomInputField from "@/components/customInputField";
import CustomUploader from "@/components/customUploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import CustomNewUploader from "@/components/customNewUploader";
import CropImageModal from "./cropImageModal";
import { convertToBase64, generateThumbnail, swalPopUp } from "@/lib/helper";
import aiApis from "@/services/indexAi";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import toast from "react-hot-toast";
import ImageUploadLoader from "./imageUploadLoader";
import { setAdds } from "@/store/slices/addSlice";

interface FileType {
  type: string;
  label: string;
  file: string | File; // Can be a Base64 string or a File object
}

interface CreateFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modalContent?: any;
  modalHeader?: any;
  modalFooter?: any;
  setAddsData?: any;
  addsData?: any;
  handleRemoveFileAddsData: (fileToRemove: any) => void;
}

const newImages = [
  "/assets/googlecampaign.png",
  "/assets/instacampaign.png",
  "/assets/youtubecampaign.png",
];

const textLocation = [
  { name: "Top", id: "Top" },
  { name: "Bottom", id: "Bottom" },
  { name: "Middle", id: "Middle" },
];

const UploadFilesModal = ({
  open,
  onOpenChange,
  setAddsData,
  addsData,
  handleRemoveFileAddsData,
}: CreateFolderDialogProps) => {
  const [imagesAI, setImagesAI] = useState<any>([]);
  const [videosAI, setVideosAI] = useState<any>([]);

  const [selectedFile, setSelectedFile] = useState<any>([]);
  const [selectedLogo, setSelectedLogo] = useState<any>(null);
  const [selectedPicture, setSelectedPicture] = useState<any>(null);
  const [selectedAudio, setSelectedAudio] = useState<any>([]);
  const [selectedVideo, setSelectedVideo] = useState<any>([]);
  const [selectedNewVideo, setSelectedNewVideo] = useState<any>([]);
  const [bgColor, setBgColor] = useState<any>("#000000");
  const [newColor, setNewColor] = useState<any>("#ff4d4d");
  const [cropImageModal, setCropImageModal] = useState<any>(false);
  const [imageToCrop, setImageToCrop] = useState<any>();
  const [fileIndex, setFileIndex] = useState<number | null>(null);
  const [overallText, setOverallText] = useState<any>("");
  const [textLocationValue, setTextLocationValue] = useState(
    textLocation[0]?.id
  );

  const [currentTab, setCurrentTab] = useState("Image");
  const [subCurrentTab, setSubCurrentTab] = useState("AI Image");
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const { adds } = useAppSelector((state) => state.adds);

  // Generate thumbnails for each selected video
  // const generateThumbnail = (videoFile: File): Promise<string> => {
  //   return new Promise((resolve) => {
  //     const video = document.createElement("video");
  //     const canvas = document.createElement("canvas");

  //     video.src = URL.createObjectURL(videoFile);
  //     video.currentTime = 1; // Capture the thumbnail at 1 second

  //     video.addEventListener("loadeddata", () => {
  //       canvas.width = video.videoWidth;
  //       canvas.height = video.videoHeight;
  //       const ctx = canvas.getContext("2d");

  //       if (ctx) {
  //         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  //         resolve(canvas.toDataURL("image/png")); // Return the image as a base64 URL
  //       }
  //     });
  //   });
  // };

  useEffect(() => {
    if (selectedVideo.length > 0) {
      const generateAllThumbnails = async () => {
        const thumbnailPromises = selectedVideo.map((file: any) =>
          generateThumbnail(file)
        );
        const generatedThumbnails = await Promise.all(thumbnailPromises);
        setThumbnails(generatedThumbnails);
      };

      generateAllThumbnails();
    }
  }, [selectedVideo]);

  const dispatch = useAppDispatch();
  const handleRemoveFile = (
    fileToRemove: any,
    setSelectedAttachment: any,
    isArray: boolean
  ) => {
    if (isArray) {
      setSelectedAttachment(null);
    } else {
      setSelectedAttachment((prevFiles: any) =>
        prevFiles?.filter((file: any) => file !== fileToRemove)
      );
    }

    handleRemoveFileAddsData(fileToRemove);
  };

  // const selectImage = async (file: File): Promise<void> => {
  //   if (!file || !file.name) {
  //     toast.error("Invalid file selected!", {
  //       position: "top-right",
  //       duration: 1000,
  //     });
  //     return;
  //   }

  //   const base64Image = await convertToBase64(file).catch((err) => {
  //     console.error("Error converting to Base64:", err);
  //     toast.error("Failed to add attachment!", {
  //       position: "top-right",
  //       duration: 1000,
  //     });
  //     return null;
  //   });

  //   if (!base64Image) return;

  //   const newFile: FileType = {
  //     type: "base64",
  //     label: file.name,
  //     file: base64Image,
  //   };

  //   const fileAlreadyExists = setAddsData(newFile);

  //   if (fileAlreadyExists) {
  //     toast.error("Attachment already added!", {
  //       position: "top-right",
  //       duration: 1000,
  //     });
  //   } else {
  //     toast.success("Attachment added!", {
  //       position: "top-right",
  //       duration: 1000,
  //     });
  //   }
  // };

  // const selectImage = (file: any) => {
  //   let fileAlreadyExists = false;

  //   setAddsData((prev: any) => {
  //     fileAlreadyExists = prev?.files?.some(
  //       (f: any) => f.file.name === file.name
  //     );

  //     if (fileAlreadyExists) {
  //       return prev;
  //     }
  //     return {
  //       ...prev,
  //       files:
  //         prev?.files?.length > 0
  //           ? [...prev.files, { type: "file", label: "image", file }]
  //           : [{ type: "file", label: "image", file }],
  //     };
  //   });
  //   if (fileAlreadyExists) {
  //     toast.error("Attachment already added!", {
  //       position: "top-right",
  //       duration: 1000,
  //     });
  //   } else {
  //     toast.success("Attachment added!", {
  //       position: "top-right",
  //       duration: 1000,
  //     });
  //   }
  // };

  const selectImage = (file: any) => {
    let fileAlreadyExists = false;

    // Update local state
    setAddsData((prev: any) => {
      fileAlreadyExists = prev?.files?.some(
        (f: any) => f.file.name === file.name
      );

      if (fileAlreadyExists) {
        return prev;
      }

      const updatedFiles =
        prev?.files?.length > 0
          ? [...prev.files, { type: "file", label: "image", file }]
          : [{ type: "file", label: "image", file }];

      // Dispatch to Redux state
      dispatch(setAdds({ ...prev, files: updatedFiles }));

      return {
        ...prev,
        files: updatedFiles,
      };
    });

    // Show appropriate toast messages
    if (fileAlreadyExists) {
      toast.error("Attachment already added!", {
        position: "top-right",
        duration: 1000,
      });
    } else {
      toast.success("Attachment added!", {
        position: "top-right",
        duration: 1000,
      });
    }
  };

  const selectImageBase64 = (file: any) => {
    let fileAlreadyExists = false;

    // Update local state
    setAddsData((prev: any) => {
      // Check if the file already exists in the files array
      fileAlreadyExists = prev?.files?.some(
        (existingFile: any) => existingFile.file === file
      );

      if (fileAlreadyExists) {
        return prev;
      }

      const updatedFiles =
        prev?.files?.length > 0
          ? [...prev.files, { type: "base64", label: "image", file }]
          : [{ type: "base64", label: "image", file }];

      // Dispatch to Redux state
      dispatch(setAdds({ ...prev, files: updatedFiles }));

      return {
        ...prev,
        files: updatedFiles,
      };
    });

    // Show appropriate toast messages
    if (fileAlreadyExists) {
      toast.error("File already exists!", {
        position: "top-right",
        duration: 1000,
      });
    } else {
      toast.success("Attachment added!", {
        position: "top-right",
        duration: 1000,
      });
    }
  };

  const handleImage = (file: any) => {
    if (file) {
      selectImage(file);
    }
  };

  const selectVideoBase64 = (file: any) => {
    let fileAlreadyExists = false;
    setAddsData((prev: any) => {
      fileAlreadyExists = prev?.files?.some(
        (f: any) => f.file.name === file.name
      );

      if (fileAlreadyExists) {
        return prev;
      }

      const updatedFiles =
        prev?.files?.length > 0
          ? [...prev.files, { type: "base64", label: "video", file }]
          : [{ type: "base64", label: "video", file }];

      // Dispatch to Redux state
      dispatch(setAdds({ ...prev, files: updatedFiles }));

      return {
        ...prev,
        files: updatedFiles,
      };
    });

    if (fileAlreadyExists) {
      toast.error("Attachment already added!", {
        position: "top-right",
        duration: 1000,
      });
    } else {
      toast.success("Attachment added!", {
        position: "top-right",
        duration: 1000,
      });
    }
    /* 
    console.log(file, "filefileeeee");
    setAddsData((prev: any) => ({
      ...prev,
      files:
      prev?.files?.length > 0
      ? [...prev.files, { type: "base64", label: "video", file }]
      : [{ type: "base64", label: "video", file }],
    }));
    */
  };

  const selectVideo = (file: any) => {
    let fileAlreadyExists = false;
    setAddsData((prev: any) => {
      fileAlreadyExists = prev?.files?.some(
        (f: any) => f.file.name === file.name
      );

      if (fileAlreadyExists) {
        return prev;
      }
      const updatedFiles =
        prev?.files?.length > 0
          ? [...prev.files, { type: "file", label: "video", file }]
          : [{ type: "file", label: "video", file }];

      // Dispatch to Redux state
      dispatch(setAdds({ ...prev, files: updatedFiles }));

      return {
        ...prev,
        files: updatedFiles,
      };
    });

    if (fileAlreadyExists) {
      toast.error("Attachment already added!", {
        position: "top-right",
        duration: 1000,
      });
    } else {
      toast.success("Attachment added!", {
        position: "top-right",
        duration: 1000,
      });
    }
  };

  const generatePrimaryText = useAppSelector(
    (state) => state.reduxStore.generated_suggestions
  );

  const [headlines, setHeadlines] = useState<any>(
    generatePrimaryText?.headlines?.join(",")
  );

  const [descriptions, setDescriptions] = useState<any>(
    generatePrimaryText?.descriptions?.join(",")
  );
  const handleCropImage = (file: File, index: number) => {
    setCropImageModal(true);
    setFileIndex(index);
    setImageToCrop(file);
  };

  const { mutate: generateImage, isPending: isPendingAIImage }: any =
    useMutation({
      mutationFn: aiApis.generateImage,
      onSuccess: ({
        data,
      }: {
        data: {
          images: any;
          data: any;
          status: boolean;
          message: string;
        };
      }) => {
        console.log("image formData", data);
        setImagesAI(data?.images);
        setTimeout(() => {
          scrollToAiImages();
        }, 2000);
        setCurrentTab("AI");
        setSubCurrentTab("AI Image");
      },
      onError: (error: any) => {
        swalPopUp(error.message, "", error.message);
        setCurrentTab("AI");
        setSubCurrentTab("AI Image");
        console.log("Error in Generating Image", error);
      },
    });

  const scrollToAiImages = () => {
    const element = document.getElementById("aiImages");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };
  const scrollToAiVideos = () => {
    const element = document.getElementById("aiVideos");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  const { mutate: generateVideo, isPending: isPendingAIVideo }: any =
    useMutation({
      mutationFn: aiApis.generateVideo,
      onSuccess: ({
        data,
      }: {
        data: {
          video_base64: any;
          status: boolean;
          message: string;
        };
      }) => {
        console.log("image formData", data);
        setVideosAI([data?.video_base64]);
        setTimeout(() => {
          scrollToAiVideos();
        }, 2000);
        setCurrentTab("AI");
        setSubCurrentTab("AI Video");
      },
      onError: (error: any) => {
        swalPopUp(error.message, "", error.message);
        setCurrentTab("AI");
        setSubCurrentTab("AI Video");
        console.log("Error in Generating Video", error);
      },
    });

  const createAiImage = () => {
    if (!selectedPicture)
      return swalPopUp("Error", "Please select a background image.", "error");
    if (!selectedLogo)
      return swalPopUp("Error", "Please select a logo.", "error");
    if (!headlines || headlines.trim() === "")
      return swalPopUp("Error", "Headlines cannot be empty.", "error");

    const data = {
      background: selectedPicture,
      logo: selectedLogo,
      num_images: 2,
      descriptions:generatePrimaryText?.descriptions?.join(","),
      headlines,
    };
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    generateImage(formData);
  };

  const createAiVideo = () => {
    const formData = new FormData();

    if (!selectedAudio[0])
      return swalPopUp("Error", "Please upload a audio file.", "error");
    if (!selectedNewVideo[0])
      return swalPopUp("Error", "Please upload a video file.", "error");
    if (!bgColor || bgColor.trim() === "")
      return swalPopUp("Error", "Background color cannot be empty.", "error");
    if (!newColor || newColor.trim() === "")
      return swalPopUp("Error", "Background color cannot be empty.", "error");

    formData.append("audio", selectedAudio[0]);
    formData.append("video", selectedNewVideo[0]);
    formData.append("textColor", newColor);
    formData.append("backgroundColor", bgColor);
    formData.append("overallText", headlines);
    formData.append("textLocation", textLocationValue.toLowerCase());
    console.log("formData", formData);
    generateVideo(formData);
  };

  const check = generatePrimaryText?.headlines?.join(",");

  return (
    <>
      <CropImageModal
        isModalOpen={cropImageModal}
        setIsModalOpen={setCropImageModal}
        imageToCrop={imageToCrop}
        onCropComplete={(croppedImageFile: File) => {
          setSelectedFile((prevFiles: File[]) => {
            const updatedFiles = [...prevFiles];
            if (fileIndex !== null && fileIndex !== undefined) {
              updatedFiles[fileIndex] = croppedImageFile;
            }
            return updatedFiles;
          });
        }}
      />
      <Dialog open={open} onOpenChange={onOpenChange}>
        {isPendingAIVideo || isPendingAIImage ? (
          <>
            <DialogContent className="lg:max-w-[800px]">
              <ImageUploadLoader
                content={isPendingAIVideo ? "Video" : "Image"}
              />
            </DialogContent>
          </>
        ) : (
          <DialogContent className="lg:max-w-[800px]">
            <DialogHeader>
              <p className="text-black text-center text-xl font-semibold ">
                Generate Content from AI
              </p>
            </DialogHeader>
            <ScrollArea className="h-[60vh] pr-4">
              <Tabs defaultValue={currentTab} onValueChange={setCurrentTab}>
                <TabsList className="w-full flex justify-center mb-8 bg-transparent">
                  <TabsTrigger
                    value="Image"
                    className="relative ml-12 text-[16px] leading-none !shadow-none data-[state=active]:font-bold data-[state=active]:text-[#0F51A7] data-[state=active]:bg-transparent data-[state=active]:underline  data-[state=active]:underline-offset-8  data-[state=inactive]:text-[#636060]"
                  >
                    Image
                  </TabsTrigger>
                  <TabsTrigger
                    value="Video"
                    className="relative ml-12 text-[16px] leading-none !shadow-none data-[state=active]:font-bold data-[state=active]:text-[#0F51A7] data-[state=active]:bg-transparent data-[state=active]:underline data-[state=active]:underline-offset-8 data-[state=inactive]:text-[#636060]"
                  >
                    Video
                  </TabsTrigger>
                  <TabsTrigger
                    value="AI"
                    className="relative ml-12 text-[16px] leading-none !shadow-none data-[state=active]:font-bold data-[state=active]:text-[#0F51A7] data-[state=active]:bg-transparent data-[state=active]:underline data-[state=active]:underline-offset-8 data-[state=inactive]:text-[#636060]"
                  >
                    AI
                  </TabsTrigger>
                  <TabsTrigger
                    value="Suit"
                    className="relative ml-12 text-[16px] leading-none !shadow-none data-[state=active]:font-bold data-[state=active]:text-[#0F51A7] data-[state=active]:bg-transparent data-[state=active]:underline data-[state=active]:underline-offset-8 data-[state=inactive]:text-[#636060]"
                  >
                    Suit
                  </TabsTrigger>
                  <TabsTrigger
                    value="Facebook"
                    className="relative ml-12 text-[16px] leading-none !shadow-none data-[state=active]:font-bold data-[state=active]:text-[#0F51A7] data-[state=active]:bg-transparent data-[state=active]:underline data-[state=active]:underline-offset-8 data-[state=inactive]:text-[#636060]"
                  >
                    Facebook
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="Image">
                  <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-4 mt-2 mr-3">
                      {selectedFile?.map((file: any, index: any) => {
                        const isFileIncluded = addsData.files?.some(
                          (dataFile: any) =>
                            dataFile.file.name === file.name &&
                            dataFile.file.size === file.size &&
                            dataFile.file.type === file.type
                        );
                        return (
                          <div
                            className={`relative cursor-pointer p-1 rounded-[16px] mt-2 mr-1 w-[180px] h-[180px] ${
                              isFileIncluded ? "border-2 border-secondary" : ""
                            } `}
                            // className="relative cursor-pointer border p-1 rounded-[16px] mt-2 mr-1 border-secondary w-[180px] h-[180px]"
                          >
                            <img
                              onClick={() => handleImage(file)}
                              src={URL.createObjectURL(file)}
                              alt="Network Image"
                              style={{
                                width: "100%",
                                height: "100%",
                              }}
                            />
                            {/* <div className="absolute top-2 right-2 flex space-x-2">
                              <Button
                                variant="secondary"
                                size="sm"
                                className="bg-blue-500 text-white hover:bg-blue-600"
                                onClick={() => handleCropImage(file, index)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="secondary"
                                size="sm"
                                className="bg-red-500 text-white hover:bg-red-600"
                                onClick={() =>
                                  handleRemoveFile(file, setSelectedFile)
                                }
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div> */}
                            <div className="absolute top-1 right-1 flex items-center">
                              <div
                                className="bg-white rounded-full p-1 cursor-pointer mr-2"
                                onClick={() => handleCropImage(file, index)}
                              >
                                <Edit className="size-5" color="#3b82f6" />
                              </div>
                              <div
                                className="bg-white rounded-full p-1 cursor-pointer"
                                onClick={() =>
                                  handleRemoveFile(file, setSelectedFile, false)
                                }
                              >
                                <Trash2 className="size-5" color="#ef4444" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-4 mt-2 mr-3">
                      <div className="ml-1">
                        <CustomUploader
                          selectedFile={selectedFile}
                          setSelectedFile={setSelectedFile}
                          // setSelectedFile={(files: any[]) => files.forEach((file: any) => dispatch(addSelectedFile(file)))}
                          fileType=".png"
                          // multiple={true}
                        />
                      </div>
                    </div>
                  </>
                </TabsContent>
                <TabsContent value="Video">
                  <>
                    <div className="grid grid-cols-3 mt-3">
                      <div className="ml-1">
                        <CustomUploader
                          selectedFile={selectedVideo}
                          setSelectedFile={setSelectedVideo}
                          fileType=".mp4"
                          // multiple={true}
                          id={"video"}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-4 mr-3">
                      {selectedVideo?.map((file: any, index: any) => {
                        console.log("filllllley", file);
                        const isFileIncluded = addsData.files?.some(
                          (dataFile: any) =>
                            dataFile.file.name === file.name &&
                            dataFile.file.size === file.size &&
                            dataFile.file.type === file.type
                        );
                        return (
                          <div
                            className={`relative cursor-pointer p-1 rounded-[16px] mt-2 mr-1 w-[180px] h-[180px] ${
                              isFileIncluded ? "border-2 border-secondary" : ""
                            } `}
                            // className="relative border cursor-pointer p-1 rounded-[16px] mt-2 mr-1 border-secondary w-[180px] h-[180px]"
                          >
                            <video
                              controls
                              onClick={() => selectVideo(file)}
                              src={URL.createObjectURL(file)}
                              // controls
                              style={{
                                width: "100%",
                                height: "100%",
                              }}
                            />

                            <div className="absolute top-1 right-1 flex items-center">
                              <div
                                className="bg-white rounded-full p-1 cursor-pointer mr-2"
                                onClick={() => handleCropImage(file, index)}
                              >
                                <Edit className="size-4" color="#3b82f6" />
                              </div>
                              <div
                                className="bg-white rounded-full p-1 cursor-pointer"
                                onClick={() =>
                                  handleRemoveFile(
                                    file,
                                    setSelectedVideo,
                                    false
                                  )
                                }
                              >
                                <Trash2 className="size-4" color="#ef4444" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                </TabsContent>
                <TabsContent value="AI" className="m-1">
                  <>
                    <Tabs
                      defaultValue={subCurrentTab}
                      onValueChange={setSubCurrentTab}
                    >
                      <TabsList className="w-full flex justify-start bg-transparent">
                        <TabsTrigger
                          value="AI Image"
                          className="relative text-[16px] leading-none !shadow-none data-[state=active]:font-bold data-[state=active]:text-[#0F51A7] data-[state=active]:bg-transparent data-[state=active]:underline  data-[state=active]:underline-offset-8  data-[state=inactive]:text-[#636060]"
                        >
                          AI Image
                        </TabsTrigger>
                        <TabsTrigger
                          value="AI Video"
                          className="relative text-[16px] leading-none !shadow-none data-[state=active]:font-bold data-[state=active]:text-[#0F51A7] data-[state=active]:bg-transparent data-[state=active]:underline data-[state=active]:underline-offset-8 data-[state=inactive]:text-[#636060]"
                        >
                          AI Video
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="AI Image" className="m-1">
                        <div className="mt-3">
                          <div>
                            <CustomInputField
                              label="Headline"
                              value={headlines}
                              handleAdvanceChange={(e: any) =>
                                setHeadlines(e.target.value)
                              }
                              css={
                                "bg-[#ffff] border-none shadow-md focus:ring-2 focus:ring-indigo-200  rounded-[12px]"
                              }
                              type={"text"}
                              placeholder={"write your headline here!"}
                            />
                          </div>

                          {/* uploader */}
                          <div className="grid grid-cols-2 mt-6 mb-2">
                            <div className="mr-1">
                              <CustomUploader
                                id={"upload-logo"}
                                title={"Upload Logo"}
                                selectedFile={selectedLogo}
                                setSelectedFile={setSelectedLogo}
                                fileType=".png"
                                isArray={false}
                                // multiple={true}
                              />
                            </div>
                            <div className="ml-1">
                              <CustomUploader
                                id={"upload-picture"}
                                title={"Upload Picture"}
                                selectedFile={selectedPicture}
                                setSelectedFile={setSelectedPicture}
                                fileType=".png"
                                isArray={false}
                                // multiple={true}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-3 mt-2">
                            {selectedLogo && (
                              <div className="relative cursor-pointer border p-1 rounded-[16px] mt-2 mr-1 border-secondary w-[160px] h-[160px]">
                                <img
                                  src={
                                    selectedLogo
                                      ? URL.createObjectURL(selectedLogo)
                                      : ""
                                  }
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                  }}
                                  alt="Uploaded file"
                                />
                                <div
                                  onClick={() =>
                                    handleRemoveFile(
                                      selectedLogo,
                                      setSelectedLogo,
                                      true
                                    )
                                  }
                                  className="absolute top-1 right-1 bg-white rounded-full p-1 cursor-pointer"
                                >
                                  <Trash2 className="size-4" color="#ef4444" />
                                </div>
                              </div>
                            )}
                            {selectedPicture && (
                              <div className="relative cursor-pointer border p-1 rounded-[16px] mt-2 mr-1 border-secondary w-[160px] h-[160px]">
                                <img
                                  src={
                                    selectedPicture
                                      ? URL.createObjectURL(selectedPicture)
                                      : ""
                                  }
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                  }}
                                  alt="Uploaded file"
                                />
                                <div
                                  className="absolute top-1 right-1 bg-white rounded-full p-1 cursor-pointer"
                                  onClick={() =>
                                    handleRemoveFile(
                                      selectedPicture,
                                      setSelectedPicture,
                                      true
                                    )
                                  }
                                >
                                  <Trash2 className="size-4" color="#ef4444" />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button
                            disabled={isPendingAIImage}
                            onClick={createAiImage}
                            className="text-primary-color rounded-[16px] bg-secondary"
                            type="submit"
                          >
                            {isPendingAIImage ? "Loading..." : "Generate Image"}
                          </Button>
                        </div>
                        <div
                          id={"aiImages"}
                          className="grid grid-cols-3 gap-3 mt-2"
                        >
                          {imagesAI?.length > 0 &&
                            imagesAI?.map((file: any, index: number) => {
                              const isFileIncluded = addsData.files?.some(
                                (dataFile: any) =>
                                  dataFile.file.name === file.name &&
                                  dataFile.file.size === file.size &&
                                  dataFile.file.type === file.type
                              );
                              return (
                                <div
                                  key={index}
                                  id={"aiImages"}
                                  className={`relative cursor-pointer p-1 rounded-[16px] mt-2 mr-1 w-[160px] h-[160px] 
                                    
                                  `}
                                  // className="relative cursor-pointer border p-1 rounded-[16px] mt-2 mr-1 border-secondary w-[160px] h-[160px]"
                                >
                                  <img
                                    onClick={() => selectImageBase64(file)}
                                    src={`data:image/png;base64,${file}`}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                    }}
                                    alt={`Uploaded file ${index + 1}`}
                                  />
                                  <div
                                    className="absolute top-1 right-1 bg-white rounded-full p-1 cursor-pointer"
                                    onClick={() =>
                                      handleRemoveFile(file, setImagesAI, false)
                                    }
                                  >
                                    <Trash2
                                      className="size-4"
                                      color="#ef4444"
                                    />
                                  </div>
                                </div>
                              );
                            })}{" "}
                        </div>
                      </TabsContent>
                      <TabsContent value="AI Video" className="m-1">
                        <div className="mt-3">
                          <div>
                            <CustomInputField
                              label="Headline"
                              // value={overallText}
                              value={headlines}
                              handleAdvanceChange={(e: any) =>
                                setHeadlines(e.target.value)
                              }
                              // handleAdvanceChange={(e: any) =>
                              //   setOverallText(e.target.value)
                              // }
                              css={
                                "bg-[#ffff] border-none shadow-md focus:ring-2 focus:ring-indigo-200  rounded-[12px]"
                              }
                              type={"text"}
                              placeholder={"write your headline here!"}
                            />
                          </div>
                          {/* color fields */}
                          {/* <div className="flex items-center">
                            <div className="mt-7 mr-5">
                              <p className="text-[12px] font-semibold">
                                Select the background color
                              </p>
                              <div className="flex items-center">
                                <div
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    backgroundColor: bgColor,
                                    marginRight: "10px",
                                    borderRadius: 10,
                                  }}
                                />
                                <div>
                                  <CustomInputField
                                    css={"bg-[#ffff] rounded-[12px]"}
                                    handleAdvanceChange={(e: any) =>
                                      setBgColor(e.target.value)
                                    }
                                    type={"text"}
                                    placeholder={"#ffff"}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mt-7">
                              <p className="text-[12px] font-semibold">
                                Select the color
                              </p>
                              <div className="flex items-center">
                                <div
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    backgroundColor: newColor,
                                    marginRight: "10px",
                                    borderRadius: 10,
                                  }}
                                />
                                <div>
                                  <CustomInputField
                                    css={"bg-[#ffff] rounded-[12px]"}
                                    handleAdvanceChange={(e: any) =>
                                      setNewColor(e.target.value)
                                    }
                                    type={"text"}
                                    placeholder={"#ffff"}
                                  />
                                </div>
                              </div>
                            </div>
                          </div> */}
                          <div className="flex items-center">
                            {/* Background Color Section */}
                            <div className="mt-7 mr-5">
                              <p className="text-[12px] font-semibold">
                                Select the background color
                              </p>
                              <div className="flex items-center">
                                <div
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    backgroundColor: bgColor,
                                    marginRight: "10px",
                                    borderRadius: 10,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    const colorPicker =
                                      document.getElementById("bgColorPicker");
                                    if (colorPicker) colorPicker.click();
                                  }}
                                />
                                <input
                                  id="bgColorPicker"
                                  type="color"
                                  style={{
                                    position: "absolute",
                                    top: -60,
                                    left: 0,
                                    opacity: 0,
                                    cursor: "pointer",
                                  }}
                                  value={bgColor}
                                  onChange={(e) => setBgColor(e.target.value)}
                                />
                                <div>
                                  <CustomInputField
                                    css={"bg-[#ffff] rounded-[12px]"}
                                    handleAdvanceChange={(e: any) =>
                                      setBgColor(e.target.value)
                                    }
                                    type={"text"}
                                    placeholder={"#ffff"}
                                    value={bgColor}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Color Section */}
                            <div className="mt-7">
                              <p className="text-[12px] font-semibold">
                                Select the color
                              </p>
                              <div className="flex items-center">
                                <div
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    backgroundColor: newColor,
                                    marginRight: "10px",
                                    borderRadius: 10,
                                    position: "relative",
                                  }}
                                  onClick={() => {
                                    const colorPicker =
                                      document.getElementById("newColorPicker");
                                    if (colorPicker) colorPicker.click();
                                  }}
                                />
                                <input
                                  id="newColorPicker"
                                  type="color"
                                  style={{
                                    position: "absolute",
                                    top: -60,
                                    left: 160,
                                    // width: "100%",
                                    // height: "100%",
                                    opacity: 0,
                                    cursor: "pointer",
                                  }}
                                  value={newColor}
                                  onChange={(e) => setNewColor(e.target.value)}
                                />
                                <div>
                                  <CustomInputField
                                    css={"bg-[#ffff] rounded-[12px]"}
                                    handleAdvanceChange={(e: any) =>
                                      setNewColor(e.target.value)
                                    }
                                    type={"text"}
                                    placeholder={"#ffff"}
                                    value={newColor}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* radio fields */}
                          <div className="mt-6">
                            <p className="text-foreground font-semibold">
                              Select the location
                            </p>
                            <div className="flex mt-1">
                              <RadioGroup
                                className="flex  items-center "
                                defaultValue={textLocation[0].id}
                                value={textLocationValue}
                                onValueChange={(value) =>
                                  setTextLocationValue(value)
                                }
                              >
                                {textLocation.map((item: any, key: any) => (
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value={item.id}
                                      id={`r${item.id}`}
                                      className={`${
                                        textLocationValue === item.id
                                          ? "bg-primary "
                                          : ""
                                      }`}
                                    />
                                    <Label htmlFor={`r${item.id}`}>
                                      {item.name}
                                    </Label>
                                  </div>
                                ))}
                                {/* <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="Folder 1" id="r1" />
                                  <Label htmlFor="r1">Top</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="Folder 2" id="r2" />
                                  <Label htmlFor="r2">Bottom</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="Folder 3" id="r3" />
                                  <Label htmlFor="r3">Middle</Label>
                                </div> */}
                              </RadioGroup>
                            </div>
                          </div>
                          {/* uploader */}
                          <div className="grid grid-cols-2 mt-6 mb-2">
                            <div className="mr-1">
                              <CustomUploader
                                title={"Upload Audio"}
                                selectedFile={selectedAudio}
                                setSelectedFile={setSelectedAudio}
                                fileType=".mp3"
                                // multiple={true}
                                id="upload-audio"
                              />
                            </div>
                            <div className="ml-1">
                              <CustomUploader
                                title={"Upload Video"}
                                selectedFile={selectedNewVideo}
                                setSelectedFile={setSelectedNewVideo}
                                fileType=".mp4"
                                // multiple={true}
                                id="upload-video"
                              />
                            </div>
                          </div>

                          {/* display audio video */}
                          <div className="grid grid-cols-2 gap-4 mt-6">
                            {/* Audio files */}
                            {selectedAudio.map((audio: any, index: number) => (
                              <div key={index} className="p-2 border rounded">
                                <p className="text-sm font-semibold mb-2">
                                  Audio {index + 1}
                                </p>
                                <audio controls className="w-full">
                                  <source
                                    src={URL.createObjectURL(audio)}
                                    type="audio/mp3"
                                  />
                                  Your browser does not support the audio tag.
                                </audio>
                              </div>
                            ))}

                            {/* Video files */}
                            {selectedNewVideo?.map(
                              (video: any, index: number) => (
                                <div className="relative cursor-pointer border p-1 rounded-[16px] mt-2 mr-1 border-secondary w-[160px] h-[160px]">
                                  <video
                                    controls
                                    src={URL.createObjectURL(video)}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                    }}
                                  />
                                  <div
                                    className="absolute top-1 right-1 bg-white rounded-full p-1 cursor-pointer"
                                    onClick={() =>
                                      handleRemoveFile(
                                        video,
                                        setSelectedNewVideo,
                                        false
                                      )
                                    }
                                  >
                                    <Trash2
                                      className="size-4"
                                      color="#ef4444"
                                    />
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button
                            disabled={isPendingAIVideo}
                            onClick={createAiVideo}
                            className="mt-3 text-primary-color rounded-[16px] bg-secondary"
                            type="submit"
                          >
                            {isPendingAIVideo ? "Loading..." : "Generate Video"}
                          </Button>
                        </div>

                        <div
                          id={"aiVideos"}
                          className="grid grid-cols-3 gap-3 mt-2"
                        >
                          {videosAI?.length > 0 &&
                            videosAI?.map((file: any, index: number) => {
                              const isFileIncluded = addsData.files?.some(
                                (dataFile: any) =>
                                  dataFile.file.name === file.name &&
                                  dataFile.file.size === file.size &&
                                  dataFile.file.type === file.type
                              );
                              return (
                                <div
                                  key={index}
                                  id={"aiVideos"}
                                  className={`relative cursor-pointer p-1 rounded-[16px] mt-2 mr-1 w-[160px] h-[160px] ${
                                    isFileIncluded
                                      ? "border-2 border-secondary"
                                      : ""
                                  } `}
                                  // className="relative cursor-pointer border p-1 rounded-[16px] mt-2 mr-1 border-secondary w-[160px] h-[160px]"
                                >
                                  <video
                                    onClick={() => selectVideoBase64(file)}
                                    controls
                                    src={`data:video/mp4;base64,${file}`}
                                    className="w-[100%] h-[100%]"
                                  />
                                  <div
                                    className="absolute top-1 right-1 bg-white rounded-full p-1 cursor-pointer"
                                    onClick={() =>
                                      handleRemoveFile(file, setVideosAI, false)
                                    }
                                  >
                                    <Trash2
                                      className="size-4"
                                      color="#ef4444"
                                    />
                                  </div>
                                </div>
                              );
                            })}{" "}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </>
                </TabsContent>
                <TabsContent value="Suit">
                  <>
                    <div>
                      <CustomUploader
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        fileType=".mp4"
                        multiple={true}
                      />
                    </div>
                    <div className="grid grid-cols-4 ">
                      {selectedFile?.map((file: any, index: any) => {
                        return (
                          <>
                            <div className="relative border border-dashed  mt-2 mr-1 border-[#B1A4B5] w-[180px] h-[180px]">
                              <img
                                src={URL.createObjectURL(file)}
                                alt="Network Image"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                }}
                              />
                              <div
                                className="absolute top-1 right-1 bg-white rounded-full p-1 cursor-pointer"
                                onClick={() =>
                                  handleRemoveFile(file, setVideosAI, false)
                                }
                              >
                                <Trash2 className="size-4" color="#ef4444" />
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </>
                </TabsContent>
                <TabsContent value="Facebook">
                  <div className="grid grid-cols-4 gap-4 ">
                    {newImages?.map((file: any, index: any) => {
                      return (
                        <>
                          <div className="relative mt-2 mr-2 w-[180px] h-[180px]">
                            <img
                              src={file}
                              style={{
                                width: "100%",
                                height: "100%",
                              }}
                            />
                            <div
                              className="absolute top-1 right-1 bg-white rounded-full p-1 cursor-pointer"
                              onClick={() =>
                                handleRemoveFile(file, setSelectedFile, false)
                              }
                            >
                              <Trash2 className="size-4" color="#ef4444" />
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </ScrollArea>
            <div className="flex justify-start">
              <Button
                onClick={() => onOpenChange(false)}
                className="text-primary-color rounded-[16px] px-6 bg-secondary"
                type="submit"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default UploadFilesModal;
