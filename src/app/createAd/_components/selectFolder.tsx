import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CreateFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const creativeTypes = [
  { name: "Folder 1", id: "1" },
  { name: "Folder 2", id: "2" },
  { name: "Folder 3", id: "3" },
];

const SelectFolder = ({ open, onOpenChange }: CreateFolderDialogProps) => {
  const [creativeTypeValue, setCreativeTypeValue] = useState(
    creativeTypes[0]?.id
  );
  const handleRadioChange = (value: any) => {
    setCreativeTypeValue(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] !rounded-[20px] ">
        <DialogHeader>
          <DialogTitle className="text-center">
            <p className="text-[24px] font-normal">
              Select Folder
              </p>
            <p className="text-[12px] font-normal mt-1 text-[#959BA5]">
            Select the folder to add the selected item
              </p>
          </DialogTitle>
          {/* <DialogDescription className="text-[12px] text-center text-[#959BA5]">
            Select the folder to add the selected item
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 ">
          <RadioGroup
            className=""
            defaultValue={creativeTypes[0].id}
            value={creativeTypeValue}
            onValueChange={(value) => handleRadioChange(value)}
          >
            {creativeTypes.map((item: any, key: any) => (
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value={item.id}
                  id={`r${item.id}`}
                  className={`${
                    creativeTypeValue === item.id ? "bg-primary " : ""
                  }`}
                />
                <Label className="text-[15px]" htmlFor={`r${item.id}`}>{item.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button
            className="text-primary-color rounded-[16px] px-6 bg-secondary"
            onClick={()=>onOpenChange(false)}
          >
            Add to folder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SelectFolder;
