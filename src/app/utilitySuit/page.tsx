"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  DeleteIcon,
  FileText,
  ScanFace,
  SquareArrowOutUpRight,
  SquareUserRound,
  WandSparkles,
  X,
} from "lucide-react";
import React, { useState } from "react";
import AiToolModal from "./_components/aiToolModal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CustomTextArea from "@/components/customTextArea";
import aiApis from "@/services/indexAi";
import { useMutation } from "@tanstack/react-query";
import { swalPopUp } from "@/lib/helper";
import UtilityUpload from "./_components/utilityUpload";
import { url } from "inspector";
import { Badge } from "@/components/ui/badge";
import Head from "next/head";

const UtilitySuit = () => {
  const [image, setImage] = useState<any>();
  const [textReader, setTextReader] = useState<any>();
  const [isLoadingBtn, setIsLoadingBtn] = useState<any>(false);
  const [attachments, setAttachments] = useState<any>([]);
  const [generatedAudios, setGeneratedAudios] = useState<any>([]);

  const handleRemoveFile = () => {
    setImage(null);
  };

  console.log("attachments", image);

  const { mutate: removeBg, isPending: isLoadingRemove }:any = useMutation({
    mutationFn: aiApis.removeBgImage,
    onSuccess: ({ data }: { data: { status: boolean; message: string ;image_base64: any; } }) => {
      console.log("image formData", data);
      setAttachments([...attachments, data?.image_base64]);
      setOpenTool(false);
      setIsLoadingBtn(false);
      swalPopUp("success", "Background Is Removed", "success");
      // scrollToAiVideos();
    },
    onError: (error: any) => {
      swalPopUp(error.message, "", error.message);
      setIsLoadingBtn(false);
      console.log("Error in Generating Video", error);
    },
  });

  const { mutate: faceEnhanceMutation, isPending: isLoadingFace }:any = useMutation(
    {
      mutationFn: aiApis.faceEnhance,
      onSuccess: ({ data }: { data: { status: boolean; message: string;image_base64: any; } }) => {
        console.log("image formData", data);
        setAttachments([...attachments, data?.image_base64]);
        setOpenTool(false);
        setIsLoadingBtn(false);
        swalPopUp("success", "Background Is Removed", "success");
        // scrollToAiVideos();
      },
      onError: (error: any) => {
        swalPopUp(error.message, "", error.message);
        setIsLoadingBtn(false);
        console.log("Error in Generating Video", error);
      },
    }
  );

  const { mutate: imageUpScale, isPending: isLoadingUpScale } :any= useMutation({
    mutationFn: aiApis.imageUpscale,
    onSuccess: ({ data }: { data: { status: boolean; message: string ; image_base64: any;} }) => {
      console.log("image formData", data);
      setAttachments([...attachments, data?.image_base64]);
      setOpenTool(false);
      setIsLoadingBtn(false);
      swalPopUp("success", "Image Is Enhanced", "success");
      // scrollToAiVideos();
    },
    onError: (error: any) => {
      swalPopUp(error.message, "", error.message);
      setIsLoadingBtn(false);
      console.log("Error in enhancing image", error);
    },
  });

  const { mutate: textToSpeechMutation, isPending: isLoadingText }:any =
    useMutation({
      mutationFn: aiApis.textToSpeech,
      onSuccess: ({ data }: { data: { status: boolean; message: string ;audio_base64: any;} }) => {
        console.log("image formData", data);
        setGeneratedAudios([...generatedAudios, data?.audio_base64]);
        setOpenTool(false);
        setIsLoadingBtn(false);
        swalPopUp("success", "Text Is converted to speech", "success");
        // scrollToAiVideos();
      },
      onError: (error: any) => {
        swalPopUp(error.message, "", error.message);
        setIsLoadingBtn(false);
        console.log("Error in converting text to speech", error);
      },
    });

  const handleRemoveBg = async () => {
    const formData = new FormData();
    setIsLoadingBtn(true);
    if (!image) return swalPopUp("Error", "Please upload a file.", "error");

    formData.append("image_file", image);
    removeBg(formData);
  };

  const handleFaceEnhance: any = async () => {
    const formData = new FormData();
    setIsLoadingBtn(true);
    if (!image) return swalPopUp("Error", "Please upload a file.", "error");

    formData.append("image_file", image);
    faceEnhanceMutation(formData);
  };

  const handleUpScale = async () => {
    const formData = new FormData();
    setIsLoadingBtn(true);
    if (!image) return swalPopUp("Error", "Please upload a file.", "error");

    formData.append("image_file", image);
    imageUpScale(formData);
  };

  const handleTextToSpeech = async () => {
    if (!textReader)
      return swalPopUp("Error", "Please write a script.", "error");
    setIsLoadingBtn(true);
    const data = { text: textReader };
    textToSpeechMutation(data);
  };

  const getHandler = (title: any) => {
    console.log("title", title);
    switch (title) {
      case "Background Remover AI":
        return handleRemoveBg();
      case "Face Enhancer AI":
        return handleFaceEnhance();
      case "Image Upscaler AI":
        return handleUpScale();
      case "Text Reader AI":
        return handleTextToSpeech();
      default:
        return () => console.error("Invalid tool title");
    }
  };

  const handleAiProcessing = async (action: string) => {
    if (!image) {
      swalPopUp("No Image", "", "Please upload an image first.");
      return;
    }

    // let apiFn;
    // let label;

    // switch (action) {
    //   case "removeBgImage":
    //     apiFn = aiApis.removeBgImage;
    //     label = "Background Removal";
    //     break;
    //   case "faceEnhance":
    //     apiFn = aiApis.faceEnhance;
    //     label = "Face Enhancement";
    //     break;
    //   case "imageUpscale":
    //     apiFn = aiApis.imageUpscale;
    //     label = "Image Upscale";
    //     break;
    //   default:
    //     swalPopUp("Invalid Action", "", "The requested AI processing is not supported.");
    //     return;
    // }

    // processImage({ apiFn, payload: image, label });
  };
  // const handleFileUpload = (event: any) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImage(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const utilityCards = [
    {
      title: "Background Remover AI",
      subHeading:
        "Effortlessly remove backgrounds with AI to isolate subjects.",
      img: "/assets/post background.png",
      info: "Upload the image from which you want the background removed. Our advanced AI will automatically select the object and remove the background.",
      icon: (
        <>
          <SquareUserRound />
        </>
      ),
    },
    {
      title: "Image Upscaler AI",
      subHeading:
        "Increase the resolution of your images without losing quality using AI.",
      img: "/assets/youtubecampaign.png",
      info: "Upload the image you want to be upscaled. Our advanced AI will automatically upscale the creative to a higher resolution.",
      icon: (
        <>
          <SquareArrowOutUpRight />
        </>
      ),
    },
    {
      title: "Face Enhancer AI",
      subHeading:
        "Add fine details and clarity to your images with precision AI.",
      img: "/assets/post background.png",
      info: "Upload your image for facial enhancement. Our advanced AI will automatically detect and enhance the human faces in the image.",
      icon: (
        <>
          <ScanFace />
        </>
      ),
    },
    {
      title: "Text Reader AI",
      subHeading:
        "Convert written text into natural, lifelike speech using AI voices.",
      img: "/assets/youtubecampaign.png",
      info: "Write your text that you want our AI voice artists to read. Our advanced AI voice artists will read your texts in any language.",
      icon: (
        <>
          <FileText />
        </>
      ),
    },
  ];

  const [openTool, setOpenTool] = useState(false);
  const [toolData, setToolData] = useState<any>();

  const handleTool = (data: any) => {
    setToolData(data);
    setImage(null);
    setOpenTool(true);
  };

  return (
    <>
     <Head>
       <title>AI</title>
       <meta property="og:title" content="Majai" />
       <meta
         property="og:description"
         content="AI marketing"
       />
        <meta
         property="og:image:secure"
         content="https://app.majai.se/assets/logo.webp"
       />
       <meta property="og:image" content="https://app.majai.se/assets/logo.webp"/>
       <meta property="og:url" content="https://majai.se" />
       <meta property="og:type" content="website" />
     </Head>
 
    <div>
      {/* <AiToolModal data={toolData} open={openTool} onOpenChange={setOpenTool} /> */}
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid size={{ xs: 12 }}>
          <Card className="bg-primary border-none p-4 !pt-4">
            <CardContent className="p-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Box
                    sx={{
                      background: "#ffff",
                      color: "#242730",
                      padding: 1,
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      mr: 1,
                    }}
                  >
                    <WandSparkles className="text-primary" />
                  </Box>
                  <p className="text-primary-color">
                    Utilize advanced AI tools for creative editing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {openTool ? (
        <div className="bg-primary-color/80 rounded-[15px] p-5 mt-5 ">
          <div className="flex justify-between items-center">
            <div className="flex mt-3 ">
              <div>
                <Box
                  sx={{
                    background: "#fff",
                    color: "#242730",
                    padding: 1,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    mr: 1,
                  }}
                >
                  {toolData?.icon}
                </Box>
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[#002EF6] ">
                  {toolData?.title}
                </p>
                <p className="text-[10px] text-[#9E9D9D] ">
                  {toolData?.subHeading}
                </p>
              </div>
            </div>
            <div className="cursor-pointer" onClick={() => setOpenTool(false)}>
              <X size={15} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              {toolData.title == "Text Reader AI" ? (
                <Card className="mt-2 p-4 h-[303px] rounded-[28px] ">
                  <p className="text-primary mt-2">Write your script</p>
                  <p className="text-[14px] text-[#9E9D9D] ">
                    Enter your script and choose an AI model to narrate it.
                  </p>
                  <div className="mt-4">
                    <CustomTextArea
                      css={"bg-[#ffff] text-[#6B7280] rounded-[16px] p-2"}
                      rows={8}
                      value={textReader}
                      handleAdvanceChange={(e: any) =>
                        setTextReader(e.target.value)
                      }
                      placeholder={"Write here"}
                    />
                  </div>
                </Card>
              ) : (
                <UtilityUpload setSelectedFile={setImage} />
                // <Card className="mt-2 p-4 h-[303px] rounded-[28px] ">
                //   <Label
                //     htmlFor="photo-upload"
                //     className="cursor-pointer w-full"
                //   >
                //     <div className="flex items-center justify-center rounded-[28px]  border-2 h-[270px] border-dashed border-primary text-center">
                //       <span className="flex flex-col items-center justify-center">
                //         <img
                //           src="/assets/upload icon.svg"
                //           width={60}
                //           style={{ margin: 0 }}
                //           alt="Upload img"
                //         />
                //         <p className="text-primary mt-2">
                //           Upload a product image or drag & drop a product image
                //           here.
                //         </p>
                //       </span>
                //       <Input
                //         id="photo-upload"
                //         type="file"
                //         className="hidden"
                //         onChange={handleFileUpload}
                //         accept={".png"}
                //       />
                //     </div>
                //   </Label>
                // </Card>
              )}
            </div>
            <div>
              <Card className="mt-2 p-2  h-[303px] flex items-center justify-center">
                <div className="text-center">
                  <div className="flex justify-center items-center mb-2">
                    <Box
                      sx={{
                        background: "#738DFE",
                        opacity: "40%",
                        color: "#242730",
                        padding: 1,
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        mr: 1,
                      }}
                    >
                      {toolData?.icon}
                    </Box>
                  </div>
                  <div>
                    <p className="text-[16px] text-primary font-semibold">
                      {toolData?.title}
                    </p>
                    <p className="text-[12px] text-[#9E9D9D]">
                      {toolData?.info}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          {image && (
            <div className="grid grid-cols-4 mt-3">
              <div className="relative border border-dashed  mt-2 mr-1 border-[#B1A4B5] w-[100px] h-[100px]">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Network Image"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
                <div
                  className="absolute top-1 right-1 bg-white rounded-full p-1 cursor-pointer"
                  onClick={handleRemoveFile}
                >
                  <DeleteIcon />
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end mt-2">
            <Button
              disabled={isLoadingBtn}
              className="text-primary-color"
              onClick={() => getHandler(toolData.title)}
            >
              {isLoadingBtn ? "Loading..." : "Generate "}
            </Button>
          </div>
        </div>
      ) : (
        <>
          <Grid container spacing={2} sx={{ mt: 4 }}>
            {utilityCards?.map((items: any, key: any) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  onClick={() => handleTool(items)}
                  className="bg-primary-color/70 cursor-pointer "
                >
                  <CardContent>
                    <div className="flex mt-3">
                      <div>
                        <Box
                          sx={{
                            background: "#fff",
                            color: "#738DFE",
                            padding: 1,
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            mr: 1,
                          }}
                        >
                          {items.icon}
                        </Box>
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-[#002EF6] ">
                          {items.title}
                        </p>
                        <p className="text-[10px] text-[#9E9D9D] ">
                          {items.subHeading}
                        </p>
                      </div>
                    </div>
                    <div
                      style={{ width: "100%", height: 100 }}
                      className="mt-2"
                    >
                      <img
                        src={items.img}
                        alt="YouTube Campaign"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={2} sx={{ mt: 4 }}>
            {attachments?.length > 0 &&
              attachments?.map((file: any, index: number) => (
                <Grid size={{ xs: 3 }}>
                  <div
                    key={index}
                    id={"utilityImgs"}
                    className="relative cursor-pointer border p-1 rounded-[16px] mt-2 mr-1 border-secondary w-[160px] h-[160px]"
                  >
                    <Badge
                      className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md shadow-md hover:bg-blue-600"
                      // onClick={() => handleSaveToDraft(index)}
                    >
                      Save to Draft
                    </Badge>
                    <img
                      src={`data:image/png;base64,${file}`}
                      className="w-[100%] h-[100%]"
                    />
                  </div>
                </Grid>
              ))}

            {generatedAudios?.length > 0 &&
              generatedAudios?.map((file: any, index: number) => (
                <Grid size={{ xs: 3 }}>
                  <div
                    key={index}
                    id={"utilityaudio"}
                    className="relative cursor-pointer border p-1 rounded-[16px] mt-2 mr-1 border-secondary w-[160px] h-[160px]"
                  >
                    <Badge
                      className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md shadow-md hover:bg-blue-600"
                      // onClick={() => handleSaveToDraft(index)}
                    >
                      Save to Draft
                    </Badge>
                    <audio
                      src={`data:audio/mp3;base64,${file}`}
                      controls
                      className="w-[100%] h-[100%]"
                    />
                  </div>
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </div>
    </>
  );
};

export default UtilitySuit;
