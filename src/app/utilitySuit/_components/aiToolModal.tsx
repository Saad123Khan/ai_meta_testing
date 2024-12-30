import CustomInputField from "@/components/customInputField";
import CustomUploader from "@/components/customUploader";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeleteIcon, Plus } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Box } from "@mui/material";
import { Card } from "@/components/ui/card";

interface CreateFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: any;
}

const AiToolModal = ({ data, open, onOpenChange }: CreateFolderDialogProps) => {
  const [image, setImage] = useState<any>([]);

  const handleRemoveFile = () => {
    setImage(null);
  };

  const handleFileUpload = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-primary-color/80 lg:max-w-[800px]">
        <DialogHeader>
          <div className="flex mt-3">
            <div>
              <Box
                sx={{
                  background: "#fff",
                  color: "#242730",
                  padding: 1,
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  mr: 1,
                }}
              >
                {data?.icon}
              </Box>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-[#002EF6] ">
                {data?.title}
              </p>
              <p className="text-[10px] text-[#9E9D9D] ">{data?.subHeading}</p>
            </div>
          </div>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Card className="mt-2 p-2 h-full flex items-center justify-center">
                <Label htmlFor="photo-upload" className="cursor-pointer w-full">
                  <div className="border-2 border-dashed border-primary rounded-xl pl-4 pr-4 pt-14 pb-14 text-center">
                    <span className="flex flex-col items-center justify-center">
                      <img
                        src="/assets/upload icon.svg"
                        width={60}
                        style={{ margin: 0 }}
                        alt="Upload img"
                      />
                      <p className="text-primary mt-2">
                        Upload a product image or drag & drop a product image
                        here.
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
            <div>
              <Card className="mt-2 p-2 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="flex justify-center items-center mb-2">
                    <Box
                      sx={{
                        background: "#738DFE",
                        opacity: "40%",
                        color: "#242730",
                        padding: 1,
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        mr: 1,
                      }}
                    >
                      {data?.icon}
                    </Box>
                  </div>
                  <div>
                    <p className="text-[16px] text-primary font-semibold">
                      {data?.title}
                    </p>
                    <p className="text-[12px] text-[#9E9D9D]">{data?.info}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          {image && (
            <div className="grid grid-cols-4 mt-3">
              <div className="relative border border-dashed  mt-2 mr-1 border-[#B1A4B5] w-[100px] h-[100px]">
                <img
                  src={image}
                  alt="Network Image"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
                <div
                  className="absolute top-1 right-1 bg-white rounded-full p-1 cursor-pointer"
                  onClick={handleRemoveFile}
                >
                  <DeleteIcon />
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
        {/* <DialogFooter>
          <Button
            className="text-primary-color bg-secondary"
            type="submit"
          >
            Continue
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default AiToolModal;
