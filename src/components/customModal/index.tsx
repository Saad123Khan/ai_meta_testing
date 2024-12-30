
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

interface CreateFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modalContent?: any;
  modalHeader?: any;
  modalFooter?: any;
}

const CustomModal = ({
  open,
  onOpenChange,
  modalContent,
  modalHeader,
  modalFooter,
}: CreateFolderDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>{modalHeader}</DialogHeader>
        {modalContent}
        <DialogFooter>{modalFooter}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
