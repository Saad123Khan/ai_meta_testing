"use client";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import apis from "@/services";
import { swalPopUp } from "@/lib/helper";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Head from "next/head";

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
  email:string;
}

interface resetResponse {
  success: boolean;
  message: string;
}

const page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { email } = useParams<{ email: string }>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();

  const router = useRouter();

  // Mutation setup
  const { mutate, isPending }:any = useMutation({
    mutationFn: apis.resetPassword,
    onSuccess: (data:any) => {
      if (data?.success) {
        swalPopUp("Password Reset Successfully", "", "success");
        router.push("/auth");
      }
    },
    onError: (error:any) => {
      swalPopUp(error.message, "", "error");
      console.log("Error in password reset:", error);
    },
  });

  // Form submission handler
  const onSubmitHandler = async (val: ResetPasswordFormData) => {
    // Add the email from URL to the form data
    const payload = {
      ...val, // form data (password and password_confirmation)
      email: email, // Add the email to the payload
    };

    mutate(payload);
  };

  return (
    <>
    <Head>
      <title>AI</title>
      <meta property="og:title" content="Majai" />
      <meta
        property="og:description"
        content="AI marketing"
      />
       <meta
        property="og:image:secure"
        content="https://app.majai.se/assets/logo.webp"
      />
      <meta property="og:image" content="https://app.majai.se/assets/logo.webp"/>
      <meta property="og:url" content="https://majai.se" />
      <meta property="og:type" content="website" />
    </Head>
    <div className="flex min-h-screen bg-primary-color overflow-hidden">
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Tabs className="w-full">
          <TabsList className="mb-8  bg-transparent">
            <TabsTrigger
              value="Update Password"
              className="relative ms-4 text-[30px] leading-none !shadow-none font-bold text-primary underline underline-offset-8"
              
            >
              Update Password
            </TabsTrigger>
          </TabsList>
          </Tabs>
          <form
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitHandler)}
            className="space-y-4"
          >
            {/* Password Input */}
            <div className="relative">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    required
                    className="rounded-[22px] p-5 shadow-sm"
                  />
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeIcon className="h-4 w-4 text-gray-500" />
                ) : (
                  <EyeOffIcon className="h-4 w-4 text-gray-500" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <Controller
                name="password_confirmation"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="password_confirmation"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    required
                    className="rounded-[22px] p-5 shadow-sm"
                  />
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeIcon className="h-4 w-4 text-gray-500" />
                ) : (
                  <EyeOffIcon className="h-4 w-4 text-gray-500" />
                )}
              </button>
              {errors.password_confirmation && (
                <p className="text-red-500 text-xs">
                  {errors.password_confirmation.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full text-primary-color">
              {isPending ? "Loading..." : "Continue"}
            </Button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default page;
