"use client";
import { Box, Divider, styled, Typography, BoxProps } from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CustomInputField from "@/components/customInputField";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CustomSelectField from "@/components/customSelectField";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import CustomPopOver from "@/components/customPopOver";
import { Progress } from "@/components/ui/progress";
import CustomModal from "@/components/customModal";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import UploadFilesModal from "./_components/uploadFilesModal";
import { base64ToBlob, formatTextWithSpaces, hasKeys, swalPopUp } from "@/lib/helper";

import { useRouter } from "next/navigation";
import SelectGoalModal from "./_components/selectGoalModal";
import CustomPriceInputField from "@/components/customPriceInputField";
import GenerateInputField from "./_components/generateInputField";
import CustomDrawer from "@/components/customDrawer";
import {
  ChevronRight,
  DeleteIcon,
  EditIcon,
  ImageIcon,
  SaveIcon,
  Sparkles,
  Trash2,
  VideoIcon,
  X,
} from "lucide-react";
import BudgetOptionalModal from "./_components/budgetOptionalModal";
import TargetModal from "./_components/targetModal";
import { ScrollArea } from "@/components/ui/scroll-area";
import CustomTextArea from "@/components/customTextArea";
import AdCombinationModal from "./_components/adCombinationModal";
import PreviewAdCard from "./_components/PreviewAdCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import aiApis from "@/services/indexAi";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  addTargetingChipsAi,
  setAdPrompt,
  setBrandName,
  setDescriptionData,
  setGeneratedSuggestionsData,
  setWebsiteUrl,
} from "@/store/slices/storeSlice";
import { setAdds } from "@/store/slices/addSlice";
import axios from "axios";
import SimpleOnboarding from "@/components/animationLoader";
import apis from "@/services";
import { ApiResponse, PaginatedResponse } from "@/types/apiResponse";
import { Brand } from "@/types/brand";
import { FacebookAdOptionsData } from "@/types/facebookAdOptions";
import { AdData, ForecastData, Objective } from "@/types/Ad";
import { generateTargetingPayload } from "@/lib/targetingPayloadHelper";
import { useBrands } from "@/hooks/useBrands";
import { setBrands } from "@/store/slices/brandSlice";
import ProgressLoader from "./_components/progressLoader";
import GenerateLoader from "./_components/generateLoader";
import RenderPlatformFields from "./_components/renderPlatformFields";
import AdsCarousel from "./_components/adsCarousel";
import { selectBrand } from "@/store/slices/selectedBrandSlice";
import NewPreviewCard from "./_components/newPreviewCard";
import Head from "next/head";

const targetChips = [
  "The joy of marketing",
  "Chief Marketing Officer",
  "Marketing",
  "Chief Marketing Officer",
  "The joy of marketing",
  "Marketing",
  "The joy of marketing",
  "Chief Marketing Officer",
  "Marketing",
];

const timePeriod = [
  { name: "Daily", id: 1, key: "daily" },
  { name: "Weekly", id: 2, key: "weekly" },
  { name: "Monthly", id: 3, key: "monthly" },
];

const creativeTypes = [
  { name: "Image", id: "1" },
  { name: "Video", id: "2" },
  { name: "Carousel", id: "3" },
];

const objectives = [
  {
    title: "Target Interests",
    description: "Reach people who don't know you yet",
  },
  // {
  //   title: "Lookalike Audience",
  //   description: "Reach people who look like your customers",
  // },
  // { title: "Retargeting", description: "Reach only people who know you" },
];

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingBottom: 2,
  justifyContent: "space-between",
  backgroundColor: "#f7f7f9",
}));

