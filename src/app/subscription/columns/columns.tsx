import { Badge } from "@/components/ui/badge";

export const columns = [
  {
    accessorKey: "user.name",
    header: "User",
    meta: { width: "150px" },
  },
  {
    accessorKey: "status",
    header: "Status",
    meta: { width: "120px" },
    cell: ({ row }: any) => (
      <Badge
        className={`${
          row.original.status === "Inactive"
            ? "bg-[#FCE7F3] text-[#9D174D] font-light border border-[#F9A8D4]"
            : "bg-[#D1FAE5] text-[#0A681F] font-light border border-[#0A681F]"
        }`}
      >
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "subscription_package.name",
    header: "Plan",
    meta: { width: "150px" },
  },
  {
    accessorKey: "subscription_package.type",
    header: "Type",
    meta: { width: "150px" },
    // cell: ({ row }: any) => {
    //   return (
    //     <div className="flex items-center">
    //       <span
    //         className={`w-2 h-2 rounded-full inline-block mr-2 ${
    //           row.original.type === "Standard"
    //             ? "bg-[#22D3EE]"
    //             : row.original.type === "Premium"
    //             ? "bg-[#F87171]"
    //             : "bg-primary"
    //         }`}
    //       ></span>
    //       {row.getValue("type")}
    //     </div>
    //   );
    // },
  },
  {
    accessorKey: "id",
    header: "ID",
    meta: { width: "300px" },
  },
  {
    accessorKey: "subscription_package.price",
    header: "Price",
    meta: { width: "100px" },
    cell: ({ row }: any) => <div>${row.original.subscription_package.price}</div>,
  },
];
