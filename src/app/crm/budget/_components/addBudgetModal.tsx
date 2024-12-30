import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DialogHeader } from "@/components/ui/dialog";
import CustomInputField from "@/components/customInputField";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const AddBudgetModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const handleSubmit = () => {
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{
      style: { borderRadius: 22 }
    }}>
      <DialogContent>
        <DialogHeader className="">
          <DialogTitle className="text-center">
            <p className="text-xl font-semibold">Create new Budget</p>
            <p className="text-sm text-muted-foreground">
              Fill out this form to Create New Budget
            </p>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 mt-4 ">
          <div className="grid gap-1">
            <CustomInputField
              css={"bg-primary/50 p-5 rounded-[18px]"}
              type={"text"}
              label="Category"
            />
          </div>
          <div className="grid gap-1">
            <CustomInputField
              css={"bg-primary/50 border-none p-5 rounded-[18px]"}
              type={"text"}
              label="Budget Amount"
            />
          </div>
          <div className="grid gap-1  ">
            <CustomInputField
              css={"bg-primary/50 border-none p-5 rounded-[18px]"}
              type={"text"}
              label="Spent On"
            />
          </div>
        </div>
        {/* button */}
        <div className="flex justify-end mt-4 ">
          <Button
            onClick={handleSubmit}
            className=" bg-[#002EF6] rounded-[18px] px-10 py-2 hover:bg-blue-700 text-white"
            type="submit"
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddBudgetModal;
