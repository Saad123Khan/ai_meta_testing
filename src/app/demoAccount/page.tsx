"use client"

import CustomInputField from "@/components/customInputField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { swalPopUp } from "@/lib/helper";
import apis from "@/services";
import { ApiResponse } from "@/types/apiResponse";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface demoUser {
  name: string;
  email: string;
  password: string;
  plan_id: string;
}

function DemoAccount() {

  const [customUser, setCustomUser] = useState<demoUser>({
    name: "",
    email: "",
    password: "",
    plan_id: "",
  });

  const demoUserSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(8).required("Password is required"),
    plan_id: yup.string().required("Plan is required"),
  });

  const defaultCustomUser: demoUser = {
    name: "",
    email: "",
    password: "",
    plan_id: "",
  };

  const {
    control: customUserControl,
    handleSubmit: handleUserSubmit,
    formState: { errors: CustomUserErrors },
    reset,
  } = useForm<demoUser>({
    defaultValues: defaultCustomUser,
    mode: "onBlur",
    resolver: yupResolver(demoUserSchema),
  });


  const { mutate: mutateDemoUser, isPending: isPendingUser }: any = useMutation(
    {
      mutationFn: apis.createDemoAccount,
      onSuccess: ({
        data,
      }: {
        data: { success: boolean; message: string };
      }) => {
        if (data?.success) {
          reset(defaultCustomUser);
          swalPopUp("Demo User", "User Created Successfully", "success");
        }
      },
      onError: (error: any) => {
        console.log(error.response.data.errors, "error.response.data.errors")
        if (error.response?.data?.errors) {
          const errorMessages = Object.entries(error.response.data.errors)
            .map(([key, messages]: any) => `${messages.join(", ")}`)
            .join("\n");
          console.log(errorMessages, "errorMessages")
          swalPopUp("Error", errorMessages, "error");
        } else if (error.response?.data?.message) {
          swalPopUp("Error", "", error.response.data.message);
        } else {
          swalPopUp("Error", "", error.message || "An unknown error occurred.");
        }
      },
    }
  );

  const onUserSubmitHandler = (val: any) => {
    mutateDemoUser({ ...val, plan_id: Number(val?.plan_id) });
    // mutateDemoUser(val);
  };

  const onCustomUserChangeHandler = (e: any, field: any) => {
    const { id, value } = e.target;
    setCustomUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    field.onChange(value);
  }

  // fetch subscription
  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: ["getSubs"],
    queryFn: async (): Promise<any> => {
      const response = await apis.getSubscription();
      return response.data;
    },
  });


  return (
    <div>
      <div className="">
        <p className="text-2xl font-bold text-secondary-foreground">Demo Account</p>
      </div>

      <div className="mt-2 flex justify-center ">
        <Card className="w-[40%] bg-primary-color/80 " >
          <CardContent className="" >
            <CardHeader className="">
              <CardTitle className="text-center">
                <p className="text-xl font-semibold text-secondary-foreground">Demo Account</p>
                <p className="text-sm text-muted-foreground">
                  Fill out the form to send the Demo Account link to user
                </p>
              </CardTitle>
            </CardHeader>
            <div className="grid gap-3 py-4">

              <form
                onSubmit={handleUserSubmit(onUserSubmitHandler)}
                className="flex flex-col w-full gap-5"
              >
                <div className="grid">
                  <Controller
                    name="name"
                    control={customUserControl}
                    render={({ field }: any) => (
                      <CustomInputField
                        {...field}
                        handleAdvanceChange={(e: any) => onCustomUserChangeHandler(e, field)}
                        css={"bg-[#fff] border-none p-5 rounded-[18px]"}
                        labelCss={"text-16px "}
                        type={"text"}
                        placeholder={"Enter Name"}
                        label="Name"
                      />
                    )}
                  />
                  {CustomUserErrors.name && (
                    <p className="text-red-500 text-[12px] ml-2">
                      {CustomUserErrors.name.message}
                    </p>
                  )}
                </div>

                <div className="grid">
                  <Controller
                    name="email"
                    control={customUserControl}
                    render={({ field }: any) => (
                      <CustomInputField
                        {...field}
                        handleAdvanceChange={(e: any) => onCustomUserChangeHandler(e, field)}
                        css={"bg-[#fff] border-none p-5 rounded-[18px]"}
                        labelCss={"text-16px "}
                        type={"text"}
                        placeholder={"Enter Email"}
                        label="Email"
                      />
                    )}
                  />
                  {CustomUserErrors.email && (
                    <p className="text-red-500 text-[12px] ml-2">
                      {CustomUserErrors.email.message}
                    </p>
                  )}
                </div>

                {/* <div className="grid">
                  <Controller
                    name="plan_id"
                    control={customUserControl}
                    render={({ field }: any) => (
                      <CustomInputField
                        {...field}
                        handleAdvanceChange={(e: any) => onCustomUserChangeHandler(e, field)}
                        css={"bg-[#fff] border-none p-5 rounded-[18px]"}
                        labelCss={"text-16px "}
                        type={"text"}
                        placeholder={"Enter plan"}
                        label="plan"
                      />
                    )}
                  />
                  {CustomUserErrors.plan_id && (
                    <p className="text-red-500 text-[12px] ml-2">
                      {CustomUserErrors.plan_id.message}
                    </p>
                  )}
                </div> */}


                <div className="grid">
                  {/* Department Dropdown */}
                  <label>Plan</label>
                  <Controller
                    name="plan_id"
                    control={customUserControl}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="bg-[#fff] border-none p-5 rounded-[18px]"
                      >
                        <option value="" disabled>
                          {isLoadingUser
                            ? "Loading Departments..."
                            : "Select Plan"}
                        </option>
                        {userData?.data?.data?.map((user: any) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {CustomUserErrors.plan_id && (
                    <p className="text-red-500 text-[12px] ml-2">
                      {CustomUserErrors.plan_id.message}
                    </p>
                  )}
                </div>

                <div className="grid  ">
                  <Controller
                    name="password"
                    control={customUserControl}
                    render={({ field }: any) => (
                      <CustomInputField
                        {...field}
                        handleAdvanceChange={(e: any) => onCustomUserChangeHandler(e, field)}
                        css={"bg-[#fff] border-none p-5 rounded-[18px]"}
                        labelCss={"text-16px "}
                        type={"text"}
                        placeholder={"Enter Password"}
                        label="Password"
                      />
                    )}
                  />
                  {CustomUserErrors.password && (
                    <p className="text-red-500 text-[12px] ml-2">
                      {CustomUserErrors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex justify-end ">
                  <Button
                    disabled={isPendingUser}
                    className=" bg-[#002EF6] rounded-[18px] px-8 hover:bg-blue-700 text-white"
                    type="submit"
                  >

                    {isPendingUser ? "Loading" : "Send Link"}
                  </Button>
                </div>
              </form>
            </div>
            {/* button */}
          </CardContent>
        </Card>
      </div>
    </div >
  );
}

export default DemoAccount;
