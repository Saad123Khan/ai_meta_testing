import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface utilityUploadProps {
  setSelectedFile: any;
}
function UtilityUpload({ setSelectedFile }: utilityUploadProps) {

  const handleFileUpload = (event: any) => {
    const files = event.target.files;
    setSelectedFile(files?.[0]);
  };

  const handleRemoveFile = (fileToRemove: any) => {
    setSelectedFile((prevFiles: any) =>
      prevFiles?.filter((file: any) => file !== fileToRemove)
    );
  };
  return (
    <div>
      <div>
        <Card className="mt-2 p-4 h-[303px] rounded-[28px] ">
          <Label htmlFor="photo-upload" className="cursor-pointer w-full">
            <div className="flex items-center justify-center rounded-[28px]  border-2 h-[270px] border-dashed border-primary text-center">
              <span className="flex flex-col items-center justify-center">
                <img
                  src="/assets/upload icon.svg"
                  width={60}
                  style={{ margin: 0 }}
                  alt="Upload img"
                />
                <p className="text-primary mt-2">
                  Upload a product image or drag & drop a product image here.ddddd
                </p>
              </span>
              <Input
                id="photo-upload"
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept={".png"}
              />
            </div>
          </Label>
        </Card>
      </div>
    </div>
  );
}

export default UtilityUpload;
