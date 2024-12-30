"use client";
import CustomInputField from "@/components/customInputField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import PricingCard from "./_components/pricingCard";
import CustomTextArea from "@/components/customTextArea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/types/apiResponse";
import apis from "@/services";
import StartupLoader from "@/components/startupLoader";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { swalPopUp } from "@/lib/helper";

interface SubscriptionCardData {
  name: string;
  period: string;
  price: string;
  type: string;
  details: string;
}

function CustomSubscription() {
  const [createPackage, setCreatePackage] = useState<any>(false);
  const [CustomCardData, setCustomCardData] = useState<SubscriptionCardData>({
    name: "",
    period: "",
    price: "",
    type: "",
    details: "",
  });


  const customCardSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    period: yup.string().required("Duration is required"),
    price: yup.string().required("Price is required"),
    type: yup.string().required("Type is required"),
    details: yup.string().required("Details is required"),
  });

  const defaultCustomCard: SubscriptionCardData = {
    name: "",
    period: "",
    price: "",
    type: "",
    details: "",
  };

  const {
    control: customCardControl,
    handleSubmit: handleCustomCardSubmit,
    formState: { errors: CustomCardErrors },
  } = useForm<SubscriptionCardData>({
    defaultValues: defaultCustomCard,
    mode: "onBlur",
    resolver: yupResolver(customCardSchema),
  });

  const { mutate: mutateCard, isPending: isPendingCreatingCard }: any = useMutation(
    {
      mutationFn: apis.createSubscriptionPackage,
      onSuccess: ({
        data,
      }: {
        data: { success: boolean; message: string };
      }) => {
        if (data?.success) {
          setCreatePackage(false)
          swalPopUp("Subscription Package List", "Subscription Created Successfully", "success");
          // setActiveTab("login");
        }
      },
      onError: (error: any) => {
        console.log(error.response.data.errors,"error.response.data.errors")
        if (error.response?.data?.errors) {
          const errorMessages = Object.entries(error.response.data.errors)
            .map(([key, messages]:any) => `${messages.join(", ")}`)
            .join("\n");
            console.log(errorMessages,"errorMessages")
           swalPopUp("Error", errorMessages, "error");
        } else if (error.response?.data?.message) {
          swalPopUp("Error", "", error.response.data.message);
        } else {
          swalPopUp("Error", "", error.message || "An unknown error occurred.");
        }
      },
    }
  );

  const onCustomCardSubmitHandler = (val: any) => {
    mutateCard(val);
  };

  const onCustomCardChangeHandler = (e: any, field: any) => {
    const { id, value } = e.target;
    // Custom logic, if needed
    setCustomCardData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    // Call field.onChange to ensure React Hook Form handles the state
    field.onChange(value);
  };

  const {
    data: packages,
    error: errors,
    isPending,
  }: any = useQuery({
    queryKey: ["getPageInfo"],
    queryFn: async (): Promise<ApiResponse<any>> => {
      const response = await apis.getSubscription();
      return response.data;
    },
  });

  console.log(packages, "packagespackages")
  return (
    <>
      {createPackage ? (
        <div className="p-3">
          <div className="">
            <p className="text-2xl font-bold text-primary-foreground">
              Custom Subscription
            </p>
          </div>

          {/* Cards */}
          <div className="mt-3" >
            <Card className="bg-primary-color/90 p-3 rounded-[22px] ">
              <CardContent>
                <Grid container sx={{ mt: 2 }}>
                  <form
                    onSubmit={handleCustomCardSubmit(onCustomCardSubmitHandler)}
                    className="flex flex-col w-full gap-5"
                  >
                    <Grid size={{ md: 12 }} className="md:flex gap-5">
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                          name="name"
                          control={customCardControl}
                          render={({ field }: any) => (
                            <CustomInputField
                              {...field}
                              label="Package Name"
                              css={"bg-[#ffff] p-6 border-none rounded-[22px]"}
                              type={"text"}
                              placeholder={"Enter name"}
                              // required
                              handleAdvanceChange={(e: any) => onCustomCardChangeHandler(e, field)}
                            />
                          )}
                        />
                        {CustomCardErrors.name && (
                          <p className="text-red-500 text-[12px] ml-2">
                            {CustomCardErrors.name.message}
                          </p>
                        )}
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                          name="type"
                          control={customCardControl}
                          render={({ field }: any) => (
                            <CustomInputField
                              {...field}
                              label="Package Type"
                              css={"bg-[#ffff] p-6 border-none rounded-[22px]"}
                              type={"text"}
                              placeholder={"Type of package"}
                              // required
                              handleAdvanceChange={(e: any) => onCustomCardChangeHandler(e, field)}
                            />
                          )}
                        />
                        {CustomCardErrors.type && (
                          <p className="text-red-500 text-[12px] ml-2">
                            {CustomCardErrors.type.message}
                          </p>
                        )}
                      </Grid>
                    </Grid>


                    <Grid size={{ md: 12 }} className="md:flex gap-5">
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                          name="price"
                          control={customCardControl}
                          render={({ field }: any) => (
                            <CustomInputField
                              {...field}
                              label="Package Price"
                              css={"bg-[#ffff] p-6 border-none rounded-[22px]"}
                              type={"text"}
                              placeholder={"Enter the price of the package"}
                              // required
                              handleAdvanceChange={(e: any) => onCustomCardChangeHandler(e, field)}
                            />
                          )}
                        />
                        {CustomCardErrors.price && (
                          <p className="text-red-500 text-[12px] ml-2">
                            {CustomCardErrors.price.message}
                          </p>
                        )}
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                          name="period"
                          control={customCardControl}
                          render={({ field }: any) => (
                            <CustomInputField
                              {...field}
                              label="Package duration"
                              css={"bg-[#ffff] p-6 border-none rounded-[22px]"}
                              type={"text"}
                              placeholder={"Enter package duration"}
                              // required
                              handleAdvanceChange={(e: any) => onCustomCardChangeHandler(e, field)}
                            />
                          )}
                        />
                        {CustomCardErrors.period && (
                          <p className="text-red-500 text-[12px] ml-2">
                            {CustomCardErrors.period.message}
                          </p>
                        )}
                      </Grid>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <Controller
                        name="details"
                        control={customCardControl}
                        render={({ field }: any) => (
                          <CustomTextArea
                            {...field}
                            css={
                              "bg-[#ffff] border-none text-[#6B7280] rounded-[16px] p-2"
                            }
                            placeholder={"Write here"}
                            label="Package Description"
                            // required
                            handleAdvanceChange={(e: any) => onCustomCardChangeHandler(e, field)}
                          />
                        )}
                      />
                      {CustomCardErrors.details && (
                        <p className="text-red-500 text-[12px] ml-2">
                          {CustomCardErrors.details.message}
                        </p>
                      )}
                    </Grid>

                    {/* <Grid size={{ xs: 12, md: 6 }}>
                      <p className="text-[14px] font-semibold md:mt-6 mb-2">
                        Apply Discount
                      </p>
                      <RadioGroup
                        value={selectedValue}
                        onValueChange={handleChange}
                        className="flex"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            className={`${selectedValue === "Yes" ? "bg-primary" : ""
                              }`}
                            value="Yes"
                            id="r1"
                          />
                          <Label htmlFor="r1">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            className={`${selectedValue === "No" ? "bg-primary" : ""
                              }`}
                            value="No"
                            id="r2"
                          />
                          <Label htmlFor="r2">No</Label>
                        </div>
                      </RadioGroup>
                    </Grid> */}

                    <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'end', mt: 13 }} >
                      <Button
                        disabled={isPendingCreatingCard}
                        className="bg-[#002EF6] pl-8 pr-8 text-primary-color rounded-[18px] "
                      >
                        {isPendingCreatingCard ? "Loading" : "Create Package"}
                      </Button>
                    </Grid>
                  </form>
                </Grid>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="p-3">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-secondary-foreground">Packages</p>
            <Button
              onClick={() => setCreatePackage(true)}
              className="bg-secondary text-primary-color "
            >
              Create new
            </Button>
          </div>

          {/* Cards */}
          <div>
            {isPending ? (
              <>
                <StartupLoader onFinish={() => { }} />
              </>
            ) : (
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {packages?.data?.data.map((item: any, key: any) => (
                  <Grid size={{ xs: 12, md: 3 }}>
                    <PricingCard data={item} key={key} />
                  </Grid>
                ))}
              </Grid>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CustomSubscription;
