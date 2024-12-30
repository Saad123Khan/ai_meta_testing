import { Input } from "@/components/ui/input";

interface CustomPriceInputFieldProps {
  type?: string;
  label?: string;
  placeholder?: string;
  duration?: string;
  css?: any;
  icon?: any;
  onIconClick?: any;
  value?: any;
  handleAdvanceChange?: any;
  endIcon?: boolean;
  disabled?: boolean;
}

const CustomPriceInputField = ({
  type = "text",
  label,
  placeholder,
  duration,
  disabled,
  value,
  handleAdvanceChange,
  css = "bg-[#ffff] text-[#6B7280] border-none active:border-none rounded-[6px] p-5",
}: CustomPriceInputFieldProps) => {
  return (
    <>
      <p className="text-[14px] font-semibold mb-1 text-black">{label}</p>
      <div className="relative">
      <p className="absolute text-primary pr-2 left-3 top-1/2 transform -translate-y-1/2" >
            SEK
        </p>
        <Input
          disabled={disabled}
          className={`${css} pl-12 pr-12`}
          type={type}
          value={value}
          onChange={handleAdvanceChange}
          placeholder={placeholder}
        />

        <p className="absolute text-primary right-3 top-1/2 transform -translate-y-1/2" >
            /{duration}
        </p>
      </div>
    </>
  );
};

export default CustomPriceInputField;
