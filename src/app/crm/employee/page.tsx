"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import CustomSelectField from "@/components/customSelectField";
import CustomTable from "@/components/customTable";
import { Button } from "@/components/ui/button";
import AddEmployeeModal from "./_components/addEmployeeModal";
// import { employeeColumns } from "./columns/columns";
import { useQuery } from "@tanstack/react-query";
import apis from "@/services";
import { ApiResponse } from "@/types/apiResponse";
import StartupLoader from "@/components/startupLoader";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";

const Employee = () => {
  const [dialog, setDialog] = useState(false);
  const [type, setType] = useState("Create");
  const [employeeData, setEmployeeData] = useState({});

  const employeeColumns = [
    {
      accessorKey: "id",
      header: "Employee Id",
      meta: { width: "150px" },
    },
    {
      accessorKey: "status",
      header: "Status",
      width: 120,
      meta: { width: "120px" },
      cell: ({ row }: any) => {
        return (
          <Badge
            className={`${row.original.status === "Enabled"
              ? "bg-[#DBEAFE] text-[#1E40AF] font-light border border-[#93C5FD]"
              : row.original.status === "Disabled"
                ? "bg-[#FCE7F3] text-[#9D174D] font-light border border-[#F9A8D4]"
                : row.original.status === "Approved"
                  ? "bg-[#D1FAE5] text-[#1E40AF] font-light border border-[#6EE7B7]"
                  : row.original.status === "Pending"
                    ? "bg-[#FEF3C7] text-[#1E40AF] font-light border border-[#FCD34D]"
                    : "bg-[#F3F4F6] text-[#1F2937] font-light border border-[#D1D5DB]"
              }`}
          >
            {row.getValue("status") ?? "Active"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "crm_role",
      header: "ROLE",
      meta: { width: "200px" },
    },
    {
      accessorKey: "name",
      header: "NAME",
      meta: { width: "150px" },
    },
    {
      accessorKey: "department_id",
      header: "DEPARTMENT",
      meta: { width: "250px" },
    },
    {
      accessorKey: "edit",
      header: "EDIT",
      meta: { width: "100px" },
      cell: ({ row }: any) => (
        <button className="edit-btn">
          <Edit
            onClick={() => {
              setType("Edit")
              setEmployeeData({ name: row.getValue("name"), id: row.getValue("id") });
              setDialog(true)
            }}
          />
        </button>
      ),
    },
  ];

  const handleCreateAdClick = () => {
    setDialog(true);
    setType("Create");
  };

  const {
    data: rowData,
    error: errors,
    refetch,
    isPending,
  }: any = useQuery({
    queryKey: ["getEmployeeInfo"],
    queryFn: async (): Promise<ApiResponse<any>> => {
      const response = await apis.getEmployee();
      return response.data;
    },
  });
  // console.log(packages?.data?.data,"aa");

  return (
    <div>
      <AddEmployeeModal setType={setType} employeeData={employeeData} type={type} refetch={refetch} open={dialog} onClose={() => setDialog(false)} />
      <div className="mt-3" >
        <p className="text-2xl font-bold text-secondary-foreground">
          Employee Management
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
                    placeholder={"Select Employee"}
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
                <CustomTable data={rowData?.data?.data || []} pagination={true} columns={employeeColumns} />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Employee;
