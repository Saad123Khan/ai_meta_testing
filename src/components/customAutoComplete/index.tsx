// import { useState, ChangeEvent, FocusEvent } from "react";

// interface Option {
//   value: string;
//   label: string;
// }

// interface AutocompleteSelectProps {
//   options: Option[];
//   css: string;
// }

// const AutocompleteSelect: React.FC<AutocompleteSelectProps> = ({
//   options,
//   css = "bg-[#ffff] text-[#6B7280] active:border-none focus:border-none rounded-[16px] p-33",
// }) => {
//   const [query, setQuery] = useState("");
//   const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
//   const [isVisible, setIsVisible] = useState(false);

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setQuery(value);

//     const matches = options.filter((option) =>
//       option.label.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredOptions(matches);
//   };

//   const handleFocus = () => {
//     setIsVisible(true);
//     setFilteredOptions(options); // Show all options on focus
//   };

//   const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
//     if (
//       !e.relatedTarget ||
//       !(e.relatedTarget as HTMLElement).closest(".AutocompleteSelect-list")
//     ) {
//       setIsVisible(false);
//     }
//   };

//   const handleOptionClick = (option: Option) => {
//     setQuery(option.label);
//     setIsVisible(false);
//   };

//   return (
//     <div className="relative w-full max-w-md mx-auto">
//       <input
//         type="text"
//         value={query}
//         onChange={handleChange}
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//         className={css}
//         placeholder="Search..."
//       />

//       {isVisible && filteredOptions?.length > 0 && (
//         <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10 max-h-48 overflow-y-auto AutocompleteSelect-list">
//           {filteredOptions.map((option, index) => (
//             <li
//               key={index}
//               onClick={() => handleOptionClick(option)}
//               className="p-3 hover:bg-blue-500 hover:text-white cursor-pointer"
//             >
//               {option.label}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AutocompleteSelect;

"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectFieldProps {
  multiple?: boolean;
  label?: string;
  labelCss?: string;
  options: { label: string; value: string }[];
  onValueChange?: (value: string) => void;
  placeholder?: string;
  css?: string;
}

const AutocompleteSelect = ({
  multiple = false,
  label,
  labelCss = "text-[14px] font-semibold mb-1 text-black",
  options,
  placeholder,
  onValueChange,
  css = "bg-[#ffff] text-[#6B7280] rounded-[16px] p-3",
}: SelectFieldProps) => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [filteredOptions, setFilteredOptions] = React.useState(options);
    const [isOpen, setIsOpen] = React.useState(false);
  
    // Filter options based on search term
    React.useEffect(() => {
      setFilteredOptions(
        options.filter((option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, [searchTerm, options]);
  
    const handleOptionSelect = (value: string, label: string) => {
      setSearchTerm(label);
      onValueChange && onValueChange(value);
      setIsOpen(false); // Close the dropdown after selecting an option
    };
  
    return (
      <div className="relative">
        {label && <p className={labelCss}>{label}</p>}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className={`${css}`}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)} // Delay to allow click on option
        />
        {isOpen && filteredOptions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
            {filteredOptions.map((item, key) => (
              <div
                key={key}
                onClick={() => handleOptionSelect(item.value, item.label)}
                className="cursor-pointer p-2 hover:bg-gray-100"
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
        {isOpen && filteredOptions.length === 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
            <p className="p-2 text-gray-500">No options found</p>
          </div>
        )}
      </div>
  );
};

export default AutocompleteSelect;

