import { Edit, Trash2 } from "lucide-react";

export const LeavesColumns = [
  {
    accessorKey: "type",
    header: "Type",
    meta: { width: "150px" },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    meta: { width: "100px" },
    cell: ({ row }: any) => (
      <div style={{ textAlign: "center" }}>{row.getValue("quantity")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    meta: { width: "200px" },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    meta: { width: "200px" },
    cell: ({ row }: any) => (
      <div style={{ display: "flex", gap: "10px" }}>
        <Edit className="size-5" color="#3b82f6" />
        <Trash2 className="size-5" color="#ef4444" />
      </div>
    ),
  },
];
