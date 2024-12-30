"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Search,
  TrendingDown,
  TrendingUp,
  Twitter,
  Youtube,
} from "lucide-react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Grid from "@mui/material/Grid2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function CrmDashboard() {
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        data: [30, 25, 35, 28, 32, 28, 33],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: ["Linux", "Mac", "Ios", "Windows", "Android", "Other"],
    datasets: [
      {
        data: [50, 10, 20, 30, 10, 40],
        backgroundColor: [
          "#95A4FC",
          "#BAEDBD",
          "#1C1C1C",
          "#B1E3FF",
          "#A8C5DA",
          "#A1E3CB",
        ],
      },
    ],
  };

  const pieChartData = {
    labels: ["HR", "Marketing", "Graphic", "Sales"],
    datasets: [
      {
        data: [10, 10, 10, 70],
        backgroundColor: ["#95A4FC", "#BAEDBD", "#1C1C1C", "#B1E3FF"],
      },
    ],
  };

  return (
    <div className="">
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-[16px] border-none bg-primary-color/80 ">
          <CardContent className="p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">
                  Total Revenue
                </p>
                <h3 className="text-2xl mt-2 font-semibold">$50,000</h3>
              </div>
              <div className="flex items-center gap-1 text-sm text-green-500">
                +11.02%
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[16px] border-none bg-primary-color/80 ">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Total Order</p>
                <h3 className="text-2xl mt-2  font-semibold">120+</h3>
              </div>
              <div className="flex items-center gap-1 text-sm text-red-500">
                -0.03%
                <TrendingDown className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[16px] border-none bg-primary-color/80 ">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">
                  Active Employee
                </p>
                <h3 className="text-2xl mt-2  font-semibold">50+</h3>
              </div>
              <div className="flex items-center gap-1 text-sm text-green-500">
                +12.03%
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[16px] border-none bg-primary-color/80 ">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">
                  Attendance Rate
                </p>
                <h3 className="text-2xl mt-2  font-semibold">95%</h3>
              </div>
              <div className="flex items-center gap-1 text-sm text-red-500">
                -4.02%
                <TrendingDown className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Grid container spacing={2} sx={{mt:6}} >
        <Grid size={{ xs: 12, md: 8 }}>
          <Card className="">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Total Users</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Total Projects</span>
                    <span>Operating Status</span>
                    <span className="flex items-center gap-1">
                      This year
                      <ArrowRight className="h-4 w-4" />
                      Last year
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-[300px]">
                <Line
                  data={lineChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card className="h-full">
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-semibold">Traffic by Website</h3>
              <div className="space-y-4 mt-6">
                {[
                  { label: "Google", value: "2.4k" },
                  { label: "Youtube", value: "2.4k" },
                  { label: "Instagram", value: "1.5k" },
                  { label: "Pinterest", value: "1.5k" },
                  { label: "Facebook", value: "1.1k" },
                  { label: "Twitter", value: "0.9k" },
                ].map(({label, value }) => (
                  <div
                    key={label}
                    className="flex items-center pb-2 "
                  >
                    <div className="flex items-center gap-2">
                      <span>{label}</span>
                    </div>
                    <div className="flex ml-3 items-center gap-2">
                      {/* <span>{value}</span> */}
                      <div className="h-2 w-24 rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{
                            width: `${(parseInt(value) / 2400) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Employee Trends</h3>
            <div className="h-[300px]">
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
        <Card className="">
          <CardContent className="p-6 ">
            <h3 className="mb-4 text-lg font-semibold">Department</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-[200px]">
                <Pie
                  data={pieChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              </div>
              <div className="space-y-2">
                {pieChartData.labels.map((label, index) => (
                  <div
                    key={label}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor:
                            pieChartData.datasets[0].backgroundColor[index],
                        }}
                      />
                      <span className="text-sm">{label}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {pieChartData.datasets[0].data[index]}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
