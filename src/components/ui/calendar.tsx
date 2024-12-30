// "use client"

// import * as React from "react"
// import { DayPicker } from "react-day-picker"
// import { cn } from "@/lib/utils"
// import { buttonVariants } from "@/components/ui/button"
// import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
// import { useState } from "react"
// import "react-day-picker/style.css";

// export type CalendarProps = React.ComponentProps<typeof DayPicker>

// function Calendar(){
// const [selected, setSelected] = useState<Date>();
//   return (
//     <DayPicker
//       mode="single"
//       selected={selected}
//       onSelect={setSelected}
//       footer={
//         selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
//       }
//     />
//   )
// }
// Calendar.displayName = "Calendar"

// export { Calendar }

import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme style file

type CalendarProps = {
  onDateChange: (startDate: Date, endDate: Date) => void;
};

const Calendar: React.FC<CalendarProps> = ({ onDateChange }) => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;
    setDateRange([ranges.selection]);
    onDateChange(startDate, endDate); // Send dates to the parent component
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">Select a Date Range</h2>
      <DateRange
        ranges={dateRange}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
      />
    </div>
  );
};

export default Calendar;