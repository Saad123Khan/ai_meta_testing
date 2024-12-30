import { Box } from "@mui/material";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";

interface VideoUploaderProps {
  fileType: string;
  multiple?: boolean;
  isImg?: boolean;
  selectedFile: any;
  setSelectedFile: any;
  title?: any;
  css?: string;
}

const VideoUploader = ({
  fileType,
  multiple,
  css="border rounded-[10px] border-[#672c70] p-16 border-dashed ",
  selectedFile,
  setSelectedFile,
  title,
  isImg,
}: VideoUploaderProps) => {
  const handleFileUpload = (event: any) => {
    const files = event.target.files;
    const newFiles = Array.from(files); 
    setSelectedFile((prevFiles: any) => [...prevFiles, ...newFiles]);
  };

  const handleRemoveFile = (fileToRemove: any) => {
    setSelectedFile((prevFiles: any) =>
      prevFiles?.filter((file: any) => file !== fileToRemove)
    );
  };
  const customFileImage = (file: any) => (
    <img
      src={URL.createObjectURL(file)}
      alt="Network Image"
      style={{ width: "34px", height: "34px", borderRadius: "40%" }}
    />
  );

  return (
    <div>
      <div
      className={css}
      >
        <Box>
          <label
            htmlFor="upload-button"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              width={60}
              style={{ margin: 0 }}
              alt="Upload img"
              src="/assets/Group 3127.svg"
            />
            <p className="text-[12px] mt-2 ">
              Drop files here or click to upload.
            </p>
          </label>
        </Box>
        <Input
          id="upload-button"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileUpload}
          accept={fileType}
          multiple={multiple}
        />
      </div>
    </div>
  );
};

export default VideoUploader;
