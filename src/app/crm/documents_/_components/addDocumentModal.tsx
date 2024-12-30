"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Badge, Chip, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DialogHeader } from "@/components/ui/dialog";
import CustomInputField from "@/components/customInputField";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CustomUploader from "@/components/customUploader";
import { useState } from "react";
import { DeleteIcon, File, FileIcon } from "lucide-react";
import CustomNewUploader from "@/components/customNewUploader";

const AddDocumentModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [selectedFile, setSelectedFile] = useState<any>([]);
  const handleRemoveFile = (fileToRemove: any) => {
    setSelectedFile((prevFiles: any) =>
      prevFiles?.filter((file: any) => file !== fileToRemove)
    );
  };

  const handleSubmit = () => {
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        style: { borderRadius: 22 },
      }}
    >
      <DialogContent>
        <DialogHeader className="">
          <DialogTitle className="text-center">
            <p className="text-xl font-semibold">Create new Document</p>
            <p className="text-sm text-muted-foreground">
              Fill out this form to Create New Document
            </p>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CustomNewUploader
            labelText="Drag & drop a document or upload from local storage"
            css={"border rounded-[10px] border-secondary text-center p-16 border-dashed "}
            uploadImg={"/assets/upload new icon.svg"}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            fileType=".pdf"
          />
        </div>

        <div className="grid grid-cols-2 ">
          {selectedFile?.map((file: any, index: any) => {
            return (
              <div className="grid grid-cols-1">
                <Chip
                  avatar={<FileIcon />}
                  label={file?.name}
                  variant="outlined"
                  onDelete={() => handleRemoveFile(file)}
                  deleteIcon={<DeleteIcon />}
                />
              </div>
            );
          })}
        </div>
        {/* button */}
        <div className="flex justify-end mt-4">
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

export default AddDocumentModal;
