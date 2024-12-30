"use client";
import { useState } from "react";
import {
  Bolt,
  Boxes,
  ChevronRight,
  DeleteIcon,
  Palette,
  Plus,
  Star,
  Text,
  Type,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import CustomTextArea from "../customTextArea";
import CustomNewUploader from "../customNewUploader";

const colorPalatte = [{ id: 1, color: "#1264B0" }];

interface AccordionProps {
  brandName: string;
  setBrandName: any;
  brandDescription: string;
  setBrandDescription: any;
  brandLogo: any;
  setBrandLogo: any;
  brandColors: any;
  setBrandColors: any;
}

export default function CustomAccordion({
  brandName,
  setBrandName,
  brandDescription,
  setBrandDescription,
  brandLogo,
  setBrandLogo,
  brandColors,
  setBrandColors,
}: AccordionProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [colors, setColors] = useState(colorPalatte);

  //   const handleColorChange = (id, newColor) => {
  //     const updatedColors = colors.map((item) =>
  //       item.id === id ? { ...item, color: newColor } : item
  //     );
  //     setColors(updatedColors);
  //   };

  const handleInputChange = (id: any, value: any) => {
    const updatedColors = colors.map((item) =>
      item.id === id ? { ...item, color: value } : item
    );
    setColors(updatedColors);
  };

  const addNewColor = () => {
    setColors([...colors, { id: colors.length + 1, color: "#1264B0" }]);
  };

  const handleRemoveFile = (fileToRemove: any) => {
    setBrandLogo((prevFiles: any) =>
      prevFiles?.filter((file: any) => file !== fileToRemove)
    );
  };

  const handleToggle = (value: string) => {
    setOpenItem(openItem === value ? null : value);
  };

  return (
    <div className="space-y-4">
      <AccordionItem
        value="brand"
        title="Brand name & Description"
        description="Subtitle of the brand name goes here for more context"
        icon={<Star fill="#738DFE" className="h-5 w-5 text-primary " />}
        isOpen={openItem === "brand"}
        onToggle={() => handleToggle("brand")}
      >
        <form className="space-y-4">
          <div className=" ">
            <CustomTextArea
              value={brandName}
              handleAdvanceChange={(e: any) => setBrandName(e.target.value)}
              placeholder={"Write name"}
              label="Brand Name"
            />
          </div>
          <div>
            <CustomTextArea
              value={brandDescription}
              handleAdvanceChange={(e: any) =>
                setBrandDescription(e.target.value)
              }
              rows={5}
              placeholder={"Write description"}
              label="Description"
            />
          </div>
          <div className="flex justify-end ">
            <button
              type="submit"
              onClick={() => handleToggle("brand")}
              className=" py-2 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save & Continue
            </button>
          </div>
        </form>
      </AccordionItem>

      <AccordionItem
        value="logo"
        title="Select Brand Logo"
        description="Upload a logo or select from stock images"
        icon={<Boxes className="h-5 w-5 text-primary " />}
        isOpen={openItem === "logo"}
        onToggle={() => handleToggle("logo")}
      >
        <div className="mb-3">
          <p className="text-sm text-[#00146A]">
            Upload a logo in dark colour with the transparent background as PNG
          </p>
        </div>
        <div>
          <CustomNewUploader
            css={"border rounded-[10px] border-[#672c70] p-16 border-dashed "}
            selectedFile={brandLogo}
            setSelectedFile={setBrandLogo}
            fileType=".png"
          />
        </div>
        <div className="grid grid-cols-4 ">
          {brandLogo?.map((file: any, index: any) => {
            return (
              <>
                <div className="relative border border-dashed  mt-2 mr-1 border-[#B1A4B5] w-[100px] h-[100px]">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Network Image"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <div
                    className="absolute top-1 right-1 bg-white rounded-full p-1 cursor-pointer"
                    onClick={() => handleRemoveFile(file)}
                  >
                    <DeleteIcon />
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="flex justify-end mt-3 ">
          <button
            type="submit"
            onClick={() => handleToggle("logo")}
            className=" py-2 px-4 border border-transparent  rounded-3xl shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save & Continue
          </button>
        </div>
      </AccordionItem>

      <AccordionItem
        value="colors"
        title="Select Brand Colours"
        description="Choose your brand colors"
        icon={<Palette className="h-5 w-5 text-primary " />}
        isOpen={openItem === "colors"}
        onToggle={() => handleToggle("colors")}
      >
        <div className="mb-3">
          <p className="text-sm text-gray-600">
            Choose a suitable brand colour representing you logo & overall brand
            presence
          </p>
        </div>
        <div style={{ padding: "20px" }}>
          {colors.map((item, index) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: item.color,
                  marginRight: "10px",
                  borderRadius: 10,
                }}
              />
              <input
                type="text"
                value={item.color}
                onChange={(e) => handleInputChange(item.id, e.target.value)}
                // readOnly
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  width: "100px",
                }}
              />
            </div>
          ))}
          <Button
            onClick={addNewColor}
            className="mt-2 bg-primary-color text-primary hover:text-primary-color"
          >
            <Plus className="mr-2" />
            Add More
          </Button>
        </div>
        <div className="flex justify-end mt-3 ">
          <button
            type="submit"
            onClick={() => handleToggle("colors")}
            className=" py-2 px-4 border border-transparent  rounded-3xl shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save & Continue
          </button>
        </div>
      </AccordionItem>

      <AccordionItem
        value="advanced"
        title="Advanced setup"
        description="Configure advanced settings"
        icon={<Bolt className="h-5 w-5 text-primary " />}
        isOpen={openItem === "advanced"}
        onToggle={() => handleToggle("advanced")}
      >
        {/* UPLOADS */}
        <div className="space-y-2 px-20">
          <div className="flex items-center justify-between bg-primary-color/80 p-3 rounded-3xl">
            <div className="flex items-center space-x-2">
              <Type className="h-5 w-5 text-primary" />
              <span>Upload Font</span>
            </div>
            <Button size="sm" className="rounded-full text-primary-color ">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>

          <div className="flex items-center justify-between bg-primary-color/80 p-3 rounded-3xl">
            <div className="flex items-center space-x-2">
              <Type className="h-5 w-5 text-primary" />
              <span>Logo (alt)</span>
            </div>
            <Button size="sm" className="rounded-full text-primary-color ">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>

          <div className="flex items-center justify-between bg-primary-color/80 p-3 rounded-3xl">
            <div className="flex items-center space-x-2">
              <img src="/assets/meta.png" className="h-4 w-4 mr-2" />
              <span>Meta Ads</span>
            </div>
            <Button size="sm" className="rounded-full text-primary-color ">
              <Upload className="h-4 w-4 mr-2" />
              Connect Platform
            </Button>
          </div>
          <div className="flex items-center justify-between bg-primary-color/80 p-3 rounded-3xl">
            <div className="flex items-center space-x-2">
            <img src="/assets/instagram1.png" className="h-4 w-4 mr-2" />
            <span>Insta Ads</span>
              </div>
            <Button size="sm" className="rounded-full text-primary-color ">
              <Upload className="h-4 w-4 mr-2" />
              Connect Platform
            </Button>
          </div>
          <div className="flex items-center justify-between bg-primary-color/80 p-3 rounded-3xl">
            <div className="flex items-center space-x-2">
            <img src="/assets/facebook1.png" className="h-4 w-4 mr-2" />
            <span>Fb Ads</span>
            </div>
            <Button size="sm" className="rounded-full text-primary-color ">
              <Upload className="h-4 w-4 mr-2" />
              Connect Platform
            </Button>
          </div>
          <div className="flex items-center justify-between bg-primary-color/80 p-3 rounded-3xl">
            <div className="flex items-center space-x-2"> 
            <img src="/assets/google1.png" className="h-4 w-4 mr-2" />
            <span>Google Ads</span>
            </div>
            <Button size="sm" className="rounded-full text-primary-color ">
              <Upload className="h-4 w-4 mr-2" />
              Connect Platform
            </Button>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            onClick={() => handleToggle("brand")}
            className=" py-2 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save & Continue
          </button>
        </div>
      </AccordionItem>
    </div>
  );
}

