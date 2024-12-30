"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { swalPopUp } from "@/lib/helper";
import apis from "@/services";
import { useMutation } from "@tanstack/react-query";
import Head from "next/head";
import { useParams, useRouter } from "next/navigation";
import React, { useState, FormEvent, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import OtpInput from "react18-input-otp";

// Define the type for the response from the OTP API (you can refine it based on your actual response)
interface OtpResponse {
  success: boolean;
  message: string;
}

interface ForgotFormData {
  email: string;
}

const Page: React.FC = () => {
  const router = useRouter();
  const { email } = useParams<{ email: string }>(); // This retrieves the email from the URL params
  const [emailOTP, setEmailOTP] = useState<string>("");

  const [isForgotPassword, setIsForgotPassword] = useState(false); // Flag to check the flow (signup or forgot password)

  // Default form hook for ForgotPassword data (optional based on your case)
  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<ForgotFormData>({
    defaultValues: {
      email: email,
    },
  });


  const { mutate, isPending }:any = useMutation<{success: boolean;message: string;} ,Error, { email: string; otp: string }>({
    mutationFn: apis.otp, 
    onSuccess: (data) => {
      if (data?.success) {  
        
        swalPopUp("success", "OTP Verified successfully!", "success");
        if (isForgotPassword) {
          // Only navigate to update-password page if it is the "forgot password" flow
          router.push(`/update-password/${email}`);
        }
      } else {
        swalPopUp("Error", "OTP verification failed", "error");
      }
    },
    onError: (error) => {
      swalPopUp("Error", error.message, "error");
      console.log("Error in OTP verification", error);
    },
  });

  const onSubmitHandler = (data: ForgotFormData) => {
    const decodedEmail = email ? decodeURIComponent(email) : data.email;
    if (!decodedEmail) {
      console.error("Email is undefined.");
      return;
    }

    // Ensure OTP length is correct before verifying
    if (emailOTP?.length === 6) {
      mutate({ email: decodedEmail, otp: emailOTP });
      // router.push(`/update-password/${decodedEmail}`);

    } else {
      swalPopUp("Error", "Please enter a valid OTP", "error");
    }
  };

  // New mutation for resend OTP
  const resendOtpMutation:any = useMutation({
    mutationFn: apis.otpResend, 
    onSuccess: (data:any) => {
      if (data?.success) {
        swalPopUp("success", "OTP resent successfully!", "success");
      } else {
        swalPopUp("Error", "Failed to resend OTP.", "error");
      }
    },
    onError: (error:any) => {
      swalPopUp("Error", error.message, "error");
    },
  });

  const handleResendOTP = () => {
    if (email) {
      const decodedEmail = decodeURIComponent(email);
      resendOtpMutation.mutate({ email: decodedEmail });
    } else {
      console.error("Email is undefined.");
    }
  };

  useEffect(() => {
    if (email && window.location.pathname.includes("forgot-password")) {
      setIsForgotPassword(true); 
    }
  }, [email]);

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
     <div className="flex min-h-screen overflow-hidden">
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full max-w-md">
          <div className="w-full flex items-center justify-center">
          
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <br />
              
                <h1 className="relative ms-4 text-[30px] leading-none !shadow-none font-bold text-primary underline underline-offset-8">Verify Otp</h1>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <OtpInput
                    value={emailOTP}
                    onChange={setEmailOTP}
                    numInputs={6}
                    isInputNum={true}
                    className="h-[56px] mx-[16px] my-[2rem] text-[2rem] rounded-[4px] border-none"
                  />
                )}
              />

              <Button type="submit" className="w-full text-primary-color">
                {isPending ? "Loading..." : "Verify"}
              </Button>

              <p className="mt-4">
                <span>Did not receive the code?</span>
                <span
                  onClick={handleResendOTP}
                  className="cursor-pointer ml-4 text-blue-500"
                >
                  Resend
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default Page;
