import * as React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface selectFieldProps {
  multiple?: boolean;
  label?: string;
  labelCss?: string;
  options: any;
  onValueChange?: any;
  value?: any;  // Added value prop to bind the selected value
  placeholder?: string;
  css?: string;
}

const CustomSelectField = ({
  multiple = false,
  label,
  labelCss = "text-[14px] font-semibold mb-1 text-black",
  options,
  value,  // Receive the selected value
  placeholder,
  onValueChange,
  css = "bg-[#ffff] text-[#6B7280] active:border-none focus:border-none rounded-[16px] p-33",
}: selectFieldProps) => {

  return (
    <Select value={value} onValueChange={onValueChange}>
      <p className={labelCss}>{label}</p>
      <SelectTrigger className={css}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="z-[1400]">
        <SelectGroup>
          {options?.map((item: any, key: any) => (
            <SelectItem key={key} value={item.value}>{item.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomSelectField;
