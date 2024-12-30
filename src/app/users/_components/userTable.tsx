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
  { platforms: "Google", adrun: 36, adtotal: 50 },
  { platforms: "Facebook", adrun: 16, adtotal: 50 },
  { platforms: "Instagram", adrun: 46, adtotal: 50 },
  { platforms: "Tiktok", adrun: 66, adtotal: 50 },
  { platforms: "Twitter", adrun: 26, adtotal: 50 },
  { platforms: "Youtube", adrun: 56, adtotal: 50 },
];

const UserTable = () => {
    const totalAdRun = rowData.reduce((sum, row) => sum + row.adrun, 0)
    const totalAdTotal = rowData.reduce((sum, row) => sum + row.adtotal, 0)
    const totalPercentage = (totalAdRun / totalAdTotal) * 100
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Table >
        <TableHeader>
          <TableRow className="bg-[#738DFE]/[0.53] hover:bg-none ">
            <TableHead className="w-[200px] text-center rounded-tl-lg text-white">Platforms</TableHead>
            <TableHead className="text-white text-center border border-primary-color">Ad run</TableHead>
            <TableHead className="text-white text-center rounded-tr-lg">Edit Ad</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rowData.map((row) => (
            <TableRow key={row.platforms} className="bg-[#738DFE]/[0.43]">
              <TableCell className=" text-primary-color ">{row.platforms}</TableCell>
              <TableCell className="text-primary-color border border-primary-color " >
                <div className="flex items-center space-x-2">
                  <Progress
                    value={(row.adrun / row.adtotal) * 100}
                    className="w-[60%]"
                  />
                  <span>{((row.adrun / row.adtotal) * 100).toFixed(2)}%</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <span className="text-[#FF1111] cursor-pointer">Edit</span>
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-[#738DFE]/[0.53]">
            <TableCell className="font-medium rounded-bl-lg  text-white">Total</TableCell>
            <TableCell className="text-right border border-primary-color" >
              {/* <div className="flex items-center space-x-2"> */}
                <span className="text-white ">
                  {totalPercentage.toFixed(2)}%
                </span>
              {/* </div> */}
            </TableCell>
            <TableCell className="text-right  rounded-br-lg  "></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
