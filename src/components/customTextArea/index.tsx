import { Textarea } from "@/components/ui/textarea";

interface CustomTextAreaProps {
  label?: string;
  placeholder?: string;
  css?: any;
  value?: any;
  handleAdvanceChange?: any;
  rows?: any;
  disabled?: boolean;
  name?: string;
}

const CustomTextArea = ({
  name,
  label,
  placeholder,
  disabled,
  value,
  handleAdvanceChange,
  rows,
  css = "bg-[#ffff] text-[#6B7280] active:border-none rounded-[16px] p-2",
}: CustomTextAreaProps) => {
  return (
    <>
      <p className="text-[14px] font-semibold mb-1 text-black">
        {label}
      </p>
      <div>
        <Textarea
          name={name}
          placeholder={placeholder}
          className={css}
          disabled={disabled}
          value={value}
          onChange={handleAdvanceChange}
          rows={rows}          
        />
      </div>
    </>
  );
};

export default CustomTextArea;
