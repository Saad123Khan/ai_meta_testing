import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DialogHeader } from "@/components/ui/dialog";
import CustomInputField from "@/components/customInputField";

const ConnectPlatformModal = ({
  open,
  onClose,
  cardData,
}: {
  open: boolean;
  onClose: () => void;
  cardData: any;
}) => {
  const handleSubmit = () => {
    console.log("Creating ad for:", cardData);
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent >
        <div className="flex flex-col items-center">
          <Image
            src={cardData?.icon}
            alt="TikTok Logo"
            width={80}
            height={80}
            // className="mb-4"
          />
          <p className="text-xl font-bold">
            {cardData?.name} Ads
          </p>
          <p className="text-xs text-muted-foreground">
            Please enter your credentials to login
          </p>
        </div>
        <div className="grid gap-4 py-4 px-6 mt-3">
          <div className="grid gap-2  ">
            
            <CustomInputField
              css={"bg-[#E4E4E4] p-3 rounded-[12px]"}
              type={"text"}
              label="Username"
              placeholder={"Enter Username"}
            />
          </div>
          <div className="grid gap-2   ">
            <CustomInputField
              css={"bg-[#E4E4E4] p-3 rounded-[12px]"}
              type={"password"}
              label="Password"              
              placeholder={"Enter Password"}
            />
          </div>
          <div className="text-right">
            <a href="#" className="text-[12px] text-[#0028D4] hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>
        <div className="flex justify-start px-6" >
        <Button
          onClick={handleSubmit}
          className=" bg-secondary rounded-3xl hover:bg-blue-700 px-12 text-white"
          type="submit"
        >
          Login
        </Button>
        </div>
      </DialogContent>
    </Dialog>
  
  );
};

export default ConnectPlatformModal;
