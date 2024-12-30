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
import CustomSelectField from "@/components/customSelectField";

interface AddStaffLeavesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const objectives = [
  { title: "Traffic", description: "Send people to your website" },
  { title: "Leads", description: "Collect leads for your business" },
  { title: "Conversions", description: "Get people to take action" },
  { title: "Sales", description: "Increase sales for your business" },
];

const AddStaffLeaves = ({ open, onOpenChange }: AddStaffLeavesProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="pt-8 pb-4 pr-4 pl-4 ">
        <DialogHeader>
          <div>
            <p className="text-[16px] font-semibold ">Add Leaves </p>
          </div>
        </DialogHeader>
        <div>
          <div className="grid grid-cols-1 gap-3 m-3">
            <div className=" mt-4">
              <CustomSelectField
                placeholder={"Select Leave Type"}
                label="Leave Type"
                css={"bg-[#ffff] text-[#6B7280] w-full rounded-[22px] p-4"}
                options={[
                  { value: "Vacation", label: "Vacation" },
                  { value: "Sick", label: "Sick" },
                  { value: "Casual", label: "Casual" },
                  { value: "Paid", label: "Paid" },
                  { value: "Personal", label: "Personal" },
                ]}
              />
            </div>
            <div className=" mt-4">
              <CustomInputField
                label="Quantity"
                placeholder="e.g; 10"
                css={
                  "bg-primary-color  mt-2 p-5 shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[12px]"
                }
              />
            </div>
            <div className=" mt-4">
              <CustomTextArea
                css={"bg-[#ffff] text-[#6B7280] rounded-[16px] p-2"}
                rows={6}
                label="Description"
                placeholder={
                  "Lorem ipsum dolor sit amet. Ea doloribus quaerat ea voluptatibus quos At tempore ratione eum rerum culpa qui magni ratione. Aut perferendis quidem et magni consequuntur nam tenetur exercitationem qui dolores enim tempora."
                }
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
            Add Leave
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddStaffLeaves;
