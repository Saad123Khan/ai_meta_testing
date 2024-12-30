import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronRight, Sparkles } from "lucide-react";

interface GenerateInputFieldProps {
  onIconClick: any;
  label?: string;
  name?: string;
  btnText?: any;
  onBtnClick?: any;
  placeholder?: string;
  css?: any;
  icon?: any;
  value?: any;
  handleAdvanceChange?: any;
  labelCss?: string;
  endIcon?: boolean;
  genBtn?: boolean;
}

const GenerateInputField = ({
  onIconClick,
  label,
  css,
  labelCss = "text-[14px] font-semibold mb-1 text-black",
  btnText,
  onBtnClick,
  value,
  handleAdvanceChange,
  icon,
  placeholder,
  name,
  genBtn,
}: GenerateInputFieldProps) => {
  return (
    <>
      <p className={labelCss}>{label}</p>
      <div className="relative w-full">
        <Input
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleAdvanceChange}
          className={css}
        />
        <div className="absolute right-0 top-0 h-full flex items-center gap-1 pr-1">
          {genBtn && (
            <Button
              onClick={onBtnClick}
              variant="ghost"
              size="sm"
              className="h-8 px-4 text-xs bg-[#F2F3F5] "
            >
              {btnText}
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onIconClick}
            className="h-8 w-8"
          >
            {icon}
          </Button>
        </div>
      </div>
    </>
  );
};

export default GenerateInputField;
