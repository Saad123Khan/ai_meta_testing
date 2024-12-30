"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import CustomTable from "@/components/customTable";
import { attendanceColumn } from "./columns/columns";
import { Button } from "@/components/ui/button";
import CustomDateRangePicker from "@/components/customDateRangePicker";
import { Card, CardContent } from "@/components/ui/card";
import AutocompleteSelect from "@/components/customAutoComplete";
import AddAttendanceModal from "./_components/addAttendanceModal";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/types/apiResponse";
import apis from "@/services";

// const rowData = [
//   {
//     date: "16/09/24",
//     name: "Abubakar Alghazali",
//     day: "Wednesday",
//     checkInTime: "9:00 AM",
//     checkOutTime: "6:00 PM",
//     status: "Present",
//     onTimeStatus: "On Time",
//   },
//   {
//     date: "16/09/24",
//     name: "Muhammad Imran",
//     day: "Wednesday",
//     checkInTime: "9:00 AM",
//     checkOutTime: "6:00 PM",
//     status: "Present",
//     onTimeStatus: "On Time",
//   },
//   {
//     date: "16/09/24",
//     name: "Rabi",
//     day: "Wednesday",
//     checkInTime: "---------",
//     checkOutTime: "---------",
//     status: "Absent",
//     onTimeStatus: "---------",
//   },
//   {
//     date: "16/09/24",
//     name: "Wajahat",
//     day: "Wednesday",
//     checkInTime: "---------",
//     checkOutTime: "---------",
//     status: "Leave",
//     onTimeStatus: "---------",
//   },
// ];

const StaffAttendance = () => {
  const [attendanceModal, setAttendanceModal] = useState(false);

  const {
    data: rowData,
    error: errors,
    refetch,
    isPending,
  }: any = useQuery({
    queryKey: ["getEmployeeInfo"],
    queryFn: async (): Promise<ApiResponse<any>> => {
      const response = await apis.getStaffAttendance();
      return response.data;
    },
  });
  return (
    <>
      <AddAttendanceModal
        open={attendanceModal}
        onOpenChange={setAttendanceModal}
      />
      <div className="mt-4">
        <div className="w-full flex justify-between">
          <div>
            <p className="text-2xl font-bold text-secondary-foreground">
              Staff Attendance
            </p>
          </div>
          <div className="flex items-center">
            <div className="mr-2">
              <CustomDateRangePicker
                // selected={selected}
                // onSelect={setSelected} 
                />
            </div>
            <div className="mr-2 w-[200px] ">
              <AutocompleteSelect
                placeholder={"Days Filter"}
                // label={"Select countries where you are advertising"}
                // labelCss="text-[13px] mb-1 text-[#6A6A6A]"
                css={"bg-[#ffff] text-[#6B7280] w-full rounded-[22px] p-2"}
                options={[
                  { value: "all", label: "Pakistan" },
                  { value: "banana", label: "India" },
                  { value: "blueberry", label: "UAE" },
                  { value: "grapes", label: "UK" },
                  { value: "pineapple", label: "US" },
                ]}
              />
            </div>
            <div className="mr-2 w-[200px] ">
              <AutocompleteSelect
                placeholder={"Staff Filter"}
                // label={"Select countries where you are advertising"}
                // labelCss="text-[13px] mb-1 text-[#6A6A6A]"
                css={"bg-[#ffff] text-[#6B7280] w-full rounded-[22px] p-2"}
                options={[
                  { value: "all", label: "Pakistan" },
                  { value: "banana", label: "India" },
                  { value: "blueberry", label: "UAE" },
                  { value: "grapes", label: "UK" },
                  { value: "pineapple", label: "US" },
                ]}
              />
            </div>
          </div>
        </div>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-end">
                  <Button
                    onClick={() => setAttendanceModal(true)}
                    className="text-primary-color "
                  >
                    Add Manual Attendance
                  </Button>
                </div>
                <div className="mt-3">
                  <CustomTable
                    data={rowData?.data?.data || []}
                    pagination={true}
                    columns={attendanceColumn}
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

export default StaffAttendance;
