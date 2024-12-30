import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleAlert } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import CustomSelectField from "@/components/customSelectField";
import AutocompleteSelect from "@/components/customAutoComplete";
import { Objective } from "@/types/Ad";
import { useAppSelector } from "@/hooks/useRedux";
import { useCountry } from "@/hooks/useCountry";
import { countries } from "@/lib/constant";

interface CreateFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedObjective: any;
  setSelectedObjective: any;
}
const objectives: Objective[] = [
  {
    title: "Traffic",
    description: "Send people to your website",
    platformValues: {
      facebook: "OUTCOME_TRAFFIC",
      instagram: "OUTCOME_TRAFFIC",
      google: "WEBSITE_TRAFFIC",
      twitter: "WEBSITE_CLICKS",
    },
  },
  {
    title: "Leads",
    description: "Collect leads for your business",
    platformValues: {
      facebook: "OUTCOME_LEADS",
      instagram: "OUTCOME_LEADS",
      google: "LEAD_FORM",
      twitter: "LEAD_GENERATION",
    },
  },
  {
    title: "Conversions",
    description: "Get people to take action",
    platformValues: {
      facebook: "OUTCOME_SALES",
      instagram: "OUTCOME_SALES",
      google: "SALES",
      twitter: "CONVERSIONS",
    },
  },
  {
    title: "Sales",
    description: "Increase sales for your business",
    platformValues: {
      facebook: "OUTCOME_SALES",
      instagram: "OUTCOME_SALES",
      google: "SALES",
      twitter: "WEBSITE_CONVERSIONS",
    },
  },
  {
    title: "Phone Calls",
    description:
      "When someone clicks on your ad, they'll directly call the phone number you provide.",
    platformValues: {
      facebook: "OUTCOME_LEADS",
      instagram: "OUTCOME_LEADS",
      google: "CALLS",
      twitter: "LEAD_GENERATION", // Use lead generation or skip if not supported
    },
  },
  {
    title: "Engagement / Messages",
    description:
      "When someone clicks on your ad, it will initiate a conversation directly in Messenger, Whatsapp, or Instagram.",
    platformValues: {
      facebook: "OUTCOME_ENGAGEMENT",
      instagram: "OUTCOME_ENGAGEMENT",
      google: "ENGAGEMENT",
      twitter: "TWEET_ENGAGEMENT",
    },
  },
];

const specialCategories = [
  { title: "Housing", description: "Send people to your website" },
  { title: "Credit", description: "Collect leads for your business" },
  { title: "Employement", description: "Get people to take action" },
];

const SelectGoalModal = ({
  open,
  onOpenChange,
  selectedObjective,
  setSelectedObjective,
}: CreateFolderDialogProps) => {
  const [toggleValue, setToggleValue] = useState(false);
  const { adds }: any = useAppSelector((state) => state.adds);
  console.log("campaignGoal", adds?.campaignGoal);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[90vw] w-11/12 max-h-[95vh] p-6 overflow-hidden">
        <ScrollArea className=" h-[80vh] p-4">
          <DialogHeader>
            <div>
              <p className="text-[16px] font-semibold ">
                What is your ad’s objective
              </p>
            </div>
          </DialogHeader>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
              {objectives.map((objective: any) => (
                <Card
                  key={objective.title}
                  className={`cursor-pointer transition-all ${
                    adds?.campaignGoal?.title === objective?.title
                      ? "border-primary bg-primary bg-opacity-30"
                      : "border-muted bg-primary bg-opacity-10 hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedObjective(objective)}
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

            <div>
              <div className="flex justify-between items-center ">
                <div className="flex items-center ">
                  <p className="text-xl mr-2">Special Ad Categories</p>
                  <span>
                    <CircleAlert size={16} />
                  </span>
                </div>
                <div>
                  <Switch
                    checked={toggleValue}
                    onCheckedChange={(value) => setToggleValue(value)}
                    id="airplane-mode"
                    className="ml-4"
                  />
                </div>
              </div>
              <p className="text-[12px] text-[#6A6A6A] ">
                Declare your ads are related to credit, housing social issues,
                elections or politics Requirements differ by country
              </p>
            </div>
            {toggleValue && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
                  {specialCategories.map((objective: any) => (
                    <Card
                      key={objective.title}
                      className={`cursor-pointer transition-all ${
                        selectedObjective === objective.title
                          ? "border-primary bg-primary bg-opacity-30"
                          : "border-muted bg-primary bg-opacity-10 hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedObjective(objective.title)}
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
                {/* <div>
                  <CustomSelectField
                    placeholder={"Select"}
                    label={"Select countries where you are advertising"}
                    labelCss="text-[13px] mb-1 text--[#6A6A6A]"
                    css={"text-[#6B7280] border-[#6A6A6A] "}
                    options={[
                      { value: "all", label: "Pakistan" },
                      { value: "banana", label: "India" },
                      { value: "blueberry", label: "UAE" },
                      { value: "grapes", label: "UK" },
                      { value: "pineapple", label: "US" },
                    ]}
                  />
                </div> */}
                <div className="w-full">
                  {/* <AutocompleteSelect
                    placeholder={"Select"}
                    label={"Select countries where you are advertising"}
                    labelCss="text-[13px] mb-1 text-[#6A6A6A]"
                    css="bg-[#ffff] w-full text-[#6B7280] border active:border-none focus:border-none rounded-[16px] p-2"
                    options={countries}
                  /> */}
                  <CustomSelectField
                    label="Select countries where you are advertising"
                    // onValueChange={(value: any) =>
                    //   dispatch(setAdds({ ...adds, ctaButtonText: value }))
                    // }
                    // value={addsData?.ctaButtonText}
                    css="bg-[#ffff] w-full text-[#6B7280] border active:border-none focus:border-none rounded-[16px] p-2"
                    options={countries}
                  />
                </div>
              </div>
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
  );
};

export default SelectGoalModal;
