import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";

export const departmentColumns = [
  {
    accessorKey: "id",
    header: "Department Id",
    meta: { width: "150px" },
  },
  {
    accessorKey: "name",
    header: "Name",
    meta: { width: "200px" },
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
