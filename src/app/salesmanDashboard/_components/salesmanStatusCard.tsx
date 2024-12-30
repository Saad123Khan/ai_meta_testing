import React from "react";

interface SalesmanStatusCardProps {
  data: any;
}

const SalesmanStatusCard = ({ data }: SalesmanStatusCardProps) => {
  return (
    <div className="bg-primary-color/80 h-full rounded-[12px] pb-10 p-4">
      <div className="flex justify-start">
        <div className={`p-3 rounded-md bg-[${data.bgColor}]/30`  }>
          <img src={data.icon} />
        </div>
      </div>
      <div className="mt-8">
        <p className="text-[14px] text-[#5A5881] font-semibold ">{data?.name}</p>
        <p className="text-[22px] text-secondary-foreground font-semibold ">
          {data.rate}
        </p>
        <p className="text-[12px] text-[#5A5881] font-semibold ">{data.growth}</p>
      </div>
    </div>
  );
};

export default SalesmanStatusCard;
