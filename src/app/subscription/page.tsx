"use client"
import Grid from "@mui/material/Grid2";
import React from "react";
import SubscriptionCard from "./_components/subscriptionCard";
import { Card } from "@/components/ui/card";
import CustomTable from "@/components/customTable";
import { columns } from "./columns/columns";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/types/apiResponse";
import apis from "@/services";
import StartupLoader from "@/components/startupLoader";

const Subscription = () => {
  // const rowData = [
  //   {
  //     user: "User 1",
  //     status: "Active",
  //     plan: "1 Year",
  //     type: "Standard",
  //     id: "9400101093613003113",
  //     price: 10,
  //   },
  //   {
  //     user: "User 2",
  //     status: "Active",
  //     plan: "2 Year",
  //     type: "Standard",
  //     id: "9400101093613003113",
  //     price: 70,
  //   },
  //   {
  //     user: "User 3",
  //     status: "Active",
  //     plan: "7 Months",
  //     type: "Standard",
  //     id: "9400101093613003113",
  //     price: 311,
  //   },
  //   {
  //     user: "User 4",
  //     status: "Inactive",
  //     plan: "3 Months",
  //     type: "Premium",
  //     id: "9400101093613003113",
  //     price: 80,
  //   },
  //   {
  //     user: "User 5",
  //     status: "Inactive",
  //     plan: "8 Months",
  //     type: "Premium",
  //     id: "9400101093613003113",
  //     price: 170,
  //   },
  //   {
  //     user: "User 6",
  //     status: "Active",
  //     plan: "3 Months",
  //     type: "Basic",
  //     id: "9400101093613003113",
  //     price: 70,
  //   },
  //   {
  //     user: "User 7",
  //     status: "Active",
  //     plan: "6 Months",
  //     type: "Basic",
  //     id: "9400101093613003113",
  //     price: 80,
  //   },
  //   {
  //     user: "User 8",
  //     status: "Active",
  //     plan: "3 Months",
  //     type: "Basic",
  //     id: "9400101093613003113",
  //     price: 40,
  //   },
  // ];

  const subs = [
    { subscribers: 166, subscribeType: "Total Subscribers" },
    { subscribers: 150, subscribeType: "Active Subscribers" },
    { subscribers: 20, subscribeType: "Cancelled Subscribers" },
  ];

  // get user subscription
  const {
    data: rowData,
    error: errors,
    isPending,
    refetch,
  }: any = useQuery({
    queryKey: ["getEmployeeInfo"],
    queryFn: async (): Promise<ApiResponse<any>> => {
      const response = await apis.getUserSubscriptions();
      return response.data;
    },
  });



  // get subscription stats
  const {
    data: dashboardAnalytics,
    error: statsErrors,
    // isPending,
    // refetch,
  }: any = useQuery({
    queryKey: ["getSubcriptionInfo"],
    queryFn: async (): Promise<ApiResponse<any>> => {
      const response = await apis.getSubscriptionStats();
      return response.data;
    },
  });
  const transformedArray = dashboardAnalytics?.data ? Object.entries(dashboardAnalytics?.data).map(([key, value]) => ({
    type: key.charAt(0).toLocaleUpperCase() + key.slice(1),
    value: value,
  })): [];
  return (
    <div>
      <div className="">
        <p className="text-2xl font-bold text-secondary-foreground">Subscription</p>
      </div>
      {isPending ? (
        <>
          <StartupLoader onFinish={() => { }} />
        </>
      ) : (
        <><Grid container spacing={2} sx={{ mt: 2 }}>
          {transformedArray?.map((item: any) => (
            <Grid size={{ xs: 4 }}>
              <SubscriptionCard data={item} />
            </Grid>
          ))}
        </Grid>
          <div className="mt-5">
            <p className="text-2xl font-bold text-secondary-foreground">Details</p>
          </div>
          <div className="mt-5">
            <Card className=" bg-primary-color/80 p-2 rounded-[15px] ">
              <div className="flex justify-between p-2">
                <p className="text-[20px] ">Total Users</p>
                <p className="text-[20px] ">{rowData?.data?.total || 0}</p>
              </div>
              <div className="mt-2">
                <CustomTable data={rowData?.data?.data || []} columns={columns} pagination={true}/>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Subscription;
