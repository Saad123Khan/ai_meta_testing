import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";

export const employeeColumns = [
  {
    accessorKey: "id",
    header: "Employee Id",
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
          className={`${row.original.status === "Enabled"
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
          {row.getValue("status") ?? "Active"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "crm_role",
    header: "ROLE",
    meta: { width: "200px" },
  },
  {
    accessorKey: "name",
    header: "NAME",
    meta: { width: "150px" },
  },
  {
    accessorKey: "department_id",
    header: "DEPARTMENT",
    meta: { width: "250px" },
  },
  {
    accessorKey: "edit",
    header: "EDIT",
    meta: { width: "100px" },
    cell: () => (
      <button className="edit-btn">
        <Edit />
      </button>
    ),
  },
];
