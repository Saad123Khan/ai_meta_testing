"use client"
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const PieChart = () => {
  const [series] = useState([44, 55, 13, 43, 22]);

  const [options] = useState<any>({
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="pie" width={320} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default PieChart;
