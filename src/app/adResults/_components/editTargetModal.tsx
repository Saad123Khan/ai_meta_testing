import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronDown,
  ChevronRight,
  DeleteIcon,
  Download,
  FileIcon,
  FormInput,
  Globe,
  Lightbulb,
  Link,
  MagnetIcon,
  Plus,
  PlusIcon,
  User,
  Users,
  Video,
  WandSparkles,
  X,
} from "lucide-react";
import Grid from "@mui/material/Grid2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import CustomSelectField from "@/components/customSelectField";
import { Box, BoxProps, Chip, Divider, styled } from "@mui/material";
import CustomPopOver from "@/components/customPopOver";
import { Switch } from "@/components/ui/switch";
import CustomDrawer from "@/components/customDrawer";
import CustomInputField from "@/components/customInputField";
import CustomNewUploader from "@/components/customNewUploader";
import CustomTextArea from "@/components/customTextArea";
import { useAppSelector } from "@/hooks/useRedux";
import { useDispatch } from "react-redux";
import { addTargetingChipsAi } from "@/store/slices/storeSlice";
import apis from "@/services";
import { useMutation } from "@tanstack/react-query";
import { swalPopUp } from "@/lib/helper";
import { FacebookAdInterest } from "@/types/facebookAdOptions";
import { setAdds } from "@/store/slices/addSlice";
import GenerateInputField from "@/app/createAdForm/_components/generateInputField";
import { generateTargetingPayload } from "@/lib/targetingPayloadHelper";
import { facebookOptimizationGoalOptions } from "@/lib/constant";

interface CreateFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTarget: any;
  setSelectedTarget: any;
  objectives: any;
  adDetails: any;
  ad_id: any;
}

