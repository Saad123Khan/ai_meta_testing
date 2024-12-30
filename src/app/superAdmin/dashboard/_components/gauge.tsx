import React, { useState } from "react";
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface CustomGagueProps {
  value: number;
  gaugeColor: string;
  title: string;
}

const CustomGuage = ({ value, gaugeColor,title }: CustomGagueProps) => {
  const [series] = useState([76]);
  const [options] = useState<any>({
    chart: {
      type: "radialBar",
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#36434E",
          strokeWidth: "97%",
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: "#999",
            opacity: 1,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: "22px",
          },
        },
      },
    },
    grid: {
      padding: {
        top: -10,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
        colorStops: [
          {
            offset: 0,
            color: gaugeColor ,
            opacity: 1,
          },
        ],
      },
    },
    labels: ["Average Results"],
  });

  return (
    <div>
      <p className="text-center text-secondary-foreground text-[22px] font-semibold " >{title}</p>
      <div id="chart">
        <ReactApexChart options={options} series={[value]} type="radialBar" />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default CustomGuage;
