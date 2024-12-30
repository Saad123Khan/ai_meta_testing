import Grid from "@mui/material/Grid2";
import React from "react";
import LineAreaChart from "./_components/lineAreaChart";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RadialBarChart from "./_components/radialBarChart";
import SalesmanStatusCard from "./_components/salesmanStatusCard";

const salesmanStatus = [
  {
    name: "Users",
    rate: "75.6K",
    growth: "+25%",
    icon: "/assets/accIcon.png",
    bgColor: "#3575FF",
  },
  {
    name: "Active",
    rate: "87.2K",
    growth: "+47%",
    icon: "/assets/timeIcon.png",
    bgColor: "#F36643",
  },
  {
    name: "Pending",
    rate: "26.3%",
    growth: "-28%",
    icon: "/assets/lineIcon.png",
    bgColor: "#4524F8",
  },
  {
    name: "Target",
    rate: "2m 18s",
    growth: "+13%",
    icon: "/assets/durationIcon.png",
    bgColor: "#24D6A5",
  },
];

const channelData = [
  { channel: "Direct", traffic: 60, value: "23.28%", color: "bg-purple-500" },
  { channel: "Direct", traffic: 80, value: "23.28%", color: "bg-orange-500" },
  { channel: "Direct", traffic: 40, value: "23.28%", color: "bg-green-500" },
];

type AnalyticsCardProps = {
  todayValue: number;
  expectedValue: number;
  progress: number;
  color: string;
};

const SalesmanDashboard = () => {
  const RadialChart = ({
    progress,
    color,
  }: {
    progress: number;
    color: string;
  }) => (
    <div className="relative w-16 h-16">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#eee"
          strokeWidth="3"
        />
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={`${progress}, 100`}
        />
      </svg>
    </div>
  );

  function AnalyticsCard({
    todayValue,
    expectedValue,
    progress,
    color,
  }: AnalyticsCardProps) {
    return (
      <Card>
        <CardContent className="p-6 flex justify-between items-center">
          <div className="">
            <p className="text-2xl text-secondary-foreground font-bold">
              {todayValue}
            </p>
            <p className="text-sm text-gray-500">Today</p>
          </div>
          <div className="w-16 h-16 relative">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E6E6E6"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeDasharray={`${progress}, 100`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold">{progress}%</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl text-secondary-foreground font-bold">
              {expectedValue}
            </p>
            <p className="text-sm text-gray-500">Expected </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <div className="bg-primary-color/80 p-2 rounded-[18px] ">
            <LineAreaChart />
          </div>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <div className="bg-primary-color/80 p-2 rounded-[18px] h-full ">
            <RadialBarChart />
          </div>
        </Grid>
      </Grid>
      {/*  */}
      <div className="mt-4">
        <Grid container spacing={2}>
          {/* Left column */}
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Status cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {salesmanStatus.map((item: any) => (
                <SalesmanStatusCard data={item} />
              ))}
            </div>

            {/* Daily Overview */}
            <div>
              <p className="text-[16px] mb-4 text-gray-700 font-semibold">
                Daily Overview
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AnalyticsCard
                  todayValue={5461}
                  expectedValue={8085}
                  progress={68}
                  color="#563BFF"
                />
                <AnalyticsCard
                  todayValue={140}
                  expectedValue={120}
                  progress={25}
                  color="#FF7049"
                />
              </div>
            </div>
          </Grid>

          {/* Right column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card className=" h-full ">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  User By Demo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 text-sm font-medium text-black">
                    <span>Channel</span>
                    <span>Traffic (%)</span>
                    <span className="text-right">Value</span>
                  </div>
                  {channelData.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 pt-5 items-center text-sm"
                    >
                      <span className="text-gray-700">{item.channel}</span>
                      <div className="col-span-1 pr-2">
                        <Progress
                          value={item.traffic}
                          className={`h-2 ${item.color}`}
                        />
                      </div>
                      <span className="text-right text-gray-700">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      {/*  */}

      {/* <Grid container spacing={2} sx={{ mt: 4 }}>
        {salesmanStatus.map((item: any) => (
          <Grid size={{ xs: 6, md: 2 }}>
            <SalesmanStatusCard data={item} />
          </Grid>
        ))}

        <Grid size={{ xs: 12, md: 4 }}>
          <Card className="w-full max-w-md bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                User By Demo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 text-sm font-medium text-gray-500">
                  <span>Channel</span>
                  <span>Traffic (%)</span>
                  <span className="text-right">Value</span>
                </div>
                {[
                  { color: "bg-purple-500", value: 60 },
                  { color: "bg-orange-500", value: 80 },
                  { color: "bg-green-500", value: 40 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 items-center text-sm"
                  >
                    <span className="text-gray-700">Direct</span>
                    <div className="col-span-1 pr-2">
                      <Progress
                        value={item.value}
                        className={`h-2 ${item.color}`}
                      />
                    </div>
                    <span className="text-right text-gray-700">23.28%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12}}>
          <p className="text-[16px] mt-2 text-secondary-foreground font-semibold ">
            Daily Overview
          </p>
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
              <AnalyticsCard
                todayValue={5461}
                expectedValue={8085}
                progress={68}
                color="#563BFF"
              />             
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
        <AnalyticsCard
                todayValue={140}
                expectedValue={120}
                progress={25}
                color="#FF7049"
              />            
        </Grid>
      </Grid> */}
    </div>
  );
};

export default SalesmanDashboard;
