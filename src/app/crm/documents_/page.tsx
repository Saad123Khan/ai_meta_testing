"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import CustomSelectField from "@/components/customSelectField";
import CustomTable from "@/components/customTable";
import { Button } from "@/components/ui/button";
import { documentColumns } from "./columns/columns";
import AddDocumentModal from "./_components/addDocumentModal";

const rowData = [
  {
    id: "Facebook ad",
    status: "Enabled",
    user: "Cody Fisher",
    conversionRate: 1,
    revenue: "Standard",
    conversion: "9400101093613003113",
  },
  {
    id: "59213",
    status: "Disabled",
    user: "Kristin Watson",
    conversionRate: 2,
    revenue: "Priority",
    conversion: "9400101093613003113",
  },
  {
    id: "59219",
    status: "Draft",
    user: "Esther Howard",
    conversionRate: 12,
    revenue: "Express",
    conversion: "9400101093613003113",
  },
  {
    id: "59220",
    status: "Approved",
    user: "Jenny Wilson",
    conversionRate: 22,
    revenue: "Express",
    conversion: "9400101093613003113",
  },
  {
    id: "59223",
    status: "Pending",
    user: "John Smith",
    conversionRate: 32,
    revenue: "Express",
    conversion: "9400101093613003113",
  },
  {
    id: "592182",
    status: "Pending",
    user: "Cameron Williamson",
    conversionRate: 41,
    revenue: "Express",
    conversion: "9400101093613003113",
  },
];

const Documents = () => {
  const [dialog, setDialog] = useState(false);

  const handleCreateAdClick = () => {
    setDialog(true);
  };
  return (
    <div>
      <AddDocumentModal open={dialog} onClose={() => setDialog(false)} />
      <div>
        <p className="text-2xl font-bold text-secondary-foreground">Document</p>
      </div>
      <div className="mt-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between">
              <div className="w-[400px]">
                <CustomSelectField
                  placeholder={"Select Documents"}
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
              <CustomTable data={rowData} columns={documentColumns} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Documents;
