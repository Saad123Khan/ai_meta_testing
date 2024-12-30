"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import CustomTable from "@/components/customTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => (
      <span className="capitalize">{row.getValue("status")}</span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "plan",
    header: "Plan",
  },
  {
    accessorKey: "salesman",
    header: "Salesman",
  },
  {
    accessorKey: "badge",
    header: "Badge",
    meta: { width: "120px" },
    cell: ({ row }: any) => {
      return (
        <Badge
          className={
            "bg-[#FEF3C7] hover:bg-[#FEF3C7] cursor-pointer text-[#1E40AF] font-light border border-[#FCD34D]"
          }
        >
          Change Brand
        </Badge>
      );
    },
  },
];

const rowData = [
  {
    name: " Black",
    status: "User Registered",
    type: "New",
    plan: "3 months",
    salesman: "peru",
  },

  {
    name: "Marvin McKinney",
    status: "Onboard",
    type: "Old",
    plan: "3 months",
    salesman: "peru",
  },
  {
    name: "Courtney Henry",
    status: "Onboard",
    type: "Old",
    plan: "12 months",
    salesman: "peru",
  },
  {
    name: "Marvin McKinney",
    status: "Onboard",
    type: "Old",
    plan: "3 months",
    salesman: "peru",
  },
  {
    name: "Courtney Henry",
    status: "Onboard",
    type: "Old",
    plan: "12 months",
    salesman: "peru",
  },
  {
    name: "Marvin McKinney",
    status: "Onboard",
    type: "Old",
    plan: "3 months",
    salesman: "peru",
  },
  {
    name: "Courtney Henry",
    status: "Onboard",
    type: "Old",
    plan: "12 months",
    salesman: "peru",
  },
];

const PageInfoModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] flex flex-col">
        <ScrollArea className="flex-grow">
          <div className="p-6">
            <CustomTable data={rowData} columns={columns} pagination={true} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PageInfoModal;
