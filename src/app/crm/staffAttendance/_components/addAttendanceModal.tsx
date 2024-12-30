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
import CustomDateRangePicker from "@/components/customDateRangePicker";
// import CustomTimePicker from "@/components/customTimePicker";

interface AddAttendanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const objectives = [
  { title: "Traffic", description: "Send people to your website" },
  { title: "Leads", description: "Collect leads for your business" },
  { title: "Conversions", description: "Get people to take action" },
  { title: "Sales", description: "Increase sales for your business" },
];

const AddAttendanceModal = ({
  open,
  onOpenChange,
}: AddAttendanceModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="pt-8 pb-4 pr-4 pl-4 ">
        <DialogHeader>
          <div>
            <p className="text-[16px] font-semibold ">Add Manual Attendance </p>
          </div>
        </DialogHeader>
        <div>
          <div className="grid grid-cols-1 gap-3 m-3">
            <div className=" mt-4">
              <CustomInputField
                label="Staff Name"
                css={
                  "bg-primary-color  mt-2 p-5 shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[12px]"
                }
              />
            </div>
            <div className=" mt-4">
              <CustomDateRangePicker
                // label="Date"
                // className={
                //   "bg-primary-color z-[1450] w-full mt-2 p-5 shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[12px]"
                // }
              />
            </div>
            <div className=" mt-4">
              {/* <CustomTimePicker
                label="Starting Time"
                css={
                  "bg-primary-color z-[1450] w-full mt-2 p-5 shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[12px]"
                }
              /> */}
            </div>
            <div className=" mt-4">
              {/* <CustomTimePicker
                label="Ending Time"
                css={
                  "bg-primary-color z-[1450] w-full mt-2 p-5 shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[12px]"
                }
              /> */}
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
            Add Attendance
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAttendanceModal;
