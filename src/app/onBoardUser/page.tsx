import CustomInputField from "@/components/customInputField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

function OnBoardUser() {
  return (
    <div>
      <div className="">
        <p className="text-2xl font-bold text-secondary-foreground">OnBoard User</p>
      </div>

      <div className="mt-2 flex justify-center ">
       
      <Card className="w-[40%] bg-primary-color/80">
          <CardContent className="flex flex-col h-[520px]">
            <CardHeader className="px-0">
              <CardTitle className="text-center">
                <p className="text-xl text-secondary-foreground">Registration Form</p>
                <p className="text-sm text-muted-foreground">
                  Fill out the form to send the Registration link to user
                </p>
              </CardTitle>
            </CardHeader>
            <div className="grid gap-4 flex-grow">
              <div className="grid">
                <CustomInputField
                  css="bg-[#fff] border-none p-4 rounded-[16px]"
                  type="text"
                  placeholder="Enter Name"
                  label="Name"
                  labelCss="text-[16px]"
                />
              </div>
              <div className="grid">
                <CustomInputField
                  css="bg-[#fff] border-none p-4 rounded-[16px]"
                  type="text"
                  placeholder="Enter Email"
                  label="Email"
                  labelCss="text-[16px]"
                />
              </div>
              <div className="grid">
                <CustomInputField
                  css="bg-[#fff] border-none p-4 rounded-[16px]"
                  type="text"
                  placeholder="Enter plan"
                  label="Plan"
                  labelCss="text-[16px]"
                />
              </div>
            </div>
            <div className="flex justify-end mt-auto">
              <Button
                className="bg-[#002EF6] rounded-[17px] px-12 hover:bg-blue-700 text-white"
                type="submit"
              >
                Send Link
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default OnBoardUser;
