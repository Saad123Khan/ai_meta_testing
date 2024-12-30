import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import CustomInputField from "@/components/customInputField";
import CustomTextArea from "@/components/customTextArea";

interface CreateFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const objectives = [
  { title: "Traffic", description: "Send people to your website" },
  { title: "Leads", description: "Collect leads for your business" },
  { title: "Conversions", description: "Get people to take action" },
  { title: "Sales", description: "Increase sales for your business" },
];

const BudgetOptionalModal = ({
  open,
  onOpenChange,
}: CreateFolderDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="pt-8 pb-4 pr-4 pl-4 ">
        <DialogHeader>
          <div>
            <p className="text-[16px] font-semibold ">Budget Optional</p>
          </div>
        </DialogHeader>
        <div>
          <div className="grid grid-cols-1 gap-3 m-3">
            <div className=" mt-5">
            <CustomTextArea
              css={"bg-[#ffff] text-[#6B7280] rounded-[16px] p-2"}
              rows={6}
               label="UTM parameters (Optional)"
              //   value={brandName}
              //   handleAdvanceChange={(e: any) => setBrandName(e.target.value)}
              placeholder={
                "utm_source=fb_ad&utm.medium={{odset.name))&utm_campaign= ((campaign.name]]&utm_content=[(ad.name}}&campaign id=[[campaign.id))"
              }
            />              
            </div>
            <div className=" mt-5">
              <CustomInputField
                label="Campaign Name (Optional)"
                css={
                  "bg-primary-color  mt-2 p-5 shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[12px]"
                }
                placeholder={"Undefined | Traffic | Video"}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          {" "}
          <Button
            onClick={() => onOpenChange(false)}
            className="text-primary-color rounded-[16px] pl-5 pr-5 bg-[#002EF6] "
            type="submit"
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetOptionalModal;
