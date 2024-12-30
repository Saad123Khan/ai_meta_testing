import CustomInputField from "@/components/customInputField";
import CustomSelectField from "@/components/customSelectField";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { facebookOptimizationGoalOptions } from "@/lib/constant";
import { setAdds } from "@/store/slices/addSlice";
import React from "react";

interface PlatformField {
  platform: string;
  fields: {
    label: string;
    name: string;
    placeholder: string;
    type: string;
    cssClass: string;
    value: (data: any) => any; // Function to dynamically extract value from adds data
    handleChange: (value: any) => void;
    options?: any[];
  }[];
}

const RenderPlatformFields: React.FC<{ platform: string; forecast?: any }> = ({
  platform,
  forecast,
}) => {
  const dispatch = useAppDispatch();
  const { adds } = useAppSelector((state) => state.adds);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    dispatch(
      setAdds({
        ...adds,
        [name]: value,
      })
    );
  };

  const platformFieldsConfig: PlatformField[] = [
    {
      platform: "Google",
      fields: [],
    },
    {
      platform: "facebook",
      fields: [
        {
          label: "Billing Event",
          name: "billingEvent",
          placeholder: "Choose a billing event",
          type: "select", // Converted to dropdown
          cssClass:
            "bg-[#ffff] text-[#6B7280] border-none active:border-none rounded-[22px] p-5",
          value: (adds) => adds?.billingEvent,
          handleChange: (value: any) =>
            dispatch(setAdds({ ...adds, billingEvent: value })),
          options: [
            { value: "IMPRESSIONS", label: "Impressions" },
            { value: "CLICKS", label: "Clicks" },
            { value: "LINK_CLICKS", label: "Link Clicks" },
            { value: "PAGE_LIKES", label: "Page Likes" },
            { value: "POST_ENGAGEMENT", label: "Post Engagement" },
          ],
        },
        {
          label: "Bid Amount",
          name: "bidAmount",
          placeholder: "Enter bid amount",
          type: "text",
          cssClass:
            "bg-[#ffff] p-5 border-none shadow-md focus:ring-2 focus:ring-indigo-200 rounded-[22px]",
          value: (adds) => adds?.bidAmount,
          handleChange: handleChange,
        },
        // {
        //   label: "Optimization Goal",
        //   name: "optimizationGoal",
        //   placeholder: "Choose an optimization goal",
        //   type: "select", // Indicates a dropdown
        //   cssClass:
        //     "bg-[#ffff] text-[#6B7280] border-none active:border-none rounded-[22px] p-5",
        //   value: (adds) => adds?.optimizationGoal,
        //   handleChange: (value: any) => {
        //     const updatedAdds = { ...adds, optimizationGoal: value };
        //     dispatch(setAdds(updatedAdds));
        //     // forecast(updatedAdds);
        //   },
        //   options: facebookOptimizationGoalOptions,
        // },
      ],
    },
  ];

  const platformConfig = platformFieldsConfig.find(
    (p) => p.platform === platform
  );

  if (!platformConfig) {
    return <p>No fields available for {platform}</p>;
  }

  return (
    <>
      {platformConfig.fields.map((field, index) => {
        if (field.type === "select") {
          // Render dropdown
          return (
            <div className="mt-5">
              <CustomSelectField
                key={index}
                label={field.label}
                css={field.cssClass}
                placeholder={field.placeholder}
                value={field.value(adds)}
                options={field.options || []}
                onValueChange={field.handleChange}
              />
            </div>
          );
        } else {
          // Render input field
          return (
            <div className="mt-5">
              <CustomInputField
                key={index}
                label={field.label}
                name={field.name}
                css={field.cssClass}
                type={field.type}
                placeholder={field.placeholder}
                value={field.value(adds)}
                handleAdvanceChange={field.handleChange}
              />
            </div>
          );
        }
      })}
    </>
  );
};

export default RenderPlatformFields;
