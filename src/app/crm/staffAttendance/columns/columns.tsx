import { Badge, Edit } from "lucide-react";

  export const attendanceColumn = [
    {
      accessorKey: "date",
      header: "Date",
      meta: { width: "120px" },
    },
    {
      accessorKey: "name",
      header: "Name",
      meta: { width: "200px" },
    },
    {
      accessorKey: "day",
      header: "Day",
      meta: { width: "150px" },
    },
    {
      accessorKey: "checkInTime",
      header: "Check In time",
      meta: { width: "150px" },
      cell: ({ row }:any) => (
        <span>{row.getValue("checkInTime") || "---------"}</span>
      ),
    },
    {
      accessorKey: "checkOutTime",
      header: "Check Out time",
      meta: { width: "150px" },
      cell: ({ row }:any) => (
        <span>{row.getValue("checkOutTime") || "---------"}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      meta: { width: "120px" },
    },
    {
      accessorKey: "onTimeStatus",
      header: "Late/ On Time",
      meta: { width: "150px" },
      cell: ({ row }:any) => (
        <span>{row.getValue("onTimeStatus") || "---------"}</span>
      ),
    },
  ];
  