const CreateAdForm = () => {
  const dispatch = useAppDispatch();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(44);
  const [currentTimeChip, setCurrentTimeChip] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [loaderModal, setLoaderModal] = useState(false);
  const [selectedObjective, setSelectedObjective] = useState<Objective | null>(
    null
  );
  const [selectedTarget, setSelectedTarget] = useState<any>(
    objectives?.[0]?.title
  );
  const [toggleValue, setToggleValue] = useState(false);
  const [forecast, setForecast] = useState<ForecastData>({
    daily: null,
    weekly: null,
    monthly: null,
  });
  const [isUploadModal, setIsUploadModal] = useState(false);
  const [optionalModalOpen, setOptionalModalOpen] = useState(false);
  const [adCombinationModalOpen, setAdCombinationModalOpen] = useState(false);
  const [targetDialogOpen, setTargetDialogOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [creativeTypeValue, setCreativeTypeValue] = useState(
    creativeTypes?.[0]?.id
  );

  const [projectId, setProjectId] = useState<number | null>(null);
  const [fetchBrands, setFetchBrands] = useState(true);
  const [fetchFacebookOptions, setFetchFacebookOptions] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track the index of the item being edited
  const [activeTab, setActiveTab] = useState("PrimaryText");

  const brands = useAppSelector((state) => state.brand.brands);
  const selectedBrand = useAppSelector((state) => state.selectedBrand.brand);

  const handleObjectiveSelection = (objective: Objective) => {
    dispatch(
      setAdds({
        ...adds,
        campaignGoal: objective,
      })
    );
  };
  const toneOptions = [
    "Polite",
    "Formal",
    "Aggressive",
    "Friendly",
    "Professional",
    "Confident",
    "Casual",
    "Encouraging",
    "Respectful",
    "Direct",
  ];
  const [imagePrompt, setImagePrompt] = useState("");
  const [videoPrompt, setVideoPrompt] = useState("");
  const initialAdData = {
    brandName: "",
    prompt: "",
    websiteUrl: "",
    language: "",
    description: "",
    files: [],
    ctaButtonText: "Shop Now",
    primaryText: "",
    brand: null,
    headline:"",
    optimizationGoal:"REACH"
  };
  const { adds } = useAppSelector((state) => state.adds);
  const [addsData, setAddsData] = useState<AdData>(adds ?? initialAdData);

  const [carouselAttachments, setCarouselAttachments] = React.useState(
    (addsData.files ?? []).map((file: any) => ({
      type: file.label || "image", // Default to "image" if label is missing
      file: file.file,
      description: "",
    }))
  );

  const TargetingChipsAi = useAppSelector(
    (state) => state.reduxStore.targetingChipsAi
  );
  const hashtags = TargetingChipsAi.map((item: any) => `#${item}`).join(" ");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    dispatch(
      setAdds({
        ...adds,
        [name]: value,
      })
    );
  };

  console.log("==adds==", adds?.files);
  console.log("==adds data==", addsData?.files);

  const scrollToPrimaryContent = () => {
    setTimeout(() => {
      const element = document.getElementById("primaryContent");
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }, 100); // Adjust delay if necessary
  };

  useEffect(() => {
    setAddsData(adds ?? initialAdData);
  }, [adds]);

  useEffect(() => {
    if (addsData && addsData.files) {
      setCarouselAttachments(
        addsData.files.map((file: any) => ({
          type: file.label || "image", // Default to "image" if label is missing
          file: file.file,
          description: "",
        }))
      );
    }
  }, [addsData]);

  const platformName = useAppSelector((state) => state.reduxStore.platformName);

  let generatePrimaryText = useAppSelector(
    (state) => state.reduxStore.generated_suggestions?.descriptions
  );
  let generateHeadlineText = useAppSelector(
    (state) => state.reduxStore.generated_suggestions?.headlines
  );

  let generatedData = useAppSelector(
    (state) => state.reduxStore.generated_suggestions
  );

  const router = useRouter();

  const handleRadioChange = (value: any) => {
    setCreativeTypeValue(value);
  };

  const getForecastValues = () => {
    const selectedPeriod = timePeriod.find(
      (item) => item.id === currentTimeChip
    )?.key as keyof ForecastData; // Type assertion ensures valid key
    const data = forecast[selectedPeriod] || {
      spend: "N/A",
      reach: "N/A",
      actions: "N/A",
    };
    console.log(
      "currentfore",
      timePeriod.find((item) => item.id === currentTimeChip)
    );
    return data;
  };

  const { spend, reach, actions } = getForecastValues();

  const handleTimeChip = (item: any) => {
    const { spend, reach, actions } = getForecastValues();
    // console.log('currentfore', item)
    setCurrentTimeChip(item.id);
  };

  console.log("primaryText", addsData.primaryText);

  const handleRemoveItem = (key: number) => {
    const updatedChips = TargetingChipsAi.filter(
      (_: any, index: any) => index !== key
    );
    dispatch(addTargetingChipsAi(updatedChips));
  };

  const { mutate: generateImage, isPending: generateImagePending }: any =
    useMutation({
      mutationFn: aiApis.createAiImage,
      onSuccess: ({
        data,
      }: {
        data: {
          data: any;
          status: boolean;
          message: string;
          image_url: string;
        };
      }) => {
        let file = data.image_url;
        dispatch(
          setAdds({
            ...adds,
            files: [
              ...(adds?.files ?? []),
              { type: "url", label: "image", file },
            ],
          })
        );
      },
      onError: (error: any) => {
        swalPopUp(error.message, "", error.message);
        console.log("Error in Generating Image", error);
      },
    });

    const { mutate: generateImageWithoutLoader}: any =
    useMutation({
      mutationFn: aiApis.createAiImage,
      onSuccess: ({
        data,
      }: {
        data: {
          data: any;
          status: boolean;
          message: string;
          image_url: string;
        };
      }) => {
        let file = data.image_url;
        dispatch(
          setAdds({
            ...adds,
            files: [
              ...(adds?.files ?? []),
              { type: "url", label: "image", file },
            ],
          })
        );
      },
      onError: (error: any) => {
        swalPopUp(error.message, "", error.message);
        console.log("Error in Generating Image", error);
      },
    });
  const { mutate: generateTone, isPending: isPendingTone }: any = useMutation({
    mutationFn: aiApis.generateTone,
    onSuccess: ({
      data,
    }: {
      data: {
        response: { index: number; text: string };
        status: boolean;
        message: string;
      };
    }) => {


      let updatedGeneratePrimaryText = generatePrimaryText.map(
        (item: any, i: any) =>
          i == data?.response?.index ? data?.response?.text : item
      );

      dispatch(
        setGeneratedSuggestionsData({
          ...generatedData,
          descriptions: updatedGeneratePrimaryText,
        })
      );
    },
    onError: (error: any) => {
      swalPopUp(error.message, "", error.message);
      console.log("Error in Generating Video", error);
    },
  });

  const { mutate: generateToneHeadlines, isPending: isPendingHeadlines }: any = useMutation({
    mutationFn: aiApis.generateTone,
    onSuccess: ({
      data,
    }: {
      data: {
        response: { index: number; text: string };
        status: boolean;
        message: string;
      };
    }) => {

      let updatedGenerateHeadlineText = generateHeadlineText.map(
        (item: any, i: any) =>
          i == data?.response?.index ? data?.response?.text : item
      );

      dispatch(
        setGeneratedSuggestionsData({
          ...generatedData,
          headlines: updatedGenerateHeadlineText
        })
      );
    },
    onError: (error: any) => {
      swalPopUp(error.message, "", error.message);
      console.log("Error in Generating Video", error);
    },
  });

  const { mutate: generateVideo, isPending: isLoadingVideoGenerate }: any =
    useMutation({
      mutationFn: aiApis.createAiVideo,
      onSuccess: ({
        data,
      }: {
        data: { status: boolean; message: string; video_url: string };
      }) => {
        let file = data.video_url;
        setAddsData((prev: any) => ({
          ...prev,
          files:
            prev?.files?.length > 0
              ? [...prev.files, { type: "url", label: "video", file }]
              : [{ type: "url", label: "video", file }],
        }));

        if (data?.status) {
          swalPopUp("Success", "AI Video Generated", "success");
        }
      },
      onError: (error: any) => {
        swalPopUp(error.message, "", error.message);
        console.log("Error in Generating Video", error);
      },
    });

  const handleGenerateSuggestions = () => {
    const formData = {
      brand_name: addsData?.brandName,
      product_description: addsData?.description,
      prompt: addsData?.prompt || "",
      platform: platformName?.platform_name || "Facebook",
      language: addsData?.language,
    };
    generateSuggestions(formData);
    setOpenDrawer(false);

  };

  const { mutate: generateAd, isPending: isPendingGenerateAdd }: any =
    useMutation({
      mutationFn: aiApis.generateNewAd,
      onSuccess: ({
        data,
      }: {
        data: {
          generated_suggestions: any;
          status: boolean;
          message: string;
        };
      }) => {
        console.log("form submit", data);
        
        dispatch(
          setDescriptionData(
            data?.generated_suggestions?.suggestions?.[0]?.text
          )
        );
        dispatch(
          setAdds({
            ...adds,
            description: data?.generated_suggestions?.suggestions?.[0]?.text,
          })
        );
      setOpenDrawer(true);
        swalPopUp("success", "Add generated", "success");
      },
      onError: (error: any) => {
        swalPopUp(error.message, "", error.message);
        console.log("Error in Generating", error);
      },
    });

  const { mutate: generateSuggestions, isPending: isLoadingSuggestions }: any = useMutation({
    mutationFn: aiApis.generateSuggestion,
    onSuccess: ({
      data,
    }: {
      data: { success: boolean; generated_suggestions: any; message: string };
    }) => {
      console.log("suggestions dataee", data?.generated_suggestions);
      dispatch(setGeneratedSuggestionsData(data?.generated_suggestions));
      if (data?.success) {
      
        setAddsData((prevState: any) => ({
          ...prevState,
          primaryText: data?.generated_suggestions?.descriptions?.[0],
        }));
        
        setAddsData((prevState: any) => ({
          ...prevState,
          headline: data?.generated_suggestions?.headlines?.[0],
        }));
        generateImageWithoutLoader(addsData?.description)
        
        swalPopUp("Success", "AI suggestions Generated", "success");
        setToggleValue(true);

        setTimeout(() => {
          scrollToPrimaryContent();
        }, 100);
      }
    },
    onError: (error: any) => {
      swalPopUp(error.message, "", error.message);
      console.log("Error in Generating Image", error);
    },
  });

  const { mutate: saveProject, isPending: isSaving }: any  = useMutation({
    mutationFn: async (projectData: any) => {
      if (projectId) {
        return apis.updateProject(projectId, {
          ...projectData,
          _method: "PUT",
        }); // Update if project exists
      } else {
        return apis.createProject(projectData); // Create new project
      }
    },
    onSuccess: ({ data }: { data: any }) => {
      swalPopUp("Success", "Project saved successfully", "success");
      setProjectId(data.id); // Set the project ID for future updates
      console.log(data,"datadatadatadata")
      router.push(`/adResults?id=${data?.data?.ad_id}`)
    },
    onError: (error: any) => {
      console.log("Error sa", error);
      if (error.errors?.error?.message) {
        swalPopUp("Error", error.errors?.error?.message || "Something went wrong while saving the project", "error");
      }
      else if (error && error?.errors?.error?.error_user_msg) {
        swalPopUp(
          "Error",
          error?.errors?.error?.error_user_msg ||
          "Something went wrong while saving the project",
          "error"
        );
      } else {
        console.log("Error sa");
        swalPopUp(
          "Error",
          error.message || "Something went wrong while saving the project",
          "error"
        );
      }
    },
  });

  const handleFormSave = async (status = "draft") => {
    // Ensure required fields for draft are present
    console.log("🚀 ~ handleFormSaveAsDraft ~ addsData:", addsData);
    if (
      !addsData?.brand?.name ||
      !addsData?.brand?.id ||
      !addsData?.websiteUrl ||
      !addsData?.bidAmount ||
      !addsData?.campaignName ||
      !addsData?.budget
    ) {
      swalPopUp("Error", "Please fill out all required fields.s", "error");
      return;
    }

    if (addsData?.files?.length == 0) {
      swalPopUp("Error", "Please select any media file please.", "error");
      return;
    }

    const platform = "facebook"; // Will be dynamic later
    const campaign = addsData?.campaignGoal?.platformValues[platform] ?? "traffic";

    const generatedTargeting = generateTargetingPayload(
      adds || initialAdData,
      platform
    );

    // Prepare media files for submission
    const formData = new FormData();

    if (creativeTypeValue === "1" || creativeTypeValue === "2") {
      if (addsData?.files) {
        // Process all files (both AI-generated and user-uploaded)
        await Promise.all(
          addsData.files.map(async (file: any) => {
            if (file.type === "url") {
              // If AI-generated media, fetch the file from the URL
              try {
                const res = await fetch(file.file);
                const blob = await res.blob();
                formData.append(
                  "media_files[]",
                  blob,
                  `ai-media-${Date.now()}.jpg`
                ); // Add a unique name
              } catch (err) {
                console.error("Error fetching AI media:", err);
              }
            } else if (file.type === "base64") {
              // If the file is a Base64 string, convert to Blob and append
              try {
                const mimeType =
                  file.file.match(/^data:(.*?);base64,/)?.[1] ||
                  "application/octet-stream"; // Extract MIME type from Base64 string
                const base64String = file.file.split(",")[1]; // Get Base64 data without the prefix
                const blob = base64ToBlob(base64String, mimeType); // Convert to Blob
                formData.append(
                  "media_files[]",
                  blob,
                  file.label || `upload-${Date.now()}.jpg`
                );
              } catch (err) {
                console.error("Error processing Base64 file:", err);
              }
            } else if (file.file) {
              console.log("filess", file);
              // If user-uploaded media, append directly
              formData.append("media_files[]", file.file);
            }
          })
        );
      }
    } else if (creativeTypeValue === "3" && carouselAttachments) {
      carouselAttachments.forEach((attachment, index) => {
        // Append each property of the carouselAttachments object
        formData.append(
          `carousel_attachments[${index}][type]`,
          attachment.type
        );
        formData.append(
          `carousel_attachments[${index}][description]`,
          attachment.description
        );
        formData.append(
          `carousel_attachments[${index}][file]`,
          attachment.file
        );
      });
    }

    formData.append("brand_id", addsData?.brand?.id.toString());
    formData.append("platform_id", platform === "facebook" ? "1" : "0");
    formData.append("name", addsData?.brand?.name || "Untitled Draft");
    formData.append("status", status);
    formData.append(
      "ad_type",
      creativeTypes
        .find((x) => x.id == creativeTypeValue)
        ?.name.toLocaleLowerCase() || "image"
    );
    formData.append("campaign_goal", campaign || "traffic");
    formData.append("cta_button_text", addsData?.ctaButtonText ?? "");
    formData.append("cta_url", addsData?.websiteUrl);
    formData.append("target_audience", JSON.stringify(generatedTargeting));
    formData.append("budget", addsData?.budget?.toString() || "0");
    formData.append("campaign_name", addsData?.campaignName ?? "");
    formData.append("billing_event", addsData?.billingEvent ?? "");
    formData.append("bid_amount", addsData?.bidAmount ?? "");
    formData.append("optimization_goal", addsData?.optimizationGoal ?? "REACH");
    formData.append("headline", addsData?.headline ?? "");

    // formData.append("primary_text", addsData?.primaryText || "");
    // formData.append("language", JSON.stringify(addsData?.language || ["en"]));
    // formData.append("description", addsData?.primaryText + hashtags || "");
    // formData.append("target_audience", JSON.stringify(generatedTargeting));
    // formData.append("age_group", JSON.stringify(addsData?.ageGroup || []));
    // formData.append("campaign_goal", campaign || "awareness");
    // formData.append("start_date", addsData?.startDate || "");
    // formData.append("end_date", addsData?.endDate || "");
    // formData.append("creative_settings", JSON.stringify(addsData?.files || []));

    // Save draft
    try {
      await saveProject(formData); // Assuming saveProject uses FormData
    } catch (error) {
      console.error("Error saving project draft:", error);
      swalPopUp(
        "Error",
        "Something went wrong while saving the project.",
        "error"
      );
    }
  };

  // const { mutate: getForecast, isPending: forecastPending }: any = useMutation({
  //   mutationFn: apis.getForecast,
  //   onSuccess: ({
  //     data,
  //   }: {
  //     data: {
  //       data: any;
  //       status: boolean;
  //       message: string;
  //       image_url: string;
  //     };
  //   }) => {
  //     console.log("foredata.data", data.data);
  //     setForecast(data.data);
  //   },
  //   onError: (error: any) => {
  //     swalPopUp(error.message, "", error.message);
  //     console.log("Error in Generating Image", error);
  //   },
  // });

  const handleForecast = (updatedAdds: any) => {
    const targetingSpec = generateTargetingPayload(
      updatedAdds || initialAdData,
      "facebook"
    );

    const payload = {
      brand_id: updatedAdds?.brand?.id || 1,
      daily_budget: updatedAdds?.budget || 500000,
      optimization_goal: updatedAdds?.optimizationGoal || "IMPRESSIONS",
      targeting_spec: {
        geo_locations: {
          countries: targetingSpec.geo_locations?.countries || ["us"],
        },
        age_min: targetingSpec.age_min || 18,
        age_max: targetingSpec.age_max || 65,
        interests: targetingSpec.interests || [
          { id: "6003139266461", name: "Technology" },
          { id: "6003349442621", name: "Business" },
        ],
      },
    };
  };

  const handleCampaignChange = (input: any) => {
    const { value } = input.target;
    dispatch(
      setAdds({
        ...adds,
        campaignName: value,
      })
    );
  };

  const handleBudgetChange = (input: any) => {
    const { value } = input.target;
    dispatch(
      setAdds({
        ...adds,
        budget: value,
      })
    );
  };

  const handleFormSubmit = () => {
    // if (
    //   (
    //     addsData?.brandName &&
    //     addsData?.prompt &&
    //     addsData?.websiteUrl &&
    //     addsData?.language &&
    //     addsData?.brandName == "") ||
    //   addsData?.prompt == "" ||
    //   addsData?.websiteUrl == "" ||
    //   addsData?.language == ""
    // ) {
    //   swalPopUp("Error", "Please fill out all required fields.", "error");
    //   setOpenDrawer(true);
    // }
    if (
      !addsData?.brandName ||
      !addsData?.prompt ||
      !addsData?.websiteUrl ||
      !addsData?.language
    ) {
      swalPopUp("Error", "Please fill out all required fields.", "error");
      setOpenDrawer(true);
    } else {

      generateAd({ ...addsData, brand_name: addsData?.brandName });
    }
  };

  const handleGenerateAiImage = () => {
    if (imagePrompt == "") {
      swalPopUp("Error", "Please fill out prompt required field.", "error");
    } else {
      // setLoaderModal(true);
      generateImage(imagePrompt);
    }
  };
  const handleGenerateAiVideo = () => {
    const formData = {
      duration: 5,
      aspect_ratio: "16:9",
      prompt: videoPrompt,
    };
    if (!videoPrompt) {
      swalPopUp("Error", "Please give a prompt", "error");
    } else {
      generateVideo(formData);
    }
  };
  const handleRemoveFile = (fileToRemove: any) => {
    let files = addsData?.files?.filter(
      (file: any) => file.file !== fileToRemove
    );
    dispatch(
      setAdds({
        ...adds,
        files: files,
      })
    );
  };

  const filterStatus = (key: any) => {
    const updatedStatus = generatePrimaryText?.filter(
      (item: any , index:any) => key !== index
    );
    dispatch(
      setGeneratedSuggestionsData({
        ...generatedData,
        descriptions: updatedStatus,
      })
    );
  };

  const filterStatusHeadlines = (key: any) => {
    const updatedStatus = generateHeadlineText?.filter(
      (item: any , index:any) => key !== index
    );
    dispatch(
      setGeneratedSuggestionsData({
        ...generatedData,
        headlines: updatedStatus,
      })
    );
  };

  // Fetch Brands and their connection statuses
  const { data: brandsData, } = useBrands();

  useEffect(() => {
    if (brandsData) {
      dispatch(setBrands(brandsData));
    }
  }, [brandsData]);

  useEffect(() => {
    if (brands && brands?.data?.length > 0 && !selectedBrand) {
      dispatch(selectBrand(brands?.data?.[0]));
    }
  }, [brands]);

  useEffect(() => {
    if (selectedBrand) {
      // setAddsData((prev: any) => ({
      //   ...prev,
      //   brandName: selectedBrand.name,
      //   websiteUrl: selectedBrand.web_url,
      //   description: selectedBrand.description,
      //   brand: selectedBrand,
      // }))

      dispatch(
        setAdds({
          ...addsData,
          brand: selectedBrand,
          brandName: selectedBrand?.name,
          // websiteUrl: selectedBrand.web_url,
          // description: selectedBrand.description,
        })
      );
    }
  }, [selectedBrand]);

  const { data: facebookStaticOptions, refetch: facebookStaticOptionRefetch } =
    useQuery({
      queryKey: ["facebookAdStaticOptionList"],
      queryFn: async (): Promise<ApiResponse<FacebookAdOptionsData>> => {
        const response = await apis.facebookStaticOptions(); // API call
        return response.data;
      },
      enabled: fetchFacebookOptions,
      select: (response) => {
        // Handle transformation if needed
        if (!response.success) {
          throw new Error("Failed to fetch Brands.");
        }
        return response.data;
      },
    });

  useEffect(() => {
    if (platformName?.platform_name?.toLowerCase() == "facebook") {
      setFetchFacebookOptions(true);
    }
  }, [platformName]);

  const handleSelectImage = (file: any) => {
    let fileAlreadyExists = false;

    fileAlreadyExists =
      adds?.files?.some((f: any) => f?.file?.label === file?.file?.name) ??
      false;

    if (!fileAlreadyExists) {
      dispatch(
        setAdds({
          ...adds,
          files: [...(adds?.files ?? []), file],
        })
      );
    }

    return fileAlreadyExists;
  };
  console.log("addsData?.primaryText", addsData?.primaryText);

  // useEffect(() => {
  //   handleForecast(addsData);
  // }, []);

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
        <meta property="og:image" content="https://app.majai.se/assets/logo.webp" />
        <meta property="og:url" content="https://majai.se" />
        <meta property="og:type" content="website" />
      </Head>
      <GenerateLoader
        mediaIcon={
          generateImagePending ? (
            <ImageIcon className="size-16 text-blue-400" strokeWidth={1.4} />
          ) : (
            <VideoIcon className="size-16 text-blue-400" strokeWidth={1.4} />
          )
        }
        content={isLoadingVideoGenerate ? "Video" : "Image"}
        loading={generateImagePending || isLoadingVideoGenerate}
      />
      <TargetModal
        open={targetDialogOpen}
        onOpenChange={setTargetDialogOpen}
        selectedTarget={selectedTarget}
        objectives={objectives}
        // aiTargetingChips={generatedSuggestionsData?.keywords}
        setSelectedTarget={setSelectedTarget}
      />
      <BudgetOptionalModal
        open={optionalModalOpen}
        onOpenChange={setOptionalModalOpen}
      />
      <AdCombinationModal
        open={adCombinationModalOpen}
        callAction={addsData?.ctaButtonText}
        onOpenChange={setAdCombinationModalOpen}
        posts={addsData?.files ?? []}
      />
      <CustomDrawer
        open={openDrawer}
        setOpenDrawer={setOpenDrawer}
        drawerPageContent={
          <div>
            <Header>
              <p>{"Prompt"}</p>
              <X
                size={16}
                className="cursor-pointer "
                onClick={() => setOpenDrawer(false)}
              />
            </Header>

            <Divider sx={{ mt: 1, mb: 2 }} />
            <ScrollArea className="h-[100vh] pb-24 pr-4">
              <Grid container spacing={2} sx={{ pb: 5, p: 1 }}>
                <Grid size={{ xs: 12 }}>
                  <CustomInputField
                    label="Website"
                    name="websiteUrl"
                    css={
                      "bg-[#ffff] p-5 border-none shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[22px]"
                    }
                    type={"text"}
                    placeholder={"www.abc.com"}
                    value={addsData?.websiteUrl}
                    handleAdvanceChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <CustomSelectField
                    value={addsData?.language}
                    options={[
                      { value: "us", label: "English" },
                      { value: "spain", label: "Spanish" },
                      { value: "france", label: "French" },
                      { value: "germany", label: "German" },
                      { value: "italy", label: "Italian" },
                      { value: "japan", label: "Japanese" },
                      { value: "china", label: "Chinese" },
                      { value: "brazil", label: "Portuguese" },
                      { value: "india", label: "Hindi" },
                      { value: "russia", label: "Russian" },
                      { value: "southAfrica", label: "Afrikaans" },
                      { value: "sweden", label: "Swedish" },
                    ]}
                    label={"Choose your prefered language"}
                    placeholder={"Choose your prefered language"}
                    css={
                      "bg-[#ffff] text-[#6B7280] border-none active:border-none rounded-[22px] p-5"
                    }
                    onValueChange={(value: any) =>
                      dispatch(
                        setAdds({
                          ...adds,
                          language: value,
                        })
                      )
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <CustomTextArea
                    name="prompt"
                    css={"bg-[#ffff] text-[#6B7280] rounded-[16px] p-2"}
                    rows={6}
                    label="Describe what your are advertising (Ad Theme)"
                    value={addsData?.prompt}
                    placeholder={"50% Rabbatt"}
                    handleAdvanceChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  {/* <CustomSelectField
                    options={[
                      { value: "apple", label: "Apple" },
                      { value: "samsung", label: "Samsung" },
                      { value: "redmi", label: "Redmi" },
                      { value: "realme", label: "Realme" },
                      { value: "infinix", label: "Infinix" },
                    ]}
                    label={"Brand Name"}
                    onValueChange={(value: any) =>
                      dispatch(setBrandName(value))
                    }
                    placeholder={"select"}
                    css={
                      "bg-[#ffff] text-[#6B7280] border-none active:border-none rounded-[22px] p-5"
                    }
                  /> */}
                  <CustomInputField
                    name="brandName"
                    label="Brand Name"
                    css={
                      "bg-[#ffff] p-5 border-none shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[22px]"
                    }
                    type={"text"}
                    value={addsData?.brandName}
                    placeholder={"Enter brand name"}
                    handleAdvanceChange={handleChange}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Button
                    disabled={isPendingGenerateAdd}
                    onClick={handleFormSubmit}
                    className="bg-transparent text-secondary "
                  >
                    {isPendingGenerateAdd ? "Loading..." : "Generate "}
                    <span>
                      {" "}
                      <ChevronRight size={15} />{" "}
                    </span>{" "}
                  </Button>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <CustomTextArea
                    css={"bg-[#ffff] text-[#6B7280] rounded-[16px] p-2"}
                    rows={6}
                    label="Result"
                    // disabled={true}
                    value={addsData?.description}
                    handleAdvanceChange={(e: any) =>
                      dispatch(setDescriptionData(e.target.value))
                    }
                    placeholder={"Result"}
                  />
                </Grid>



                {addsData?.description &&
                  (
                    <Grid size={{ xs: 12 }}>
                      <Button
                        disabled={isLoadingSuggestions}
                        onClick={handleGenerateSuggestions}
                        className="bg-transparent text-secondary "
                      >
                        {isLoadingSuggestions ? "Loading..." : "Generate Ideas"}
                        <span>
                          {" "}
                          <ChevronRight size={15} />{" "}
                        </span>{" "}
                      </Button>
                    </Grid>
                  )
                }

              </Grid>
            </ScrollArea>
          </div>
        }
      />
      <UploadFilesModal
        open={isUploadModal}
        onOpenChange={setIsUploadModal}
        addsData={addsData}
        setAddsData={setAddsData}
        handleRemoveFileAddsData={handleRemoveFile}
      />
      {/* <UploadFilesModal
        open={isUploadModal}
        onOpenChange={setIsUploadModal}
        setAddsData={setAddsData}
        handleRemoveFileAddsData={handleRemoveFile}
      /> */}
      <SelectGoalModal
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedObjective={adds?.campaignGoal}
        setSelectedObjective={handleObjectiveSelection}
      />
      <Grid container spacing={2}>
        {isLoadingSuggestions ? (
          <Grid size={{ xs: 12, md: 8 }}>
            <ProgressLoader />
          </Grid>
        ) : (
          <>
            <Grid size={{ xs: 12, md: 8 }}>
              <Card className="rounded-lg p-3 bg-primary-color/70">
                <div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-4">
                    <p className="text-lg md:text-xl font-semibold text-black text-center md:text-left">
                      Advertise In Seconds
                    </p>
                    <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
                      <Badge className="rounded-[18px] text-center pt-1.5 pb-1.5 pl-3 pr-3 md:pt-2 md:pb-2 md:pl-4 md:pr-4 text-primary-color bg-[#002EF6] text-[10px] md:text-[12px]">
                        Goal: {adds?.campaignGoal?.title}
                      </Badge>
                      <p
                        onClick={() => setIsDialogOpen(true)}
                        className="text-[10px] md:text-[12px] text-[#002EF6] font-semibold cursor-pointer"
                      >
                        Edit
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <GenerateInputField
                      icon={<ChevronRight className="h-6 w-6 bg-[#738dfe] rounded-md text-white" />}
                      genBtn={true}
                      placeholder={
                        addsData?.prompt && addsData?.prompt != ""
                          ? addsData?.prompt?.slice(0, 30) + "..."
                          : "50% robbott"
                      }
                      css={
                        "bg-primary-color border-none mt-2 p-5 shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[18px]"
                      }
                      btnText={
                        <div
                          aria-disabled={isPendingGenerateAdd}
                          onClick={handleFormSubmit}
                          className="flex justify-between items-center"
                        >
                          <Sparkles size={14} className="mr-2" />
                          {isPendingGenerateAdd
                            ? "Loading..."
                            : "Generate new ad"}
                        </div>
                      }
                      onIconClick={() => setOpenDrawer(true)}
                    />

                  </div>

                  <div className="mt-4">
                    <CustomInputField
                      label="Campaign Name"
                      value={adds?.campaignName}
                      handleAdvanceChange={handleCampaignChange}
                      css={
                        "bg-[#ffff] p-5 border-none shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[22px]"
                      }
                      type={"text"}
                      placeholder={"www.abc.com"}
                    />
                  </div>
                  {/* Section 1 Targeting */}
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-black text-[16px] font-semibold">
                      1. Targeting
                    </p>
                    <p
                      onClick={() => setTargetDialogOpen(true)}
                      className="text-primary text-[12px] cursor-pointer font-semibold"
                    >
                      Edit
                    </p>
                  </div>
                  <Separator orientation="horizontal" className="my-4" />
                  <div className="mt-3">
                    {
                      TargetingChipsAi?.length > 0 ? (
                        TargetingChipsAi.map((items: any, key: any) => (
                          <Badge
                            key={key}
                            className={` m-1 rounded-[18px] pt-2 pb-2 pr-4 pl-4 text-[14px] font-normal bg-primary text-primary-color`}
                          >
                            <div className=" flex justify-between items-center">
                              <span>{items}</span>
                              <span
                                onClick={() => handleRemoveItem(key)}
                                className="ml-2 cursor-pointer text-primary-color hover:text-red-500"
                              >
                                <X size={14} />
                              </span>
                            </div>
                          </Badge>
                        ))
                      ) : (
                        // targetChips.map((items: any, key: any) => (
                        <Badge
                          // key={key}
                          onClick={() => setTargetDialogOpen(true)}
                          className={`cursor-pointer m-1 rounded-[18px] pt-2 pb-2 pr-4 pl-4 text-[14px] font-normal bg-primary text-primary-color`}
                        >
                          Add Target Audience
                        </Badge>
                      )
                      // ))
                    }
                  </div>

                  {/* Section 2 Creative */}
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-black text-[16px] font-semibold">
                      2. Creative
                    </p>
                  </div>
                  <Separator orientation="horizontal" className="my-4" />
                  {platformName?.platform_name?.toLowerCase() !=
                    "googlesearch" && (
                      <div className="mt-3">
                        <RadioGroup
                          className="flex  items-center "
                          defaultValue={creativeTypes[0].id}
                          value={creativeTypeValue}
                          onValueChange={(value) => handleRadioChange(value)}
                        >
                          {creativeTypes.map((item: any, key: any) => (
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value={item.id}
                                id={`r${item.id}`}
                                className={`${creativeTypeValue === item.id
                                  ? "bg-primary "
                                  : ""
                                  }`}
                              // onChange={() => handleRadioChange(item.id)}
                              />
                              <Label htmlFor={`r${item.id}`}>{item.name}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    )}
                  {/* upload field */}
                  {creativeTypeValue == creativeTypes[0].id ? (
                    <>
                      <div className="mt-5">
                        <GenerateInputField
                          onBtnClick={() => {
                            if (!generateImagePending) {
                              handleGenerateAiImage();
                            }
                          }}
                          genBtn={true}
                          onIconClick={() => setIsUploadModal(true)}
                          btnText={
                            generateImagePending
                              ? "Loading..."
                              : "Generate Image"
                          }
                          label="Ad at least one image"
                          css={
                            "bg-primary-color border-none mt-2 p-5 shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[18px]"
                          }
                          value={imagePrompt}
                          handleAdvanceChange={(e: any) =>
                            setImagePrompt(e.target.value)
                          }
                          endIcon={true}
                          icon={
                            <AddOutlinedIcon className="h-4 w-4 text-gray-500" />
                          }
                          placeholder={"Image"}
                        />
                      </div>
                    </>
                  ) : creativeTypeValue == creativeTypes[1].id ? (
                    <>
                      <div className="mt-5">
                        <GenerateInputField
                          genBtn={true}
                          onIconClick={() => setIsUploadModal(true)}
                          onBtnClick={() => {
                            if (!isLoadingVideoGenerate) {
                              handleGenerateAiVideo();
                            }
                          }}
                          btnText={
                            isLoadingVideoGenerate
                              ? "Loading..."
                              : "Generate video"
                          }
                          label="Ad at least one video"
                          css={
                            "bg-primary-color border-none mt-2 p-5 shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[18px]"
                          }
                          value={videoPrompt}
                          handleAdvanceChange={(e: any) =>
                            setVideoPrompt(e.target.value)
                          }
                          endIcon={true}
                          icon={
                            <AddOutlinedIcon className="h-4 w-4 text-gray-500" />
                          }
                          placeholder={"Video"}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className=" grid grid-cols-1 ">
                        <AdsCarousel
                          addsData={addsData}
                          setAddsData={setAddsData}
                          carouselAttachments={carouselAttachments}
                          setCarouselAttachments={setCarouselAttachments}
                        />
                      </div>
                    </>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 mt-2">
                    {addsData?.files?.map((file: any, index: number) => (
                      <div
                        key={index}
                        className="relative aspect-square cursor-pointer border p-1 rounded-[16px] border-secondary"
                      >
                        {file?.label === "video" ? (
                          <video
                            controls
                            src={
                              file?.type === "url"
                                ? file?.file
                                : file?.type === "base64"
                                  ? `data:video/mp4;base64,${file?.file}`
                                  : URL.createObjectURL(file?.file)
                            }
                            className="w-full h-full object-cover rounded-[14px]"
                          />
                        ) : (
                          <img
                            src={
                              file?.type === "url"
                                ? file?.file
                                : file?.type === "base64"
                                  ? `data:image/png;base64,${file?.file}`
                                  : URL?.createObjectURL(file?.file)
                            }
                            alt="Network Image"
                            className="w-full h-full object-cover rounded-[14px]"
                          />
                        )}
                        <button
                          className="absolute top-1 right-1 bg-white rounded-full p-1 cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => handleRemoveFile(file?.file)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center">
                    <p className="text-[#4E4E4E] text-[16px] font-semibold">
                      AI Copy Writer
                    </p>
                    <Switch
                      checked={toggleValue}
                      onCheckedChange={(value: any) => {
                       if(toggleValue)
                       {
                        dispatch(
                          setAdds({
                            ...adds,
                            primaryText: "",
                            headline: ""
                          })
                        )
                        setAddsData((prev: any) => ({
                          ...prev,
                          primaryText: "",
                          headline: ""
                        }));
                       }else{
                        dispatch(
                          setAdds({
                            ...adds,
                            primaryText: generatePrimaryText?.[0],
                            headline: generateHeadlineText?.[0]
                          })
                        )
                        setAddsData((prev: any) => ({
                          ...prev,
                          primaryText: generatePrimaryText?.[0],
                          headline: generateHeadlineText?.[0]
                        }));
                       }
                      
                        setToggleValue(value);
                      }}
                      id="airplane-mode"
                      className="ml-4"
                    />
                    <p
                      id="primaryContent"
                      className="text-[#4E4E4E] text-[16px] ml-4 font-semibold"
                    >
                      Custom Content
                    </p>
                  </div>


                  {
                    toggleValue && (
                      <div className="flex items-center gap-[50px] mt-[20px]">
                        <p
                          className={`text-[#4E4E4E] text-[16px] ml-4 font-semibold cursor-pointer ${activeTab === "PrimaryText" && "border-b-2 border-secondary"
                            }`}
                          onClick={() => setActiveTab("PrimaryText")}
                        >
                          Primary Text
                        </p>

                        <p
                          className={`text-[#4E4E4E] text-[16px] ml-4 font-semibold cursor-pointer ${activeTab === "Headlines" && "border-b-2 border-secondary"
                            }`}
                          onClick={() => setActiveTab("Headlines")}
                        >
                          Headlines
                        </p>

                      </div>
                    )
                  }


                  {toggleValue ? (
                    activeTab === "PrimaryText" ? (
                      generatePrimaryText?.map((item: any, key: any) => (
                        <div
                          key={key}
                          onClick={() =>
                            dispatch(
                              setAdds({
                                ...adds,
                                primaryText: item,
                              })
                            )
                          }
                          className={`flex justify-between items-center cursor-pointer mt-3 bg-primary/40 p-3 rounded-[28px]  ${item == addsData?.primaryText &&
                            "border border-secondary"
                            }`}
                        >
                          {editIndex === key ? (
                            <Grid size={{ xs: 12 }}>
                              <CustomTextArea
                                name="description"
                                css={
                                  "bg-[#ffff] text-[#6B7280] rounded-[16px] p-2 mr-4"
                                }
                                rows={6}
                                label=""
                                value={item}
                                handleAdvanceChange={(e: any) => {
                                  handleChange(e);
                                  let updatedGeneratePrimaryText =
                                    generatePrimaryText?.map(
                                      (item: any, i: any) =>
                                        i == editIndex ? e.target.value : item
                                    );
                                  dispatch(
                                    setGeneratedSuggestionsData({
                                      ...generatedData,
                                      descriptions: updatedGeneratePrimaryText,
                                    })
                                  );
                                }}
                              />
                            </Grid>
                          ) : (
                            // Display item text
                            <p
                             dangerouslySetInnerHTML={{ __html: formatTextWithSpaces(item) }}
                              className="text-[#222222] text-[14px] mr-3"
                            >
                            </p>
                          )}
                          <div>
                            <CustomPopOver
                              open={openPopoverIndex === key}
                              onOpenChange={(isOpen) =>
                                isOpen
                                  ? setOpenPopoverIndex(key)
                                  : setOpenPopoverIndex(null)
                              }
                              triggerElement={
                                <Box
                                  onClick={() =>
                                    setOpenPopoverIndex(
                                      openPopoverIndex === key ? null : key
                                    )
                                  }
                                  sx={{
                                    background: "#ffff",
                                    color: "#242730",
                                    padding: 1,
                                    width: 30,
                                    height: 30,
                                    borderRadius: "40%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    mr: 1,
                                  }}
                                >
                                  <p className="text-14px text-primary font-semibold">
                                    AI
                                  </p>
                                </Box>
                              }
                              popoverContent={
                                <>
                                  <div className="flex justify-between items-center">
                                    <p className="text-md font-semibold">
                                      Generate with AI
                                    </p>
                                    <Badge className="cursor-pointer bg-secondary p-2 text-primary-color">
                                      Generate
                                    </Badge>
                                  </div>
                                  <div className="mt-2">
                                    <div
                                      onClick={() => {
                                        generateTone({
                                          text: item,
                                          length: "short",
                                          tone: "formal",
                                          index: key,
                                          language: addsData?.language,
                                        });

                                        setOpenPopoverIndex(null);
                                      }}
                                      className="bg-primary/70 mt-2 p-2 rounded-[8px]"
                                    >
                                      <p className="text-[12px] text-black">
                                        Shorter
                                      </p>
                                    </div>
                                    <div
                                      onClick={() => {
                                        generateTone({
                                          text: item,
                                          length: "long",
                                          tone: "formal",
                                          index: key,
                                          language: addsData?.language,
                                        });
                                        setOpenPopoverIndex(null);
                                      }}
                                      className="bg-primary/70 mt-1 p-2 rounded-[8px]"
                                    >
                                      <p className="text-[12px] text-black">
                                        Longer
                                      </p>
                                    </div>
                                    <div className="bg-primary/70 mt-1 p-2 rounded-[8px]">
                                      <p className="text-[12px] text-black">
                                        Change Tone To
                                      </p>
                                      <div className="bg-white mt-1 p-2 rounded-[8px] shadow-lg flex flex-wrap gap-2">
                                        {toneOptions.map((option, index) => (
                                          <div
                                            key={index}
                                            onClick={() => {
                                              generateTone({
                                                text: item,
                                                length: "short",
                                                tone: option.toLowerCase(),
                                                index: key,
                                                language: addsData?.language,
                                              });
                                              setOpenPopoverIndex(null);
                                            }}
                                            className={`cursor-pointer p-2 rounded-[4px] bg-[#9daff9] text-primary-color`}
                                          >
                                            <p className="text-[12px]">
                                              {option}
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </>
                              }
                            />
                            <Box
                              className="bg-primary text-primary-color mt-1"
                              onClick={() => filterStatus(key)}
                              sx={{
                                padding: 1,
                                width: 30,
                                height: 30,
                                borderRadius: "40%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                mr: 1,
                              }}
                            >
                              <CloseIcon />
                            </Box>
                            <Box
                              className="bg-primary text-primary-color mt-1"
                              onClick={() => {
                                if (editIndex === key) {
                                  setEditIndex(null);
                                } else {
                                  setEditIndex(key);
                                }
                              }}
                              sx={{
                                padding: 1,
                                width: 30,
                                height: 30,
                                borderRadius: "40%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                mr: 1,
                              }}
                            >
                              {editIndex === key ? <SaveIcon /> : <EditIcon />}
                            </Box>
                          </div>
                        </div>
                      )
                      )


                    ) : (

                      generateHeadlineText?.map((item: any, key: any) => (
                        <div
                          key={key}
                          onClick={() =>
                            dispatch(
                              setAdds({
                                ...adds,
                                headline: item,
                              })
                            )
                          }
                          className={`flex justify-between items-center cursor-pointer mt-3 bg-primary/40 p-3 rounded-[28px]  ${item == addsData?.headline &&
                            "border border-secondary"
                            }`}
                        >
                          {editIndex === key ? (
                            <Grid size={{ xs: 12 }}>
                              <CustomTextArea
                                name="primaryText"
                                css={
                                  "bg-[#ffff] text-[#6B7280] rounded-[16px] p-2 mr-4"
                                }
                                rows={6}
                                label=""
                                value={item}
                                handleAdvanceChange={(e: any) => {
                                  handleChange(e);
                                  let updatedGenerateHeadlineText =
                                    generateHeadlineText?.map(
                                      (item: any, i: any) =>
                                        i == editIndex ? e.target.value : item
                                    );
                                  dispatch(
                                    setGeneratedSuggestionsData({
                                      ...generatedData,
                                      headlines: updatedGenerateHeadlineText,
                                    })
                                  );
                                }}
                              />
                            </Grid>
                          ) : (
                            // Display item text
                            <p
                              onClick={() =>
                                dispatch(
                                  setAdds({
                                    ...adds,
                                    headline: item,
                                  })
                                )
                              }
                              dangerouslySetInnerHTML={{ __html: formatTextWithSpaces(item)}}
                              className="text-[#222222] text-[14px] mr-3"
                            >
                            </p>
                          )}

                          <div>
                          <CustomPopOver
                            open={openPopoverIndex === key}
                            onOpenChange={(isOpen) =>
                              isOpen
                                ? setOpenPopoverIndex(key)
                                : setOpenPopoverIndex(null)
                            }
                            triggerElement={
                              <Box
                                onClick={() =>
                                  setOpenPopoverIndex(
                                    openPopoverIndex === key ? null : key
                                  )
                                }
                                sx={{
                                  background: "#ffff",
                                  color: "#242730",
                                  padding: 1,
                                  width: 30,
                                  height: 30,
                                  borderRadius: "40%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  cursor: "pointer",
                                  mr: 1,
                                }}
                              >
                                <p className="text-14px text-primary font-semibold">
                                  AI
                                </p>
                              </Box>
                            }
                            popoverContent={
                              <>
                                <div className="flex justify-between items-center">
                                  <p className="text-md font-semibold">
                                    Generate with AI
                                  </p>
                                  <Badge className="cursor-pointer bg-secondary p-2 text-primary-color">
                                    Generate
                                  </Badge>
                                </div>
                                <div className="mt-2">
                                  <div
                                    onClick={() => {
                                      generateToneHeadlines({
                                        text: item,
                                        length: "short",
                                        tone: "formal",
                                        index: key,
                                        language: addsData?.language,
                                      });
  
                                      setOpenPopoverIndex(null);
                                    }}
                                    className="bg-primary/70 mt-2 p-2 rounded-[8px]"
                                  >
                                    <p className="text-[12px] text-black">
                                      Shorter
                                    </p>
                                  </div>
                                  <div
                                    onClick={() => {
                                      generateToneHeadlines({
                                        text: item,
                                        length: "long",
                                        tone: "formal",
                                        index: key,
                                        language: addsData?.language,
                                      });
                                      setOpenPopoverIndex(null);
                                    }}
                                    className="bg-primary/70 mt-1 p-2 rounded-[8px]"
                                  >
                                    <p className="text-[12px] text-black">
                                      Longer
                                    </p>
                                  </div>
                                  <div className="bg-primary/70 mt-1 p-2 rounded-[8px]">
                                    <p className="text-[12px] text-black">
                                      Change Tone To
                                    </p>
                                    <div className="bg-white mt-1 p-2 rounded-[8px] shadow-lg flex flex-wrap gap-2">
                                      {toneOptions.map((option, index) => (
                                        <div
                                          key={index}
                                          onClick={() => {
                                            generateToneHeadlines({
                                              text: item,
                                              length: "short",
                                              tone: option.toLowerCase(),
                                              index: key,
                                              language: addsData?.language,
                                            });
                                            setOpenPopoverIndex(null);
                                          }}
                                          className={`cursor-pointer p-2 rounded-[4px] bg-[#9daff9] text-primary-color`}
                                        >
                                          <p className="text-[12px]">
                                            {option}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </>
                            }
                          />
                          <Box
                            className="bg-primary text-primary-color mt-1"
                            onClick={() => filterStatusHeadlines(key)}
                            sx={{
                              padding: 1,
                              width: 30,
                              height: 30,
                              borderRadius: "40%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              mr: 1,
                            }}
                          >
                            <CloseIcon />
                          </Box>
                          <Box
                            className="bg-primary text-primary-color mt-1"
                            onClick={() => {
                              if (editIndex === key) {
                                setEditIndex(null);
                              } else {
                                setEditIndex(key);
                              }
                            }}
                            sx={{
                              padding: 1,
                              width: 30,
                              height: 30,
                              borderRadius: "40%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              mr: 1,
                            }}
                          >
                            {editIndex === key ? <SaveIcon /> : <EditIcon />}
                          </Box>
                        </div>
                        </div>
                      )
                      )


                    )


                  ) : (
                    <>
                      <div className="mt-3">
                        <p className="text-[#4E4E4E] text-[14px] font-semibold">
                          Primary Texts
                        </p>
                      </div>
                      <CustomInputField
                        // label="Primary Text"
                        name={"primaryText"}
                        handleAdvanceChange={handleChange}
                        value={adds?.primaryText}
                        type="text"
                        css={
                          "bg-[#ffff] border-none mt-2 p-5 shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[18px]"
                        }
                      />
                        <div className="mt-3">
                        <p className="text-[#4E4E4E] text-[14px] font-semibold">
                          Headline
                        </p>
                      </div>
                      <CustomInputField
                        // label="Primary Text"
                        name={"headline"}
                        handleAdvanceChange={handleChange}
                        value={adds?.headline}
                        type="text"
                        css={
                          "bg-[#ffff] border-none mt-2 p-5 shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[18px]"
                        }
                      />
                    </>
                  )}
                  {/* <Separator orientation="horizontal" className="my-4" /> */}
                  {/* <div className="mt-1 mb-1 cursor-pointer flex justify-end ">
                <RefreshIcon className="text-primary" />
                <p className="text-primary ml-1 font-semibold">Rewrite</p>
              </div> */}
                  <Separator orientation="horizontal" className="my-4" />

                  <div className="mt-5">
                    <CustomSelectField
                      label="Call To Action"
                      onValueChange={(value: any) =>
                        dispatch(setAdds({ ...adds, ctaButtonText: value }))
                      }
                      value={addsData?.ctaButtonText}
                      css="bg-[#fff] border-none mt-2 p-5 shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[18px]"
                      options={
                        facebookStaticOptions
                          ? facebookStaticOptions?.call_to_action.map((x) => ({
                            value: x,
                            label: x.replace("_", " "),
                          }))
                          : [
                            { value: "Contact Us", label: "Contact Us" },
                            { value: "Order Now", label: "Order Now" },
                            { value: "Request Time", label: "Request Time" },
                            {
                              value: "Get Showtimes",
                              label: "Get Showtimes",
                            },
                            { value: "Listen Now", label: "Listen Now" },
                            { value: "See Menu", label: "See Menu" },
                            { value: "Book Now", label: "Book Now" },
                            { value: "Learn More", label: "Learn More" },
                            { value: "Shop Now", label: "Shop Now" },
                            { value: "Sign Up", label: "Sign Up" },
                            { value: "Download", label: "Download" },
                            { value: "Watch More", label: "Watch More" },
                            { value: "Apply Now", label: "Apply Now" },
                            { value: "Subscribe", label: "Subscribe" },
                          ]
                      }
                    />
                  </div>
                  {/* Section 3. Budget */}
                  <div className=" mt-4">
                    <p className="text-black text-[16px] font-semibold">
                      3. Budget
                    </p>
                  </div>
                  <div className="mt-5">
                    <CustomPriceInputField
                      label="Ad at least 1kr"
                      duration="day"
                      value={adds?.budget}
                      handleAdvanceChange={handleBudgetChange}
                      css={
                        "bg-[#ffff] border-none mt-2 p-5 shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[18px]"
                      }
                      type={"text"}
                      placeholder={"10kr"}
                    />
                  </div>

                  <RenderPlatformFields
                    platform={
                      typeof (platformName?.platform_name ?? "") == "string"
                        ? (platformName?.platform_name ?? "").toLowerCase()
                        : ""
                    }
                  // forecast={handleForecast}
                  />
                  {/* <div className="mt-5">
                <Badge
                  onClick={() => setOptionalModalOpen(true)}
                  className="p-2 text-primary-color cursor-pointer "
                >
                  Optional{" "}
                  <span>
                    {" "}
                    <ChevronRight size={15} />{" "}
                  </span>
                </Badge>
              </div> */}

                  {/* Buttons */}
                  <div className="flex justify-end items-center mt-4">
                    {/* <p
                  onClick={handleDraft}
                  className="text-primary font-semibold cursor-pointer text-[12px]"
                >
                  Schedule
                </p> */}
                    <p
                      onClick={() => handleFormSave()}
                      className="text-primary ml-2 font-semibold  cursor-pointer text-[12px]"
                    >
                      Save Draft
                    </p>

                    {/* <Button
                  onClick={handleDraft}
                  className="bg-transparent hover:text-primary-color border border-primary text-primary px-8 py-4 rounded-[18px] ml-2"
                >
                  Schedule
                </Button> */}
                    <Button
                      disabled={isSaving}
                      // onClick={() => router.push("/adResults")}
                      onClick={() => handleFormSave("published")}
                      className="bg-primary text-primary-color px-8 py-4 rounded-[18px] ml-2"
                    >
                      {isSaving ? "Loading..." : "Create"}
                    </Button>
                  </div>
                </div>
              </Card>
            </Grid>
          </>
        )}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card className="rounded-lg p-3 bg-primary-color/70">
            <div>
              <p className="text-lg text-black">Preview</p>
            </div>
            <div className="mt-2 text-center">
              <Badge
                className={`rounded-[12px] hover:bg-transparent cursor-pointer border border-black/60 text-black/60 bg-transparent `}
              >
                {platformName.platform_name || "N/A"}
              </Badge>
            </div>
            <div className="mt-2 text-center">
              {creativeTypeValue == creativeTypes[2].id ? (
                <NewPreviewCard
                  carouselAttachmentsData={carouselAttachments}
                  status={addsData?.primaryText ?? ""}
                />
              ) : (
                <PreviewAdCard
                  posts={addsData}
                  callAction={addsData?.ctaButtonText ?? "Shop Now"}
                  status={addsData?.primaryText ?? ""}
                  headline={addsData?.headline ?? ""}
                  websiteUrl={addsData?.websiteUrl ?? ""}
                />
              )}

              {/*  */}
              {addsData?.files && addsData?.files?.length > 0 && (
                <div className="mt-2 text-center">
                  <Badge
                    onClick={() => setAdCombinationModalOpen(true)}
                    className={`rounded-[12px] cursor-pointer hover:bg-transparent p-2 border border-black/60 text-black/60 bg-transparent `}
                  >
                    Ad Combinations
                  </Badge>
                </div>
              )}
            </div>
          </Card>

          <Card className="rounded-lg p-3 bg-primary-color/70 mt-3">
            <div>
              {/* heading */}
              <div>
                <p className="text-black font-semibold text-[14px] ">
                  Audience size
                </p>
              </div>

              {/* Progress bar */}
              <div className="mt-2">
                <Progress value={progress} />
              </div>
              {/* Button */}
              <div className="mt-2 flex items-center">
                <Button className="mr-2 bg-primary text-primary-color">
                  Narrow Audience
                </Button>
                <p>0-0</p>
              </div>
            </div>
          </Card>

          <Card className="rounded-lg p-3 bg-primary-color/70 mt-3">
            <div>
              {/* heading */}
              <div>
                <p className="text-black font-semibold text-[14px] ">
                  Forecasted results
                </p>
              </div>

              {/* Progress bar */}
              <div className="mt-2">
                <p className="text-black/70 text-[12px] ">
                  Based up on your average daily budget and your bid cap
                </p>
              </div>
              {/* Button */}
              <div className="mt-2 flex ">
                {timePeriod?.map((item) => (
                  <Badge
                    onClick={() => handleTimeChip(item)}
                    key={item.id}
                    className={`rounded-[12px] mr-2 p-2 cursor-pointer ${item.id === currentTimeChip
                      ? "bg-primary text-primary-color"
                      : "bg-[#D2D7FF] text-[#3F3F3F]"
                      }`}
                  >
                    {item.name}
                  </Badge>
                ))}
              </div>
              {/* S C R */}
              <div className="mt-3 flex justify-around">
                <div className="bg-primary rounded-[10px] p-6 text-center">
                  <p className="text-primary-color text-sm font-semibold">
                    Spend
                  </p>
                  <p className="text-primary-color text-xs ">{spend}</p>
                </div>
                <div className="bg-primary rounded-[10px] p-6 text-center">
                  <p className="text-primary-color text-sm font-semibold">
                    Click
                  </p>
                  <p className="text-primary-color text-xs ">{actions}</p>
                </div>
                <div className="bg-primary rounded-[10px] p-6 text-center">
                  <p className="text-primary-color text-sm font-semibold">
                    Reach
                  </p>
                  <p className="text-primary-color text-xs ">{reach}</p>
                </div>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid >
    </>
  );
};

export default CreateAdForm;
