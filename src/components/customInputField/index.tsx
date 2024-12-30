import { Input } from "@/components/ui/input";

interface customInputFieldProps {
  type?: string;
  label?: string;
  placeholder?: string;
  css?: any;
  icon?: any;
  onIconClick?: any;
  value?: any;
  handleAdvanceChange?: any;
  labelCss?: string;
  endIcon?: boolean;
  disabled?: boolean;
  name?:string
}

const CustomInputField = ({
  type = "text",
  name,
  label ,
  placeholder,
  icon,
  endIcon,
  onIconClick,
  disabled,
  value,
  handleAdvanceChange,
  labelCss= "text-[14px] font-semibold mb-1 text-black",
  css = "bg-[#ffff] text-[#6B7280] border-none active:border-none rounded-[6px] p-5",
}: customInputFieldProps) => {
  return (
    <>
      <p className={labelCss}>{label}</p>
      <div className="relative">
        <Input
          name={name}
          disabled={disabled}
          className={css}
          type={type}
          value={value}
          onChange={handleAdvanceChange}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={onIconClick}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          {endIcon && <>{icon}</>}
        </button>
      </div>
    </>
  );
};

export default CustomInputField;