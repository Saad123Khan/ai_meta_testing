"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import CustomTable from "@/components/customTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { leavesRequestColumns } from "./columns/column";

const rowData = [
    {
      staffName: "Muhammad Ismail",
      noOfDays: 5,
      fromDate: "2022-01-01",
      toDate: "2022-01-05",
      reason: "Vacation",
      status: "Pending",
    },
    {
      staffName: "Kamran",
      noOfDays: 3,
      fromDate: "2022-02-01",
      toDate: "2022-02-03",
      reason: "Sick Leave",
      status: "Approved",
    },
  ];
  
const StaffLeavesRequest = () => {
  const [leavesModal, setLeavesModal] = useState(false);
  return (
    <>
      <div className="mt-4">
        <div className="w-full flex justify-between">
          <div>
            <p className="text-2xl font-bold text-secondary-foreground">
              Staff Leaves Request
            </p>
          </div>
        </div>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent className="p-4">
                <div className="mt-3">
                  <CustomTable
                    data={rowData}
                    pagination={true}
                    columns={leavesRequestColumns}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default StaffLeavesRequest;
