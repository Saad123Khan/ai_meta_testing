"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import CustomTable from "@/components/customTable";
import { Button } from "@/components/ui/button";
import CustomDateRangePicker from "@/components/customDateRangePicker";
import CustomSelectField from "@/components/customSelectField";
import { Card, CardContent } from "@/components/ui/card";
import AutocompleteSelect from "@/components/customAutoComplete";
import { LeavesColumns } from "./columns/column";
import AddStaffLeaves from "./_components/addLeaves";

const rowData = [
  {
    type: "Vacation",
    quantity: 5,
    description: "Lorem Ipsum",
  },
  {
    type: "Sick",
    quantity: 3,
    description: "Lorem Ipsum",
  },
  {
    type: "Personal",
    quantity: 2,
    description: "Lorem Ipsum",
  },
];

const StaffLeaves = () => {
  const [leavesModal, setLeavesModal] = useState(false);
  return (
    <>
      <AddStaffLeaves
        open={leavesModal}
        onOpenChange={setLeavesModal}
      />
      <div className="mt-4">
        <div className="w-full flex justify-between">
          <div>
            <p className="text-2xl font-bold text-secondary-foreground">
              Staff Leaves List
            </p>
          </div>
        </div>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-end">
                  <Button
                    onClick={() => setLeavesModal(true)}
                    className="text-primary-color "
                  >
                    Add Leaves
                  </Button>
                </div>
                <div className="mt-3">
                  <CustomTable
                    data={rowData}
                    pagination={true}
                    columns={LeavesColumns}
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

export default StaffLeaves;
