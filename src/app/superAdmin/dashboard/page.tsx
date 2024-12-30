"use client";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import CustomAdvertisementCard from "@/components/customAdvertisementCard";
import CustomGauge from "./_components/gauge";
import CustomBarChart from "./_components/barChart";

const platform = [
  {
    name: "Google Ads",
    icon: "/assets/Ellipse 1698.png",
    spend: 25,
    total: 100,
  },
  {
    name: "Facebook Ads",
    icon: "/assets/Ellipse 1699.png",
    spend: 55,
    total: 100,
  },
  {
    name: "Instagram Ads",
    icon: "/assets/Ellipse 1697.png",
    spend: 85,
    total: 100,
  },
];

const SuperAdminDashboard = () => {
  return (
    <div>
      <p className="text-2xl font-bold text-secondary-foreground">Dashboard</p>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {platform.map((item: any) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <CustomAdvertisementCard cardData={item} />
          </Grid>
        ))}
      </Grid>

      <div className="mt-3">
        <p className="text-2xl font-bold text-secondary-foreground">Revenue</p>
        <div className="bg-primary-color/70 p-5 mt-3 rounded-[22px]">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <CustomGauge
                value={50}
                title={"Ad spent"}
                gaugeColor={"#002EF6"}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <CustomGauge
                value={30}
                title={"Total ads"}
                gaugeColor={"#738DFE"}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <CustomGauge
                value={80}
                title={"Total Revenue"}
                gaugeColor={"#F1DEFE"}
              />
            </Grid>
            <Grid
              size={{ xs: 12, md: 6, lg: 3 }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderLeft: 3,
                pl: 4,
                borderLeftColor: "#0077FF",
              }}
            >
              <div className="flex justify-center items-center flex-col">
                <p className="text-[44px] font-semibold text-secondary-foreground">
                  3.78
                </p>
                <p className="text-[14px] text-secondary-foreground">
                  Total Tasks
                </p>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>

      <div className="mt-3 bg-primary-color/80 rounded-[16px] p-2">
        <CustomBarChart />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
