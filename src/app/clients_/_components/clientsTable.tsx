"use client";

import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ClientTableProps {
  columns: any;
}


const rowData = [
    {
      name: "Annette Black",
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
      name: "Jacob Jones",
      status: "User Registered",
      type: "New",
      plan: "6 months",
      salesman: "peru",
    },
    {
      name: "Devon Lane",
      status: "User Registered",
      type: "New",
      plan: "3 months",
      salesman: "peruperu",
    },
  ];

const ClientsTable = () => {
  return (
    <div className="w-full mx-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#738DFE]/[0.56] border border-[#738DFE]/15 hover:bg-none ">
            <TableHead className="w-[200px] text-left rounded-tl-lg font-semibold border border-[#738DFE]/15 text-black">
              Name
            </TableHead>
            <TableHead className="text-black border font-semibold  border-[#738DFE]/15 text-left">
              Status
            </TableHead>
            <TableHead className="text-black border  font-semibold border-[#738DFE]/15 text-left">
              Type
            </TableHead>
            <TableHead className="text-black border font-semibold  border-[#738DFE]/15 text-left">
              Plan
            </TableHead>
            <TableHead className="text-black border rounded-tr-lg font-semibold  border-[#738DFE]/15 text-left">
              Salesman
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rowData.map((row: any) => (
            <TableRow
              key={row.name}
              className="text-left bg-[#fff]/[0.60] border border-[#738DFE]/15"
            >
              <TableCell className=" text-primary-foreground border border-[#738DFE]/15 ">
                {row.name}
              </TableCell>
              <TableCell className=" text-primary-foreground border border-[#738DFE]/15 ">
                {row.status}
              </TableCell>
              <TableCell className=" text-primary-foreground border border-[#738DFE]/15 ">
                {row.type}
              </TableCell>
              <TableCell className=" text-primary-foreground border border-[#738DFE]/15 ">
                {row.plan}
              </TableCell>
              <TableCell className=" text-primary-foreground border border-[#738DFE]/15 ">
                {row.salesman}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientsTable;
