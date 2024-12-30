"use client";

import { Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "../ui/separator";

const data = [
  { month: "Jan", price: 30000 },
  { month: "Feb", price: 10000 },
  { month: "Mar", price: 20000 },
  { month: "Apr", price: 30000 },
  { month: "May", price: 40000 },
  { month: "Jun", price: 50000 },
  { month: "Jul", price: 40000 },
  { month: "Aug", price: 30000 },
  { month: "Sep", price: 20000 },
  { month: "Oct", price: 10000 },
  { month: "Nov", price: 5000 },
  { month: "Dec", price: 15000 },
];

const CustomChart = () => {
  return (
    <Card className="w-full bg-primary-color p-4 md:p-6">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <CardTitle className="text-lg md:text-xl">Revenue</CardTitle>
          <p className="text-sm md:text-base text-[#6C7172] mt-2 md:mt-0">
            Year 2020
          </p>
        </div>
        <Separator orientation="horizontal" className="my-4" />
      </CardHeader>
      <CardContent>
        <div className="w-full h-[200px] sm:h-[250px] md:h-[300px]">
          <ChartContainer
            config={{
              price: {
                label: "Price per Month",
                color: "#738DFE",
              },
            }}
            className="w-full h-full"
          >
            <LineChart data={data} width={undefined} height={undefined}>
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10 }}
                className="text-xs"
              />
              <YAxis
                tickFormatter={(value) => `${value / 1000}k`}
                ticks={[0, 10000, 30000, 50000]}
                domain={[0, 50000]}
                tick={{ fontSize: 10 }}
                className="text-xs"
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="price"
                strokeWidth={2}
                activeDot={{
                  r: 8,
                }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomChart;
