import CustomInputField from "@/components/customInputField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PersonalInfoModalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PersonalInfoModal = ({
  open,
  onOpenChange,
}: PersonalInfoModalDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogHeader> 
            <p className="text-16px font-semibold text-center" >Personal Information</p>
        </DialogHeader> */}
      <DialogContent className="sm:max-w-[455px] h-[558px] ">
        <DialogTitle>
          {" "}
          <p className="text-16px font-semibold text-center">
            Personal Information
          </p>
        </DialogTitle>
          <div className="grid grid-cols-1 mt-2 ">
            <CustomInputField
              label="Full Name"
              placeholder="Your first name"
              labelCss="text-[12px] font-semibold mb-1 text-black"
              css="bg-[#E2E6EE] text-[#6B7280] border-none active:border-none rounded-[6px] p-6"
              type="text"
            />
          </div>
          <div className="grid grid-cols-1  mt-1">
            <CustomInputField
              label="Last Name"
              placeholder="Your last name"
              labelCss="text-[12px] font-semibold mb-1 text-black"
              css="bg-[#E2E6EE] text-[#6B7280] border-none active:border-none rounded-[6px] p-6"
              type="text"
            />
          </div>
          <div className="grid grid-cols-1  mt-1">
            <CustomInputField
              label="Country"
              placeholder="Your country name"
              labelCss="text-[12px] font-semibold mb-1 text-black"
              css="bg-[#E2E6EE] text-[#6B7280] border-none active:border-none rounded-[6px] p-6"
              type="text"
            />
          </div>
          <div className="grid grid-cols-1  mt-1">
            <CustomInputField
              label="Gender"
              placeholder="Your gender"
              css="bg-[#E2E6EE] text-[#6B7280] border-none active:border-none rounded-[6px] p-6"
              labelCss="text-[12px] font-semibold mb-1 text-black"
              type="text"
            />
          </div>
          <div className="flex justify-end mt-2">
              <Button className="bg-secondary px-6 text-primary-color">
                Save Changes
              </Button>
          </div>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalInfoModal;