interface AccordionItemProps {
  value: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function AccordionItem({
  value,
  title,
  description,
  icon,
  isOpen,
  onToggle,
  children,
}: AccordionItemProps) {
  return (
    <div
      className={cn(
        "rounded-[32px] p-2 overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "bg-primary/70" : "bg-primary-color/75"
      )}
    >
      <div className="flex justify-end mt-2 mr-2">
        <Badge className="bg-[#FEC7C7] text-[#FF0000] border border-[#FF0000] ">
          Incomplete
        </Badge>
      </div>
      <div
        className="pt-0 pb-5 px-3 cursor-pointer flex justify-between items-center"
        onClick={onToggle}
        role="button"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${value}`}
      >
        <div
          className={cn(
            "flex items-center space-x-3 pb-3",
            isOpen ? " border-b w-full" : "border-none"
          )}
        >
          <div
            className={cn(
              "p-2 rounded-full transition-colors duration-300 bg-primary-color"
            )}
          >
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-md">{title}</h3>
            <p className="text-xs text-[#6A6A6A] ">{description}</p>
          </div>
        </div>
        {/* <ChevronRight className={cn(
          "h-5 w-5 text-gray-400 transition-transform duration-300",
          isOpen && "transform rotate-90"
        )} /> */}
      </div>
      <div
        id={`accordion-content-${value}`}
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-4 rounded-b-lg">{children}</div>
      </div>
    </div>
  );
}
