import { Badge } from "@/components/ui/badge";

export const leavesRequestColumns = [
  {
    accessorKey: "staffName",
    header: "Staff Name",
    meta: { width: "200px" },
  },
  {
    accessorKey: "noOfDays",
    header: "No of Days",
    meta: { width: "100px" },
    cell: ({ row }: any) => (
      <div style={{ textAlign: "center" }}>{row.getValue("noOfDays")}</div>
    ),
  },
  {
    accessorKey: "fromDate",
    header: "From Date",
    meta: { width: "150px" },
  },
  {
    accessorKey: "toDate",
    header: "To Date",
    meta: { width: "150px" },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    meta: { width: "200px" },
  },
  {
    accessorKey: "status",
    header: "Status",
    meta: { width: "150px" },
    cell: ({ row }: any) => (
      <span
        style={{
          color: row.getValue("status") === "Pending" ? "#FCD34D" : "#6EE7B7",
          fontWeight: "bold",
        }}
      >
        {row.getValue("status")}
      </span>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    meta: { width: "200px" },
    cell: ({ row }: any) => (
      <div style={{ display: "flex", gap: "10px" }}>
        <Badge
          className={`bg-[#D1FAE5] cursor-pointer hover:bg-transparent text-[#1E40AF] font-light border border-[#6EE7B7]`}
        >
          Approve
        </Badge>
        <Badge
          className={`bg-[#FCE7F3] cursor-pointer hover:bg-transparent text-[#9D174D] font-light border border-[#F9A8D4]`}
        >
          Reject
        </Badge>
        {/* <button
          style={{
            padding: "5px 15px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Approve
        </button>
        <button
          style={{
            padding: "5px 15px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Reject
        </button> */}
      </div>
    ),
  },
];
