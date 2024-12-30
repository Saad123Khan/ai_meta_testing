"use client";

import { Avatar, Box, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CustomInputField from "@/components/customInputField";
import { extractDate, swalConfirmPopUp, swalPopUp } from "@/lib/helper";
import CustomModal from "@/components/customModal";
import PaymentModal from "./_Components/paymentModal";
import PersonalInfoModal from "./_Components/personalInfoModal";
import { useAppSelector } from "@/hooks/useRedux";
import apis from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Globe, Mail, User } from "lucide-react";
import Head from "next/head";

const Settings = () => {
  const [isPaymentModal, setIsPaymentModal] = useState(false);
  const [isPersonalInfoModal, setIsPersonalInfoModal] = useState(false);
  const [activePlan, setActivePlan] = useState<any>({});
  // const selectedBrand = useAppSelector((state) => state.selectedBrand.brand);

  const subscriptionInfo = useAppSelector(
    (state) => state.user.user
  ).subscription_package;

  const getUserInfo = useAppSelector((state) => state.user.user);

  console.log("getUserInfo", getUserInfo);

  const { mutate: cancelPlan, isPending: cancelPlanPending }: any = useMutation(
    {
      mutationFn: apis.CancelSubscription,
      onSuccess: ({
        data,
      }: {
        data: {
          data: any;
          status: boolean;
          message: string;
        };
      }) => {
        if (data?.status) {
          swalPopUp("Success", "Subscription Cancelled", "success");
        }
      },
      onError: (error: any) => {
        swalPopUp(error.message, "error", error.message);
        console.log("Error in cancelling subscription", error);
      },
    }
  );
  const { mutate: getActivePlan, isPending }: any = useMutation({
    mutationFn: apis.activeSubscription,
    onSuccess: ({
      data,
    }: {
      data: {
        data: any;
        status: boolean;
        message: string;
      };
    }) => {
      setActivePlan(data.data);
      // if (data?.status) {
      //   swalPopUp("Success", "Subscription Cancelled", "success");
      // }
    },
    onError: (error: any) => {
      swalPopUp(error.message, "error", error.message);
      console.log("Error in cancelling subscription", error);
    },
  });

  // const { data, isPending, isError, error } = useQuery({
  //   queryKey: ["subscription-packages-active"],
  //   queryFn: async () => {
  //     try {
  //       const response = await apis.activeSubscription();
  //       if (response.data) {
  //         return response.data.data.data;
  //       } else {
  //         throw new Error("Invalid data format");
  //       }
  //     } catch (err) {
  //       throw err;
  //     }
  //   },
  // });

  const handleCancelSubscription = () => {
    const formData = {
      user_id: getUserInfo.id,
    };
    swalConfirmPopUp(
      "Are you sure?",
      "Do you really want to cancel subscription?",
      "warning",
      {
        showCancelButton: true,
        confirmButtonText: "Yes, Cancel",
        cancelButtonText: "Cancel",
        onConfirm: () => cancelPlan(formData),
        onCancel: () =>
          swalPopUp("Cancelled", "Subscription not cancelled", "info"), // Optional cancel feedback
      }
    );
  };

  useEffect(() => {
    const formData = {
      user_id: getUserInfo.id,
    };
    getActivePlan(formData);
  }, []);

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
 
    <div>
      <PaymentModal open={isPaymentModal} onOpenChange={setIsPaymentModal} />
      <PersonalInfoModal
        open={isPersonalInfoModal}
        onOpenChange={setIsPersonalInfoModal}
      />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 12 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              "@media (max-width: 550px)": {
                flexDirection: "column",
                alignItems:"start",
                gap:"10px"
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                // className="blur"
                variant="rounded"
                src={"/assets/Foto Devon Lane.png"}
                sx={{ width: 70, height: 70 }}
              />
              <Box sx={{ ml: 2 }}>
                <p>Devon Lane</p>
                <p className="text-[12px]">alexarawles@gmail.com</p>
              </Box>
            </Box>
            <Box className='flex gap-2'>
              <Button
                onClick={() => (window.location.href = '/manage-my-data')}
                className="w-40 bg-[#5000FF] text-primary-color rounded-2xl"
              >
                {"Manage My Data"}
              </Button>
              <Button
                onClick={() => setIsPersonalInfoModal(true)}
                className="w-20 bg-[#5000FF] text-primary-color rounded-2xl"
              >
                {"Edit"}
              </Button>
            </Box>
          </Box>
        </Grid>

      </Grid>

      <Grid container spacing={2} sx={{ mt: 4 }} >
        <Grid size={{ xs: 12 }}>
          <p className="text-[#37474F] text-[20px] ">
            Personal Information
          </p>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <User />
            <div style={{ marginLeft: "15px" }}>
              <p
                className="text-[15px] font-semibold text-[#37474F] "
              >
                Full Name
              </p>
              <p className="text-[15px] text-[#4c4e64de] ">
                {getUserInfo.name || 'N/A'}
              </p>
            </div>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Mail />
            <div style={{ marginLeft: "15px" }}>
              <p
                className="text-[15px] font-semibold text-[#37474F] "
              >
                Email
              </p>
              <p
                className="text-[15px] text-[#4c4e64de] "
              >
                {getUserInfo.email || 'N/A'}
              </p>
            </div>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Globe />
            <div style={{ marginLeft: "15px" }}>
              <p
                className="text-[15px] font-semibold text-[#37474F] "

              >
                Country
              </p>
              <p
                className="text-[15px] font-semibold text-[#4c4e64de] "
              >
                {getUserInfo.country || 'N/A'}
              </p>
            </div>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <User />
            <div style={{ marginLeft: "15px" }}>
              <p

                className="text-[15px] font-semibold text-[#37474F] "
              >
                Gender
              </p>
              <p
                className="text-[15px] font-semibold text-[#37474F] "
              >
                {getUserInfo.gender || 'N/A'}
              </p>
            </div>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <p className="text-black text-xl mt-5">Current Plan</p>
          {!getUserInfo.active_subscription ? (
            <Card
              sx={{
                mt: 2,
                borderRadius: 3,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
            >
              <CardContent>
                <p>No Active Plan</p>
              </CardContent>
            </Card>
          ) : (
            <Card
              sx={{
                mt: 2,
                borderRadius: 3,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p className="text-black text-md font-bold">
                    {subscriptionInfo.name}
                  </p>
                  <p
                    onClick={handleCancelSubscription}
                    className="text-[#F60606] text-xs cursor-pointer "
                  >
                    Cancel Subscription
                  </p>
                </Box>
                <Box>
                  <p className="text-sm text-[#9E9D9D]">
                    {subscriptionInfo.details}
                  </p>
                  <p className="text-md text-secondary mt-1">
                    Valid:
                    {/* <span className="text-sm ml-2">
                      {extractDate(
                        activePlan?.subscription?.current_period_start
                      )}{" "}
                      to{" "}
                      {extractDate(
                        activePlan?.subscription?.current_period_end
                      )}
                    </span> */}
                  </p>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <p className="text-xl text-secondary ">
                    ${subscriptionInfo.price}
                    <span className="text-sm ml-2">
                      /{subscriptionInfo.period}
                    </span>
                  </p>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className="text-black text-xl mt-5">Payment Methods</p>

            <Button
              onClick={() => setIsPaymentModal(true)}
              className="w-20 bg-[#5000FF] text-primary-color rounded-2xl"
            >
              Edit
            </Button>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card
            sx={{
              mt: 2,
              borderRadius: 3,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p className="text-black text-md font-bold">Visa Card</p>
              </Box>
              <Box>
                <p className="text-sm text-[#9E9D9D]">
                  **** **** **** 1234 Exp: 12/23
                </p>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
    </>
  );
};

export default Settings;
