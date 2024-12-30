import { Box } from "@mui/material";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "../ui/badge";
import { DeleteIcon, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useAppDispatch } from "@/hooks/useRedux";
import { addSelectedFile, removeSelectedFile } from "@/store/slices/imageSlice";

interface customUploaderProps {
  fileType: string;
  multiple?: boolean;
  isImg?: boolean;
  selectedFile: any;
  setSelectedFile: any;
  title?: any;
  id?: any;
  isArray?: boolean;
}

const CustomUploader = ({
  fileType,
  multiple,
  selectedFile,
  setSelectedFile,
  title,
  isImg,
  id,
  isArray=true
}: customUploaderProps) => {
  const handleFileUpload = (event: any) => {
    const files = event.target.files;
    const newFiles = Array.from(files); // Convert files to an array
    if(isArray)
    {
      setSelectedFile((prevFiles: any) => [...prevFiles, ...newFiles]);
    }
    else{
      setSelectedFile(files?.[0]);
      
    }

  };

  const handleRemoveFile = (fileToRemove: any) => {
    setSelectedFile((prevFiles: any) =>
      prevFiles?.filter((file: any) => file !== fileToRemove)
    );
  };

  return (
    <div>

      {isImg ? (
        <>
        <div className="grid grid-cols-3">
          <div className="relative border border-dashed  mt-2 mr-1 border-[#B1A4B5] w-[180px] h-[180px]">
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Network Image"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
            <div
              className="absolute top-1 right-1 bg-white rounded-full p-1 cursor-pointer"
              onClick={() => handleRemoveFile(selectedFile)}
            >
              <DeleteIcon />
            </div>
          </div>
          </div>
        </>
      ) : (
        <>
          <p className="font-semibold mb-2 text-[13px]">{title}</p>
          <Label htmlFor={id} className="cursor-pointer">
            <div className="border-2 bg-[#E1F6FF] border-dashed border-gray-300 rounded-md pl-4 pr-4 pt-14 pb-14 text-center">
              <span className="flex justify-center">
                <Plus className="h-6 w-6 text-gray-400" />
              </span>
              <Input
                id={id}
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept={fileType}
                multiple={multiple}
              />
            </div>
          </Label>
        </>
      )}
    </div>
  );
};

export default CustomUploader;