const EditTargetModal = ({
  open,
  onOpenChange,
  ad_id,
  adDetails,
}: CreateFolderDialogProps) => {
  const [selectedInterests, setSelectedInterests] = useState<
    FacebookAdInterest[]
  >([]);
  const [interest, setInterest] = useState<string | null>("");
  const { adds } = useAppSelector((state) => state.adds);
  const [facebookAdInterest, setFacebookAdInterest] = useState<
    FacebookAdInterest[]
  >([]);
  const [gender, setGender] = useState<string>("All"); // Default gender
  const [ageRange, setAgeRange] = useState<{ min: number; max: number }>({
    min: 18,
    max: 65,
  });

  const selectedBrand = useAppSelector((state) => state.selectedBrand.brand);

  console.log("selectedBrand", selectedBrand);

  const dispatch = useDispatch();

  const handleInterestRemove = (item: string) => {
    dispatch(
      setAdds({
        ...adds,
        interests: [...(adds?.interests?.filter((x) => x != item) ?? [])],
        facebookAdInterest: [
          ...(adds?.facebookAdInterest?.filter((x) => x.name != item) ?? []),
        ],
      })
    );
  };

  const { mutate: fetchInterests, isPending: isPendingTone }: any = useMutation(
    {
      mutationFn: async (data: { brand_id: any; q: string }) =>
        apis.facebookInterestOptions(data),
      onSuccess: ({ data }: any) => {
        if (data && data.success) {
          setFacebookAdInterest(data?.data.data);
          console.log("🚀 ~ data?.data:", data?.data.data);
        } else {
          console.log("Error in Getting Facebook Interest", data);
        }
      },
      onError: (error: any) => {
        swalPopUp(error.message, "", error.message);
        console.log("Error in Getting Interest", error);
      },
    }
  );
  // edit
  const { mutate: editAd, isPending: isPendingEdit }: any = useMutation({
    mutationFn: async (data: any) => apis.editAd(ad_id, data),
    onSuccess: ({ data }: any) => {
      console.log("data?.data", data);
      swalPopUp("Ad Updated", "Ad details edited", "success");
      onOpenChange(false);
    },
    onError: (error: any) => {
      swalPopUp(error.message, "", error.message);
      console.log("Error in Getting Interest", error);
    },
  });

  const getAdInterest = () => {
    console.log("🚀 ~ getAdInterest ~ adds:", adds);
    fetchInterests({ brand_id: adds?.brand?.id ?? 0, q: interest });
  };

  const [fieldData, setFieldData] = useState({
    dailyBudget: adDetails?.adset?.daily_budget?.toString() || "",
    billingEvent: adDetails?.adset?.billing_event || "",
    adName: adDetails?.name || "",
    bidAmount: adDetails?.adset?.bid_amount?.toString() || "",
    optimizationGoal: adDetails?.adset?.optimization_goal || "",
    location: adDetails?.adset?.targeting?.geo_locations.countries[0] || [],
  });

  // Generic handler for updating fields
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFieldData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log("targetingSpec", adDetails);
  const handleSave = () => {
    const platform = "facebook";

    const adData = {
      gender: gender as "All" | "Male" | "Female",
      facebookAdInterest: selectedInterests,
      region: [fieldData.location],
      ageGroup: [`${ageRange.min}`, `${ageRange.max}`],
    };

    const targetingSpec = generateTargetingPayload(adData, platform);

    const payload = {
      brand_id: selectedBrand?.id || 1,
      daily_budget: fieldData.dailyBudget || 500000,
      targeting: targetingSpec,
      name: fieldData.adName,
      billing_event: fieldData.billingEvent,
      bid_amount: fieldData.bidAmount,
      optimization_goal: fieldData.optimizationGoal || "IMPRESSIONS",
      effective_status: "PAUSED",
      configured_status: "PAUSED",
    };
    editAd(payload);
  };

  const handleAddInterest = (item: FacebookAdInterest) => {
    setSelectedInterests((prev) => {
      const isDuplicate = prev.some((interest) => interest.id === item.id);
      return isDuplicate ? prev : [...prev, item];
    });
  };

  // Remove interest
  const handleRemoveInterest = (itemId: string) => {
    setSelectedInterests((prev) =>
      prev.filter((interest) => interest.id !== itemId)
    );
  };

  useEffect(() => {
    if (adDetails) {
      setAgeRange({
        min: adDetails?.adset.targeting.age_min || 18,
        max: adDetails?.adset.targeting.age_max || 65,
      });
      setFieldData({
        dailyBudget: adDetails?.adset?.daily_budget?.toString() || "",
        billingEvent: adDetails?.adset?.billing_event || "",
        bidAmount: adDetails?.adset?.bid_amount?.toString() || "",
        optimizationGoal: adDetails?.adset?.optimization_goal || "",
        adName: adDetails?.name || "",
        location:
          adDetails?.adset?.targeting?.geo_locations?.countries[0] || "",
      });
      setSelectedInterests(adDetails?.adset?.targeting?.interests);
    }
  }, [adDetails]);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="lg:max-w-[700px]  p-3 overflow-hidden">
          <ScrollArea className=" h-[80vh] p-4">
            <DialogHeader>
              <div>
                <p className="text-[20px] font-semibold ">Edit Ad</p>
              </div>
            </DialogHeader>
            <div>
              <Grid container spacing={2} sx={{ padding: 1 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomInputField
                    label="Campaign Name"
                    value={fieldData.adName}
                    name="adName"
                    handleAdvanceChange={handleChange}
                    css={
                      "bg-[#ffff] p-5 border-none shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[22px]"
                    }
                    type={"text"}
                    placeholder={"Enter Daily Budget"}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomInputField
                    label="Daily Budget"
                    value={fieldData.dailyBudget}
                    name="dailyBudget"
                    handleAdvanceChange={handleChange}
                    css={
                      "bg-[#ffff] p-5 border-none shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[22px]"
                    }
                    type={"text"}
                    placeholder={"Enter Daily Budget"}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomSelectField
                    label="Billing Event"
                    placeholder="Choose a billing event"
                    value={fieldData.billingEvent}
                    onValueChange={(value: any) => {
                      setFieldData((prev) => ({
                        ...prev,
                        billingEvent: value,
                      }));
                    }}
                    // onValueChange={handleChange}
                    css={
                      "bg-[#ffff] text-[#6B7280] p-5 border-none shadow-md focus:ring-2 focus:ring-indigo-200 w-full rounded-[22px] p-4"
                    }
                    options={[
                      { value: "IMPRESSIONS", label: "Impressions" },
                      { value: "CLICKS", label: "Clicks" },
                      { value: "LINK_CLICKS", label: "Link Clicks" },
                      { value: "PAGE_LIKES", label: "Page Likes" },
                      { value: "POST_ENGAGEMENT", label: "Post Engagement" },
                    ]}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomInputField
                    label="Bid Amount"
                    value={fieldData.bidAmount}
                    name="bidAmount"
                    handleAdvanceChange={handleChange}
                    css={
                      "bg-[#ffff] p-5 border-none shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[22px]"
                    }
                    type={"text"}
                    placeholder={"Enter Bid Amount"}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomSelectField
                    label="Optimization Goal"
                    placeholder="Choose an optimization goal"
                    value={fieldData.optimizationGoal}
                    onValueChange={(value: any) => {
                      setFieldData((prev) => ({
                        ...prev,
                        optimizationGoal: value,
                      }));
                    }}
                    // onValueChange={handleChange}
                    css={
                      "bg-[#ffff] text-[#6B7280] p-5 border-none shadow-md focus:ring-2 focus:ring-indigo-200 w-full rounded-[22px] p-4"
                    }
                    options={facebookOptimizationGoalOptions}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomSelectField
                    label="Minimum Age"
                    value={ageRange.min.toString()}
                    onValueChange={(value: any) => {
                      setAgeRange((prev) => ({
                        ...prev,
                        min: parseInt(value),
                      }));
                    }}
                    css={
                      "bg-[#ffff] text-[#6B7280] p-5 border-none shadow-md focus:ring-2 focus:ring-indigo-200 w-full rounded-[22px] p-4"
                    }
                    options={[
                      { value: "18", label: "18" },
                      { value: "20", label: "20" },
                      { value: "30", label: "30" },
                      { value: "40", label: "40" },
                      { value: "50", label: "50" },
                    ]}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomSelectField
                    label="Maximum Age"
                    value={ageRange.max.toString()}
                    onValueChange={(value: any) => {
                      setAgeRange((prev) => ({
                        ...prev,
                        max: parseInt(value),
                      }));
                    }}
                    css={
                      "bg-[#ffff] text-[#6B7280] p-5 border-none shadow-md focus:ring-2 focus:ring-indigo-200 w-full rounded-[22px] p-4"
                    }
                    options={[
                      { value: "18", label: "18" },
                      { value: "20", label: "20" },
                      { value: "30", label: "30" },
                      { value: "40", label: "40" },
                      { value: "50", label: "50" },
                      { value: "60", label: "60" },
                      { value: "65", label: "65" },
                      { value: "70", label: "70" },
                    ]}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomSelectField
                    label="Locations"
                    onValueChange={(value: any) => {
                      setFieldData((prevData) => ({
                        ...prevData,
                        location: value,
                      }));
                    }}
                    value={fieldData.location}
                    css="bg-[#fff] border-none mt-2 p-5 shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[18px]"
                    options={[
                      { value: "US", label: "United States" },
                      { value: "CA", label: "Canada" },
                      { value: "UK", label: "United Kingdom" },
                      { value: "AU", label: "Australia" },
                      { value: "IN", label: "India" },
                      { value: "PK", label: "Pakistan" },
                    ]}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <GenerateInputField
                    icon={<ChevronRight className="h-4 w-4" />}
                    placeholder={
                      " Please add interests, behaviors or demographics e.g: Technology"
                    }
                    name="interest"
                    css={
                      "bg-primary-color border-none mt-2 p-5 shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[18px]"
                    }
                    value={interest}
                    handleAdvanceChange={(w: any) =>
                      setInterest(w.target.value)
                    }
                    onIconClick={() => getAdInterest()}
                  />
                </Grid>
              </Grid>

              <div className="mt-3">
                {facebookAdInterest.length > 0 &&
                  facebookAdInterest.map(
                    (item: FacebookAdInterest, key: any) => {
                      console.log("facebookItem", item);
                      const isAdded = selectedInterests.some(
                        (interest) => interest.id === item.id
                      );
                      return (
                        <Badge
                          key={key}
                          onClick={() => !isAdded && handleAddInterest(item)}
                          className={`m-1 rounded-[18px] cursor-pointer pt-2 pb-2 pr-4 pl-4 text-[14px] font-normal bg-primary text-primary-color `}
                        >
                          <div className=" flex justify-between items-center">
                            <span>{item.name}</span>
                            {isAdded && (
                              <span
                                onClick={() => handleInterestRemove(item.name)}
                                className="ml-2 cursor-pointer text-primary-color hover:text-red-500"
                              >
                                <X size={14} />
                              </span>
                            )}
                            {!isAdded && (
                              <span
                                onClick={() => handleInterestRemove(item.name)}
                                className="ml-2 cursor-pointer text-primary-color hover:text-red-500"
                              >
                                <PlusIcon size={14} />
                              </span>
                            )}
                          </div>
                        </Badge>
                      );
                    }
                  )}
              </div>
              <div className="mt-3">
                {selectedInterests?.length > 0 &&
                  selectedInterests.map((item) => (
                    <Badge
                      key={item.id}
                      className="m-1 rounded-[18px] border border-secondary pt-2 pb-2 pr-4 pl-4 text-[14px] font-normal bg-primary text-primary-color cursor-pointer"
                    >
                      <div className="flex justify-between items-center">
                        <span>{item.name}</span>
                        <X
                          size={14}
                          onClick={() => handleRemoveInterest(item.id)}
                          className="ml-2 cursor-pointer text-primary-color hover:text-red-500"
                        />
                      </div>
                    </Badge>
                  ))}
              </div>
              <div className="mt-4">
                <div>
                  <p className="text-[22px] ">Age & Gender</p>
                  <Separator orientation="horizontal" className="my-4" />
                </div>
                <div>
                  <RadioGroup
                    className="flex items-center space-x-4"
                    value={gender}
                    onValueChange={(value) => {
                      setGender(value);
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="All" id="all" />
                      <Label htmlFor="all">All</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <DialogFooter className="mt-3">
              {" "}
              <Button
                onClick={handleSave}
                disabled={isPendingEdit ? true : false}
                className="text-primary-color rounded-[16px] pl-5 pr-5 bg-[#002EF6] "
                type="submit"
              >
                {isPendingEdit ? "Loading..." : "Save"}
              </Button>
            </DialogFooter>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditTargetModal;
