

import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";

export const orderColumns = [
  {
    accessorKey: "id",
    header: "ID / Assets",
    meta: { width: "150px" },
  },
  {
    accessorKey: "status",
    header: "Status",
    width: 120,
    meta: { width: "120px" },
    cell: ({ row }: any) => {
      return (
        <Badge
          className={`${
            row.original.status === "Enabled"
              ? "bg-[#DBEAFE] text-[#1E40AF] font-light border border-[#93C5FD]"
              : row.original.status === "Disabled"
              ? "bg-[#FCE7F3] text-[#9D174D] font-light border border-[#F9A8D4]"
              : row.original.status === "Approved"
              ? "bg-[#D1FAE5] text-[#1E40AF] font-light border border-[#6EE7B7]"
              : row.original.status === "Pending"
              ? "bg-[#FEF3C7] text-[#1E40AF] font-light border border-[#FCD34D]"
              : "bg-[#F3F4F6] text-[#1F2937] font-light border border-[#D1D5DB]"
          }`}
        >
          {row.getValue("status")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "user",
    header: "User",
    meta: { width: "200px" },
  },
  {
    accessorKey: "conversionRate",
    header: "Conversions Rate",
    meta: { width: "150px" },
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    meta: { width: "150px" },
    cell: ({ row }: any) => {
      return (
        <div className="flex items-center">
          <span
            className={`w-2 h-2 rounded-full inline-block mr-2 ${
              row.original.revenue === "Priority"
                ? "bg-[#22D3EE]"
                : row.original.revenue === "Express"
                ? "bg-[#F87171]"
                : "bg-primary"
            }`}
          ></span>
          {row.getValue("revenue")}
        </div>
      );
    },

    // <span className="flex items-center">
    // <span
    //   className={`w-2 h-2 rounded-full inline-block mr-2 ${
    //     item.impressions === "Priority"
    //       ? "bg-[#22D3EE]"
    //       : item.impressions === "Express"
    //       ? "bg-[#F87171]"
    //       : "bg-primary"
    //   }`}
    // ></span>
    // {item.impressions}
  },
  {
    accessorKey: "conversion",
    header: "Conversion",
    meta: { width: "250px" },
  },
  {
    accessorKey: "edit",
    header: "Edit",
    meta: { width: "100px" },
    cell: () => (
      <button className="edit-btn">
        <Edit />
        {/* <img src="/path/to/edit-icon.png" alt="Edit" /> */}
      </button>
    ),
  },
];
