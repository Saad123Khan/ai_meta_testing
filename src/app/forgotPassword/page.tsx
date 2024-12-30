"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StartupLoader from "@/components/startupLoader";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { swalPopUp } from "@/lib/helper";
import { useMutation } from "@tanstack/react-query";
import apis from "@/services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { format } from "path/posix";
import Head from "next/head";
interface ForgotFormData {
  email: string;
}

export default function page() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ForgotFormData>({
    defaultValues: {
      email: "",
    },
  });
// Get the email value from the form using the watch function
const email = watch("email");
  // Mutation hook to handle forgot password API call
  const { mutate, isPending }: any = useMutation({
    mutationFn: apis.forgot,
    onSuccess: ({ data }: { data: { success: boolean; message: string } }) => {
      if (data?.success) {
     
        swalPopUp("success", "OTP sent!", "success");

        // // Redirect to OTP/verification page after successful email submission
        // // Assuming you need to send the email in the URL (change as per your API response)
        setTimeout(() => {
          router.push(`/verify-otp/${email}`);
        }, 2000);
      }
    },
    onError: (error: any) => {
      swalPopUp("Error", error.message, "error");
      console.log("Error in forgot password", error);
    },
  });

  // Handle form submission
  const onSubmitHandler = async (val: ForgotFormData) => {
    mutate(val);

  };

  // const onChangeHandler = (e: any) => {
  //   const { id, value } = e.target;
  //   // Custom logic, if needed
  //   // This is usually managed by react-hook-form, so this might not be necessary
  // };

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
      {loading ? (
        <StartupLoader onFinish={() => setLoading(false)} />
      ) : (
        <div className="flex min-h-screen bg-primary-color overflow-hidden">
          <div className="flex-1 p-8 flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="w-full">
                <Tabs>
                  <TabsList className="grid w-full grid-cols-2 mb-8 bg-transparent">
                    <TabsTrigger
                      value="forgot"
                      className="relative text-[30px] leading-none !shadow-none font-bold text-primary underline underline-offset-8"
                    >
                      Forgot Password
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div>
                  {/* Use react-hook-form to handle form submission */}
                  <form
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmitHandler)}
                    className="space-y-4"
                  >
                    <div>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="email"
                            className="rounded-[22px] p-5 shadow-sm"
                            type="email"
                            placeholder="example@gmail.com"
                            required
                          />
                        )}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-[12px] ml-2">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <Button type="submit" className="w-full text-primary-color">
                      {isPending ? "Loading..." : "Continue"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
