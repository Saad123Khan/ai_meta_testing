import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, X } from "lucide-react";
import CustomInputField from "@/components/customInputField";

interface CreateFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateFolderModal = ({ open, onOpenChange }: CreateFolderDialogProps) => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>

      <DialogContent className="sm:max-w-[425px] !rounded-[20px]">
        <DialogHeader>
          <DialogTitle className="text-[24px] font-roboto text-center">
            Create Folder
          </DialogTitle>
          <DialogDescription className="text-[12px] mt-4 font-semibold text-black">
            Upload a cover photo
            <p className="text-[10px] text-[#959BA5]">
              Dimension 1080x1920 for cover.
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 ">
          {image ? (
            <div className="relative w-full h-32">
              <img
                src={image}
                alt="Uploaded cover"
                className="w-full h-full object-cover rounded-md"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed bg-[#B8C5FD] border-gray-300 rounded-md pl-4 pr-4 pt-14 pb-14 text-center flex items-center justify-center">
            <Label htmlFor="photo-upload" className="cursor-pointer">
              <div className="flex items-center text-black font-semibold text-[12px] p-2 px-6 bg-primary-color border border-dashed rounded-[18px] border-black">
                <Camera fill="#002EF6" className="text-[#fff]" />
                <p className="ml-2">Upload Photo</p>
              </div>
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </Label>
          </div>
          
          )}
          <div className="">
            <p className="text-[12px] font-semibold">Folder Name</p>
            <p className="text-[12px] text-[#959BA5]">
              Write an appropiate folder name
            </p>
          </div>
          <div className="">
            <CustomInputField
              css={"bg-[#D9D9D9]/[0.62] border-none rounded-[12px]"}
              type={"text"}
              placeholder={"Folder Name"}
            />
          </div>
        </div>
        <DialogFooter>
          <Button className="text-primary-color bg-secondary" type="submit">
            Create Folder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFolderModal;
