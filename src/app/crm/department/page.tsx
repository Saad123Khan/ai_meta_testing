"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import CustomSelectField from "@/components/customSelectField";
import CustomTable from "@/components/customTable";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import apis from "@/services";
import { ApiResponse } from "@/types/apiResponse";
import StartupLoader from "@/components/startupLoader";
import AddDepartmentModal from "./_components/addDepartmentModal";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";


const Deparment = () => {
  const [dialog, setDialog] = useState(false);
  const [type, setType] = useState("Create");
  const [departmentData, setDepartmentData] = useState({});
  console.log(departmentData, "departmentDatadepartmentData")
  const departmentColumns = [
    {
      accessorKey: "id",
      header: "Department Id",
      meta: { width: "150px" },
    },
    {
      accessorKey: "name",
      header: "Name",
      meta: { width: "200px" },
    },
    {
      accessorKey: "edit",
      header: "EDIT",
      meta: { width: "100px" },
      cell: ({ row }: any) => (
        <button className="edit-btn">
          <Edit onClick={() => {
            setType("Edit")
            setDepartmentData({ name: row.getValue("name"), id: row.getValue("id") });
            setDialog(true)
          }}
          />
        </button>
      ),
    },
  ];

  const handleCreateAdClick = () => {
    setType("Create");
    setDialog(true);
  };

  const {
    data: rowData,
    error: errors,
    isPending,
    refetch,
  }: any = useQuery({
    queryKey: ["getEmployeeInfo"],
    queryFn: async (): Promise<ApiResponse<any>> => {
      const response = await apis.getEmployeeDepartment();
      return response.data;
    },
  });
  // console.log(packages?.data?.data,"aa");

  return (
    <div>
      <AddDepartmentModal setType={setType} departmentData={departmentData} type={type} refetch={refetch} open={dialog} onClose={() => setDialog(false)} />
      <div className="mt-3" >
        <p className="text-2xl font-bold text-secondary-foreground">
          Department
        </p>
      </div>
      <div className="mt-3">
        {isPending ? (
          <>
            <StartupLoader onFinish={() => { }} />
          </>
        ) : (
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between">
                <div className="w-[400px]">
                  <CustomSelectField
                    placeholder={"Select Department"}
                    options={[
                      { value: "apple", label: "Bisham" },
                      { value: "banana", label: "Saad" },
                      { value: "blueberry", label: "Asharib" },
                      { value: "grapes", label: "Mustafa" },
                      { value: "pineapple", label: "Ali" },
                    ]}
                    css={"bg-[#ffff] text-[#6B7280] rounded-[22px] p-2"}
                  />
                </div>
                <div>
                  <Button
                    onClick={handleCreateAdClick}
                    className="bg-secondary px-6 rounded-[16px] text-primary-color ml-2"
                  >
                    Add new
                  </Button>
                </div>
              </div>

              <div className="mt-5">
                <CustomTable data={rowData?.data?.data || []} columns={departmentColumns} pagination={true} />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Deparment;
