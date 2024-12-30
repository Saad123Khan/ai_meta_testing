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
  DeleteIcon,
  Download,
  FileIcon,
  FormInput,
  Globe,
  Lightbulb,
  Link,
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

interface CreateFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTarget: any;
  setSelectedTarget: any;
  objectives: any;
}

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

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingBottom: 2,
  justifyContent: "space-between",
  backgroundColor: "#f7f7f9",
}));

const TargetModal = ({
  open,
  onOpenChange,
  selectedTarget,
  setSelectedTarget,
  objectives,
}: CreateFolderDialogProps) => {
  const [toggleValue, setToggleValue] = useState(false);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [webDrawer, setWebDrawer] = useState(false);
  const [leadDrawer, setLeadDrawer] = useState(false);
  const [customDrawer, setCustomDrawer] = useState(false);
  const [openPopoverIndex, setOpenPopoverIndex] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>([]);
  const TargetingChipsAi = useAppSelector(
    (state: any) => state.reduxStore.targetingChipsAi
  );
  const platformName = useAppSelector((state) => state.reduxStore.platformName);
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

  console.log("addTargetingChipsAi", TargetingChipsAi);
  const dispatch = useDispatch();

  const handleAddChip = (
    item: string,
    facebookAdInterest?: FacebookAdInterest
  ) => {
    console.log("reducer Dispatching item:", item);

    //  if (!TargetingChipsAi.includes(item)) {
    dispatch(
      addTargetingChipsAi(
        TargetingChipsAi?.length > 0 ? [...TargetingChipsAi, item] : [item]
      )
    );
    // }

    dispatch(
      setAdds({
        ...adds,
        interests: [...(adds?.interests ?? []), item],
        facebookAdInterest: facebookAdInterest
          ? [...(adds?.facebookAdInterest ?? []), facebookAdInterest]
          : adds?.facebookAdInterest ?? [],
      })
    );
  };

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

  const aiTargetingChips = useAppSelector(
    (state) => state.reduxStore.generated_suggestions?.keywords
  );
  const handleRemoveFile = (fileToRemove: any) => {
    setSelectedFile((prevFiles: any) =>
      prevFiles?.filter((file: any) => file !== fileToRemove)
    );
  };

  const chips = aiTargetingChips?.map((i: any) => i.split("\n"));
  console.log("aiTargetingChips", aiTargetingChips);

  const createAudience = (setDrawer: any) => {
    setDrawer(false);
    onOpenChange(true);
  };

  const handleDrawer = (setDrawer: any) => {
    setDrawer(true);
    onOpenChange(false);
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

  const getAdInterest = () => {
    console.log("🚀 ~ getAdInterest ~ adds:", adds);
    fetchInterests({ brand_id: adds?.brand?.id ?? 0, q: interest });
  };

  const updateAdData = () => {
    dispatch(
      setAdds({
        ...adds,
        ageGroup: [`${ageRange.min}`, `${ageRange.max}`],
        gender: gender as "All" | "Male" | "Female",
        targetAudience: [gender],
      })
    );
  };

  return (
    <>
      <CustomDrawer
        open={openDrawer}
        setOpenDrawer={setOpenDrawer}
        drawerPageContent={
          <div>
            <Header>
              <p>{"Create audience from uploading .csv"}</p>
              <X
                size={16}
                className="cursor-pointer "
                onClick={() => setOpenDrawer(false)}
              />
            </Header>

            <Divider sx={{ mt: 1, mb: 2 }} />
            <ScrollArea className="h-[100vh] pr-4">
              <Grid container spacing={2} sx={{ pb: 5, p: 1 }}>
                <Grid
                  size={{ xs: 12 }}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {/* example_audience_file */}
                  <Badge
                    onClick={() =>
                      window.open(
                        "https://www.facebook.com/business/help/",
                        "_blank"
                      )
                    }
                    className=" py-2 text-primary border border-primary hover:text-primary-color cursor-pointer bg-transparent "
                  >
                    <Link size={15} className="mr-2" />
                    Formatting Guidelines
                  </Badge>
                  <Badge
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = "/files/example_audience_file.csv";
                      link.download = "SampleFile.csv";
                      link.click();
                    }}
                    className="ml-2 py-2 text-primary-color cursor-pointer "
                  >
                    <Download size={15} className="mr-2" />
                    Download Sample
                  </Badge>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <CustomInputField
                    // label="Name for your audience"
                    css={
                      "bg-[#ffff] p-5 border-none shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[12px]"
                    }
                    type={"text"}
                    placeholder={"Name for your audience"}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <CustomNewUploader
                    labelText="Drag & drop a document or upload from local storage"
                    css={
                      "border rounded-[10px] border-secondary text-center p-16 border-dashed "
                    }
                    uploadImg={"/assets/upload new icon.svg"}
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                    fileType=".csv"
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  {selectedFile?.map((file: any, index: any) => {
                    return (
                      <div className="grid grid-cols-1">
                        <Chip
                          avatar={<FileIcon />}
                          label={file?.name}
                          variant="outlined"
                          onDelete={() => handleRemoveFile(file)}
                          deleteIcon={<DeleteIcon />}
                        />
                      </div>
                    );
                  })}
                </Grid>

                <Grid
                  size={{ xs: 12 }}
                  sx={{ display: "flex", justifyContent: "end" }}
                >
                  <Button
                    onClick={() => createAudience(setOpenDrawer)}
                    className="px-7 text-primary-color "
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>
            </ScrollArea>
          </div>
        }
      />
      <CustomDrawer
        open={webDrawer}
        setOpenDrawer={setWebDrawer}
        drawerPageContent={
          <div>
            <Header>
              <p>{"Create a website Custom Audience"}</p>
              <X
                size={16}
                className="cursor-pointer "
                onClick={() => setWebDrawer(false)}
              />
            </Header>

            <Divider sx={{ mt: 1, mb: 2 }} />
            <ScrollArea className="h-[100vh] pr-4">
              <Grid container spacing={2} sx={{ pb: 5, p: 1 }}>
                <Grid size={{ xs: 12 }}>
                  <CustomSelectField
                    placeholder={"Select"}
                    label="Source"
                    css={"bg-[#ffff] text-[#6B7280] w-full rounded-[12px] p-5"}
                    options={[
                      { value: "apple", label: "Apple" },
                      { value: "banana", label: "Banana" },
                      { value: "blueberry", label: "Blueberry" },
                      { value: "grapes", label: "Grapes" },
                      { value: "pineapple", label: "Pineapple" },
                    ]}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <CustomSelectField
                    placeholder={"Select"}
                    label="Events"
                    css={"bg-[#ffff] text-[#6B7280] w-full rounded-[12px] p-5"}
                    options={[
                      { value: "apple", label: "Apple" },
                      { value: "banana", label: "Banana" },
                      { value: "blueberry", label: "Blueberry" },
                      { value: "grapes", label: "Grapes" },
                      { value: "pineapple", label: "Pineapple" },
                    ]}
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <CustomInputField
                    label="Audience retention"
                    css={
                      "bg-[#ffff] p-5 border-none shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[12px]"
                    }
                    type={"number"}
                    // placeholder={"Name for your audience"}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <CustomInputField
                    label="Audience Name"
                    css={
                      "bg-[#ffff] p-5 border-none shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[12px]"
                    }
                    type={"text"}
                    // placeholder={"Name for your audience"}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <CustomTextArea
                    css={"bg-[#ffff] text-[#6B7280] rounded-[16px] p-2"}
                    rows={6}
                    label="Description (Optional)"
                    //   value={brandName}
                    //   handleAdvanceChange={(e: any) => setBrandName(e.target.value)}
                  />
                </Grid>

                <Grid
                  size={{ xs: 12 }}
                  sx={{ display: "flex", justifyContent: "end" }}
                >
                  <Button
                    onClick={() => createAudience(setWebDrawer)}
                    className="px-7 text-primary-color "
                  >
                    Create Audience
                  </Button>
                </Grid>
              </Grid>
            </ScrollArea>
          </div>
        }
      />
      <CustomDrawer
        open={leadDrawer}
        setOpenDrawer={setLeadDrawer}
        drawerPageContent={
          <div>
            <Header>
              <p>{"Create a lead form Custom Audience"}</p>
              <X
                size={16}
                className="cursor-pointer "
                onClick={() => setLeadDrawer(false)}
              />
            </Header>

            <Divider sx={{ mt: 1, mb: 2 }} />
            <ScrollArea className="h-[100vh] pr-4">
              <Grid container spacing={2} sx={{ pb: 5, p: 1 }}>
                <Grid size={{ xs: 12 }}>
                  <CustomSelectField
                    placeholder={"Select"}
                    label="Events"
                    css={"bg-[#ffff] text-[#6B7280] w-full rounded-[12px] p-5"}
                    options={[
                      { value: "apple", label: "Apple" },
                      { value: "banana", label: "Banana" },
                      { value: "blueberry", label: "Blueberry" },
                      { value: "grapes", label: "Grapes" },
                      { value: "pineapple", label: "Pineapple" },
                    ]}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <CustomSelectField
                    placeholder={"Select"}
                    label="Page"
                    css={"bg-[#ffff] text-[#6B7280] w-full rounded-[12px] p-5"}
                    options={[
                      { value: "apple", label: "Apple" },
                      { value: "banana", label: "Banana" },
                      { value: "blueberry", label: "Blueberry" },
                      { value: "grapes", label: "Grapes" },
                      { value: "pineapple", label: "Pineapple" },
                    ]}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <CustomSelectField
                    placeholder={"Select"}
                    label="Lead Form"
                    css={"bg-[#ffff] text-[#6B7280] w-full rounded-[12px] p-5"}
                    options={[
                      { value: "apple", label: "Apple" },
                      { value: "banana", label: "Banana" },
                      { value: "blueberry", label: "Blueberry" },
                      { value: "grapes", label: "Grapes" },
                      { value: "pineapple", label: "Pineapple" },
                    ]}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <CustomInputField
                    label="Audience Name"
                    css={
                      "bg-[#ffff] p-5 border-none shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[12px]"
                    }
                    type={"text"}
                    // placeholder={"Name for your audience"}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <CustomTextArea
                    css={"bg-[#ffff] text-[#6B7280] rounded-[16px] p-2"}
                    rows={6}
                    label="Description (Optional)"
                    //   value={brandName}
                    //   handleAdvanceChange={(e: any) => setBrandName(e.target.value)}
                  />
                </Grid>

                <Grid
                  size={{ xs: 12 }}
                  sx={{ display: "flex", justifyContent: "end" }}
                >
                  <Button
                    onClick={() => createAudience(setLeadDrawer)}
                    className="px-7 text-primary-color "
                  >
                    Create Audience
                  </Button>
                </Grid>
              </Grid>
            </ScrollArea>
          </div>
        }
      />
      <CustomDrawer
        open={customDrawer}
        setOpenDrawer={setCustomDrawer}
        drawerPageContent={
          <div>
            <Header>
              <p>{"Create a video Custom Audience"}</p>
              <X
                size={16}
                className="cursor-pointer "
                onClick={() => setCustomDrawer(false)}
              />
            </Header>

            <Divider sx={{ mt: 1, mb: 2 }} />
            <ScrollArea className="h-[100vh] pr-4">
              <Grid container spacing={2} sx={{ pb: 5, p: 1 }}>
                <Grid size={{ xs: 12 }}>
                  <CustomSelectField
                    placeholder={"Select"}
                    label="Engagement"
                    css={"bg-[#ffff] text-[#6B7280] w-full rounded-[12px] p-5"}
                    options={[
                      { value: "apple", label: "Apple" },
                      { value: "banana", label: "Banana" },
                      { value: "blueberry", label: "Blueberry" },
                      { value: "grapes", label: "Grapes" },
                      { value: "pineapple", label: "Pineapple" },
                    ]}
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <CustomInputField
                    label="Audience retention"
                    css={
                      "bg-[#ffff] p-5 border-none shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[12px]"
                    }
                    type={"number"}
                    // placeholder={"Name for your audience"}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <CustomInputField
                    label="Audience Name"
                    css={
                      "bg-[#ffff] p-5 border-none shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[12px]"
                    }
                    type={"text"}
                    // placeholder={"Name for your audience"}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <CustomTextArea
                    css={"bg-[#ffff] text-[#6B7280] rounded-[16px] p-2"}
                    rows={6}
                    label="Description (Optional)"
                    //   value={brandName}
                    //   handleAdvanceChange={(e: any) => setBrandName(e.target.value)}
                  />
                </Grid>

                <Grid
                  size={{ xs: 12 }}
                  sx={{ display: "flex", justifyContent: "end" }}
                >
                  <Button
                    onClick={() => createAudience(setCustomDrawer)}
                    className="px-7 text-primary-color "
                  >
                    Create Audience
                  </Button>
                </Grid>
              </Grid>
            </ScrollArea>
          </div>
        }
      />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[90vw] w-11/12 max-h-[95vh] p-6 overflow-hidden">
          <ScrollArea className=" h-[80vh] p-4">
            <DialogHeader>
              <div>
                <p className="text-[20px] font-semibold ">Targeting</p>
              </div>
            </DialogHeader>
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
                {objectives.map((objective: any) => (
                  <Card
                    key={objective.title}
                    className={`cursor-pointer transition-all ${
                      selectedTarget === objective.title
                        ? "border-primary bg-primary bg-opacity-30"
                        : "border-muted bg-primary bg-opacity-10 hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedTarget(objective.title)}
                  >
                    <CardContent className="p-4">
                      <h2 className="text-lg font-semibold mb-2">
                        {objective.title}
                      </h2>
                      <p className="text-sm text-foreground/70 ">
                        {objective.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {selectedTarget == "Target Interests" ? (
                <>
                  <div>
                    <div>
                      <p className="flex items-center font-semibold text-[14px] ">
                        Use saved audience{" "}
                        <span>
                          {" "}
                          <ChevronDown size={15} />{" "}
                        </span>{" "}
                      </p>
                    </div>

                    <div>
                      <Tabs defaultValue="Related Targeting">
                        <TabsList className="flex justify-start p-0 mb-8 mt-2 bg-transparent ">
                          <TabsTrigger
                            value="Related Targeting"
                            className="relative text-[16px] leading-none !shadow-none data-[state=active]:font-bold data-[state=active]:text-[#0F51A7] data-[state=active]:bg-transparent data-[state=active]:underline  data-[state=active]:underline-offset-8  data-[state=inactive]:text-[#636060]"
                          >
                            Related Targeting
                          </TabsTrigger>
                          <TabsTrigger
                            value="AI Targeting"
                            className="relative text-[16px] leading-none !shadow-none data-[state=active]:font-bold data-[state=active]:text-[#0F51A7] data-[state=active]:bg-transparent data-[state=active]:underline data-[state=active]:underline-offset-8 data-[state=inactive]:text-[#636060]"
                          >
                            AI Targeting
                          </TabsTrigger>
                          {/* <TabsTrigger
                            value="Custom"
                            className="relative text-[16px] leading-none !shadow-none data-[state=active]:font-bold data-[state=active]:text-[#0F51A7] data-[state=active]:bg-transparent data-[state=active]:underline data-[state=active]:underline-offset-8 data-[state=inactive]:text-[#636060]"
                          >
                            Custom
                          </TabsTrigger> */}
                        </TabsList>
                        <TabsContent value="Related Targeting">
                          <div>
                            <div className="flex items-center justify-between ">
                              {/* <p>
                                Please add interests, behaviours or demographics
                              </p> */}
                              <div className="block">
                                <CustomInputField
                                  label=""
                                  name="interest"
                                  css={
                                    "bg-[#ffff] p-5 border-none ml-2 focus:ring-2 focus:ring-indigo-200 w-full min-w-[500px] "
                                  }
                                  type={"text"}
                                  placeholder={
                                    " Please add interests, behaviors or demographics e.g: Technology "
                                  }
                                  value={interest}
                                  handleAdvanceChange={(w: any) =>
                                    setInterest(w.target.value)
                                  }
                                />
                              </div>
                              <div className="flex items-center ">
                                <CustomPopOver
                                  open={openPopoverIndex}
                                  onOpenChange={setOpenPopoverIndex}
                                  triggerElement={
                                    <Badge
                                      onClick={() => getAdInterest()}
                                      // onClick={() => setOpenPopoverIndex(true)}
                                      className="mr-2 py-1 px-4 text-primary cursor-pointer text-primary-color "
                                    >
                                      Browse
                                    </Badge>
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
                                        <div className="bg-primary/70 mt-2 p-2 rounded-[8px]">
                                          <p className="text-[12px] text-black">
                                            Shorter
                                          </p>
                                        </div>
                                        <div className="bg-primary/70 mt-1 p-2 rounded-[8px]">
                                          <p className="text-[12px] text-black">
                                            Longer
                                          </p>
                                        </div>
                                        <div className="bg-primary/70 mt-1 p-2 rounded-[8px]">
                                          <p className="text-[12px] text-black">
                                            Change Tone To
                                          </p>
                                        </div>
                                      </div>
                                    </>
                                  }
                                />

                                <p className="text-secondary cursor-pointer ">
                                  Clear All
                                </p>
                              </div>
                            </div>
                            <div className="mt-3">
                              {facebookAdInterest.length > 0 &&
                                facebookAdInterest.map(
                                  (item: FacebookAdInterest, key: any) => {
                                    console.log("facebookItem", item);
                                    const isAdded =
                                      adds?.interests &&
                                      adds?.interests?.findIndex(
                                        (x: any) => x == item.name
                                      ) > -1;
                                    return (
                                      <Badge
                                        key={key}
                                        onClick={() =>
                                          !isAdded &&
                                          handleAddChip(item.name, item)
                                        }
                                        className={`m-1 rounded-[18px] cursor-pointer pt-2 pb-2 pr-4 pl-4 text-[14px] font-normal bg-primary text-primary-color ${
                                          TargetingChipsAi.includes(item.name)
                                            ? "border-2 border-secondary"
                                            : ""
                                        }`}
                                      >
                                        <div className=" flex justify-between items-center">
                                          <span>{item.name}</span>
                                          {isAdded && (
                                            <span
                                              onClick={() =>
                                                handleInterestRemove(item.name)
                                              }
                                              className="ml-2 cursor-pointer text-primary-color hover:text-red-500"
                                            >
                                              <X size={14} />
                                            </span>
                                          )}
                                          {!isAdded && (
                                            <span
                                              onClick={() =>
                                                handleInterestRemove(item.name)
                                              }
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
                            {/* <div className="mt-3" >
                        <MultiSelectComboBox/>
                      </div> */}
                          </div>
                        </TabsContent>
                        <TabsContent value="AI Targeting">
                          <div className="">
                            {chips?.length &&
                              chips[0]?.map((items: any, key: any) => {
                                console.log("chips==", items, "===");
                                return (
                                  <Badge
                                    key={key}
                                    onClick={() => handleAddChip(items)}
                                    className={`m-1 cursor-pointer rounded-[18px] pt-2 pb-2 pr-4 pl-4 text-[14px] font-normal bg-primary text-primary-color ${
                                      TargetingChipsAi.includes(items)
                                        ? "border-2 border-secondary"
                                        : ""
                                    }`}
                                    // className={`m-1 cursor-pointer rounded-[18px] pt-2 pb-2 pr-4 pl-4 text-[14px] font-normal bg-primary text-primary-color`}
                                  >
                                    <div className=" flex justify-between items-center">
                                      <span>{items}</span>
                                      <span
                                        // onClick={() => handleRemoveItem(key)}
                                        className="ml-2 cursor-pointer text-primary-color hover:text-red-500"
                                      >
                                        <X size={14} />
                                      </span>
                                    </div>
                                  </Badge>
                                );
                              })}
                          </div>
                          <div className="w-full mt-4">
                            <Card className="bg-primary border-none p-4 !pt-4">
                              <CardContent className="p-0">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <Lightbulb className="text-primary-color mr-2" />
                                    <p className="text-primary-color">
                                      This option targets everyone within a
                                      chosen location and age range, without
                                      using any specific targeting options.
                                      Facebook's algorithm then determines who
                                      sees the ads
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </TabsContent>
                        {/* <TabsContent value="Custom">
                          <div>
                            <div className="flex items-center justify-between ">
                              <p>
                                Please add interests, behaviours or demographics
                              </p>
                              <div className="flex items-center ">
                                <CustomPopOver
                                  open={openPopoverIndex}
                                  onOpenChange={setOpenPopoverIndex}
                                  triggerElement={
                                    <Badge
                                      onClick={() => setOpenPopoverIndex(true)}
                                      className="mr-2 py-1 px-4 text-primary cursor-pointer text-primary-color "
                                    >
                                      Browse
                                    </Badge>
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
                                        <div className="bg-primary/70 mt-2 p-2 rounded-[8px]">
                                          <p className="text-[12px] text-black">
                                            Shorter
                                          </p>
                                        </div>
                                        <div className="bg-primary/70 mt-1 p-2 rounded-[8px]">
                                          <p className="text-[12px] text-black">
                                            Longer
                                          </p>
                                        </div>
                                        <div className="bg-primary/70 mt-1 p-2 rounded-[8px]">
                                          <p className="text-[12px] text-black">
                                            Change Tone To
                                          </p>
                                        </div>
                                      </div>
                                    </>
                                  }
                                />

                                <p className="text-secondary cursor-pointer ">
                                  Clear All
                                </p>
                              </div>
                            </div>
                            <div className="mt-3">
                              {targetChips.map((items: any, key: any) => (
                                <Badge
                                  key={key}
                                  className="m-1 rounded-[18px] pt-2 pb-2 pr-4 pl-4 text-[14px] font-normal bg-primary text-primary-color"
                                >
                                  <div className=" flex justify-between items-center">
                                    <span>{items}</span>
                                    <span
                                      // onClick={() => handleRemoveItem(key)}
                                      className="ml-2 cursor-pointer text-primary-color hover:text-red-500"
                                    >
                                      <X size={14} />
                                    </span>
                                  </div>
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </TabsContent> */}
                      </Tabs>

                      <div className="mt-4">
                        <div>
                          <p className="text-[22px] ">Age & Gender</p>
                          <Separator
                            orientation="horizontal"
                            className="my-4"
                          />
                        </div>
                        <div>
                          <RadioGroup
                            className="flex items-center space-x-4"
                            value={gender}
                            onValueChange={(value) => {
                              setGender(value);
                              updateAdData();
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
                        <div className="flex items-center mt-5">
                          <div className="w-[200px] ">
                            <CustomSelectField
                              label="Minimum Age"
                              value={ageRange.min.toString()}
                              onValueChange={(value: any) => {
                                setAgeRange((prev) => ({
                                  ...prev,
                                  min: parseInt(value),
                                }));
                                updateAdData();
                              }}
                              css={
                                "bg-[#ffff] text-[#6B7280] w-full rounded-[22px] p-4"
                              }
                              options={[
                                { value: "18", label: "18" },
                                { value: "20", label: "20" },
                                { value: "30", label: "30" },
                                { value: "40", label: "40" },
                                { value: "50", label: "50" },
                              ]}
                            />
                          </div>
                          <div className="w-[200px] ml-2">
                            <CustomSelectField
                              label="Maximum Age"
                              value={ageRange.max.toString()}
                              onValueChange={(value: any) => {
                                setAgeRange((prev) => ({
                                  ...prev,
                                  max: parseInt(value),
                                }));
                                updateAdData();
                              }}
                              css={
                                "bg-[#ffff] text-[#6B7280] w-full rounded-[22px] p-4"
                              }
                              options={[
                                { value: "18", label: "18" },
                                { value: "20", label: "20" },
                                { value: "30", label: "30" },
                                { value: "40", label: "40" },
                                { value: "50", label: "50" },
                              ]}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : selectedTarget == "Lookalike Audience" ? (
                <>
                  <div>
                    <div className="w-full">
                      <CustomSelectField
                        label="Select your lookalike audience"
                        placeholder="Select"
                        css={
                          "bg-[#ffff] text-[#6B7280] w-full rounded-[22px] p-4"
                        }
                        options={[
                          { value: "10", label: "10" },
                          { value: "20", label: "20" },
                          { value: "30", label: "30" },
                          { value: "40", label: "40" },
                          { value: "50", label: "50" },
                        ]}
                      />
                    </div>
                    <div className="my-4 text-center ">
                      <p>OR</p>
                    </div>
                    <Card
                      onClick={() => handleDrawer(setOpenDrawer)}
                      className="group flex justify-center mx-[155px] hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <CardContent className="flex items-start p-6 space-x-4">
                        <Plus className="w-6 h-6 text-gray-500" />
                        <div>
                          <h3 className="font-medium">
                            Create lookalike audience
                          </h3>
                        </div>
                      </CardContent>
                    </Card>
                    <div className="mt-3">
                      <div className="flex items-center">
                        <p className="mr-3">
                          Do you want to exclude audience(s)?
                        </p>
                        <Switch
                          checked={toggleValue}
                          onCheckedChange={(value: any) =>
                            setToggleValue(value)
                          }
                          id="airplane-mode"
                          className="ml-4"
                        />
                      </div>
                      {toggleValue && (
                        <div className="w-full mt-4">
                          <CustomSelectField
                            label="Select your audience"
                            placeholder="Select"
                            css={
                              "bg-[#ffff] text-[#6B7280] w-full rounded-[22px] p-4"
                            }
                            options={[
                              { value: "10", label: "10" },
                              { value: "20", label: "20" },
                              { value: "30", label: "30" },
                              { value: "40", label: "40" },
                              { value: "50", label: "50" },
                            ]}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div className="w-full">
                      <CustomSelectField
                        label="Select your existing retargeting audience list"
                        placeholder="Select"
                        css={
                          "bg-[#ffff] text-[#6B7280] w-full rounded-[22px] p-4"
                        }
                        options={[
                          { value: "10", label: "10" },
                          { value: "20", label: "20" },
                          { value: "30", label: "30" },
                          { value: "40", label: "40" },
                          { value: "50", label: "50" },
                        ]}
                      />
                    </div>
                    <div className="my-4 text-center ">
                      <p>OR</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card
                        onClick={() => handleDrawer(setOpenDrawer)}
                        className="group hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <CardContent className="flex items-start p-6 space-x-4">
                          <User className="w-6 h-6 text-gray-500" />
                          <div>
                            <h3 className="font-medium">
                              Create audience by uploading a list of customers
                            </h3>
                            <p className="text-sm text-gray-500">
                              (No pixel needed)
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="group hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="flex items-start p-6 space-x-4">
                          <Users className="w-6 h-6 text-gray-500" />
                          <div>
                            <h3 className="font-medium">
                              Create audience of people who have engaged with
                              your Facebook or Instagram
                            </h3>
                            <p className="text-sm text-gray-500">
                              (No pixel needed)
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card
                        onClick={() => handleDrawer(setWebDrawer)}
                        className="group hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <CardContent className="flex items-start p-6 space-x-4">
                          <Globe className="w-6 h-6 text-gray-500" />
                          <div>
                            <h3 className="font-medium">
                              Create Website Audience
                            </h3>
                            <p className="text-sm text-gray-500">
                              (pixel needed)
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card
                        onClick={() => handleDrawer(setLeadDrawer)}
                        className="group hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <CardContent className="flex items-start p-6 space-x-4">
                          <FormInput className="w-6 h-6 text-gray-500" />
                          <div>
                            <h3 className="font-medium">
                              Create Lead form Audience
                            </h3>
                            <p className="text-sm text-gray-500">
                              (No pixel needed)
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card
                        onClick={() => handleDrawer(setCustomDrawer)}
                        className="group hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <CardContent className="flex items-start p-6 space-x-4">
                          <Video className="w-6 h-6 text-gray-500" />
                          <div>
                            <h3 className="font-medium">
                              Create video engagement Audience
                            </h3>
                            <p className="text-sm text-gray-500">
                              (No pixel needed)
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/*  */}
                    <div className="mt-3">
                      <div className="flex items-center">
                        <p className="mr-3">
                          Do you want to exclude audience(s)?
                        </p>
                        <Switch
                          checked={toggleValue}
                          onCheckedChange={(value: any) =>
                            setToggleValue(value)
                          }
                          id="airplane-mode"
                          className="ml-4"
                        />
                      </div>
                      {toggleValue && (
                        <div className="w-full mt-4">
                          <CustomSelectField
                            label="Select your audience"
                            placeholder="Select"
                            css={
                              "bg-[#ffff] text-[#6B7280] w-full rounded-[22px] p-4"
                            }
                            options={[
                              { value: "10", label: "10" },
                              { value: "20", label: "20" },
                              { value: "30", label: "30" },
                              { value: "40", label: "40" },
                              { value: "50", label: "50" },
                            ]}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            <DialogFooter className="mt-3">
              {" "}
              <Button
                onClick={() => onOpenChange(false)}
                className="text-primary-color rounded-[16px] pl-5 pr-5 bg-[#002EF6] "
                type="submit"
              >
                Continue
              </Button>
            </DialogFooter>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TargetModal;
