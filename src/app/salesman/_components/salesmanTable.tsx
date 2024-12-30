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

const rowData = [
  {
    active: "1",
    inActive: 11,
    new: 50,
    target: 22,
    usedbysalesman: 55,
    total: 122,
  },
  {
    active: "2",
    inActive: 13,
    new: 60,
    target: 32,
    usedbysalesman: 33,
    total: 133,
  },
];

const SalesTable = () => {
  //   const totalAdRun = rowData.reduce((sum, row) => sum + row.adrun, 0);
  //   const totalAdTotal = rowData.reduce((sum, row) => sum + row.adtotal, 0);
  //   const totalPercentage = (totalAdRun / totalAdTotal) * 100;
  return (
    <div className="w-full mx-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#738DFE]/[0.56] border border-primary hover:bg-none ">
            <TableHead className="w-[200px] text-center  font-semibold border border-primary text-white">
              Active
            </TableHead>
            <TableHead className="text-white border font-semibold  border-primary text-center">
              In Active
            </TableHead>
            <TableHead className="text-white border  font-semibold border-primary text-center">
              New
            </TableHead>
            <TableHead className="text-white border font-semibold  border-primary text-center">
              Target
            </TableHead>
            <TableHead className="text-white border font-semibold  border-primary text-center">
              Used by salesman
            </TableHead>
            <TableHead className="text-white border font-semibold  border-primary text-center">
              Total
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rowData.map((row) => (
            <TableRow
              key={row.active}
              className="text-center bg-[#738DFE]/[0.56] border border-primary"
            >
              <TableCell className=" text-primary-color border border-primary ">
                {row.active}
              </TableCell>
              <TableCell className=" text-primary-color border border-primary ">
                {row.inActive}
              </TableCell>
              <TableCell className=" text-primary-color border border-primary ">
                {row.new}
              </TableCell>
              <TableCell className=" text-primary-color border border-primary ">
                {row.target}
              </TableCell>
              <TableCell className=" text-primary-color border border-primary ">
                {row.usedbysalesman}
              </TableCell>
              <TableCell className=" text-primary-color border border-primary ">
                {row.total}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     
    </div>
  );
};

export default SalesTable;
