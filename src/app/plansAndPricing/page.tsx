"use client";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button } from "@/components/ui/button";
import CountDownTimer from "@/components/countDownTimer";
import PricingCarousel from "@/components/pricingCarousel";
import { useEffect, useState } from "react";
import { ArrowBigLeftIcon } from "lucide-react";
import apis from "@/services";
import { useQuery } from "@tanstack/react-query";
import StartupLoader from "@/components/startupLoader";
import PaymentModal from "../settings/_Components/paymentModal";
import CheckoutForm from "../stripe/CheckoutForm";

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from "@stripe/react-stripe-js";
import { getNextMonthSameDate } from "@/lib/helper";
import Head from "next/head";
// const packages = [
//   {
//     price: 54,
//     duration: "3 Months",
//     info: "Advanced tools to take your work to the next level.",
//     features: [
//       "Multi-step Zaps",
//       "Unlimited Premium",
//       "50 Users team",
//       "Shared Workspace",
//     ],
//   },
//   {
//     price: 14,
//     duration: "6 Months",
//     info: "Unleash the power of automation.",
//     features: [
//       "Multi-step Zaps",
//       "Unlimited Premium",
//       "50 Users team",
//       "Shared Workspace",
//     ],
//   },
//   {
//     price: 34,
//     duration: "3 Months",
//     info: "Automation plus enterprise-grade features.",
//     features: [
//       "Multi-step Zaps",
//       "Unlimited Premium",
//       "50 Users team",
//       "Shared Workspace",
//     ],
//   },
//   {
//     price: 74,
//     duration: "12 Months",
//     info: "Unleash the power of automation.",
//     features: [
//       "Multi-step Zaps",
//       "Unlimited Premium",
//       "50 Users team",
//       "Shared Workspace",
//     ],
//   },
//   {
//     price: 57,
//     duration: "3 Months",
//     info: "Automation plus enterprise-grade features.",
//     features: [
//       "Multi-step Zaps",
//       "Unlimited Premium",
//       "50 Users team",
//       "Shared Workspace",
//     ],
//   },
//   {
//     price: 97,
//     duration: "6 Months",
//     info: "Advanced tools to take your work to the next level.",
//     features: [
//       "Multi-step Zaps",
//       "Unlimited Premium",
//       "50 Users team",
//       "Shared Workspace",
//     ],
//   },
// ];
const promise = loadStripe("pk_test_51HWS0PC2ulEqsTvP7J7S4GGg40mF1s8UsLA98Wbq0XHJqdF7n7Dyn5vCce5UNSFpcC9ghx6FEga0n65wj06w8d3h00oUxgkZgP");
const PlansAndPricing = () => {
  const [choosePlan, setChoosePlan] = useState(false);
  const [planData, setPlanData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [isPaymentModal, setIsPaymentModal] = useState(false);

  const { data, isPending, isError, error } :any= useQuery({
    queryKey: ["subscription-packages"], // Query key as part of the object
    queryFn: async () => {
      try {
        const response = await apis.getSubscriptionPackages(); // API call
        if (response.data) {
          return response.data.data.data; // Return the packages array if valid
        } else {
          throw new Error("Invalid data format"); // Throw error if the data format is incorrect
        }
      } catch (err) {
        throw err; // Ensure that the error is properly re-thrown for `useQuery` to catch
      }
    },
  });

  console.log("Packages", planData);

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
      {isPending ? (
        <StartupLoader onFinish={() => setLoading(false)} />
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <Grid size={{ xs: 12, md: 10 }}>
            <Card
              sx={{
                background: "rgba(255, 255, 255, 0.25)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                borderRadius: 8,
                border: "1px solid rgba(255, 255, 255, 0.18)",
              }}
            >
              <CardContent>
                <Box sx={{ p: 3 }}>
                  <p
                    className="text-primary font-semibold text-lg"
                    gutterBottom
                    component="div"
                    sx={{ fontSize: 16 }}
                  >
                    OUR PACKAGES
                  </p>
                  <p
                    variant="body2"
                    className="text-primary-foreground"
                    sx={{ mt: -1 }}
                  >
                    Manage your account details billings and accounts
                  </p>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Card sx={{ background: "#082296", borderRadius: 6 }}>
                    <CardContent>
                      <Grid sx={{display:'flex',justifyContent:'space-between', alignItems:'center'}}>
                      <Box sx={{width:'30%'}}>
                        <p
                          className="text-primary-color text-sm"
                          gutterBottom
                          sx={{ fontSize: 16, }}
                        >
                          50% discounts on all the packages at the end of the year
                        </p>
                      </Box>
                      <Box>
                          <CountDownTimer />
                      </Box>
                      <Box><Button className="w-15 bg-[#5000FF] text-primary-color">Claim Discounts</Button></Box>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
              </CardContent>
            </Card>
          </Grid> */}

            <Grid size={{ xs: 12, md: 10 }}>
              <p className="text-[28px] text-secondary-foreground ">
                Plans & Pricing{" "}
              </p>
              <p className="text-[#9E9D9D] text-[14px] ">
                Whether your time-saving automation needs are large or small,
                we’re here to help you scale.
              </p>
            </Grid>
            {!choosePlan ? (
              <Grid size={{ xs: 12, md: 10 }}>
                <PricingCarousel
                  setPlanData={setPlanData}
                  setChoosePlan={setChoosePlan}
                  data={data}
                />
              </Grid>
            ) : (
              <Grid size={{ xs: 12, md: 10 }}>
                <Card className="bg-[#231D4F] rounded-[12px] p-2 text-primary-color relative">
                  <CardContent>
                    <div>
                      {/* head */}
                      <div>
                        <div className="flex mb-4">
                        <ArrowBigLeftIcon size={20}/>
                        <p
                          className="font-semibold underline underline-offset-1 cursor-pointer"
                          onClick={() => setChoosePlan(false)}
                        >
                          Change Plan
                        </p>
                       
                        </div>
                        <p className="text-[26px] ">
                          ${planData?.price}{" "}
                          <span className="text-[20px]"> /month ({planData?.name})</span>
                        </p>
                      </div>
                      <div className="mt-3">
                        <p className="text-[20px]">{planData?.duration}</p>
                        <p className="text-[14px]">
                        {planData?.details}
                        </p>
                      </div>
                      <div className="mt-3">
                        <ul className="space-y-2 text-[12px] ">
                          {planData?.features?.map((feature: any, idx: any) => (
                            <li key={idx} className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-2 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center relative z-10">
                        {/* billing card */}
                        <Card className="p-3 mt-3 rounded-[12px]  text-primary-color">
                          <div>
                            <div className="flex justify-between items-center">
                              <p>Next Billing Date</p>
                              <p>{getNextMonthSameDate(new Date())}</p>
                            </div>
                            <div className="mt-3">
                              <ul className="list-disc space-y-1 pl-5 text-[12px] ">
                                <li>You will next be billed on {getNextMonthSameDate(new Date())}</li>
                                <li>
                                  Cancel with 30 day notice period. Offer terms
                                  apply.
                                </li>
                              </ul>
                            </div>
                          </div>
                          {/* <Button 
                          className="text-primary ml-2 hover:text-primary-color bg-primary-color mt-3 rounded-[16px]"
                          onClick={() => setIsPaymentModal(true)}
                          >
                            Continue to payment
                          </Button> */}
                          <Elements stripe={promise}>
                            <CheckoutForm planData={planData} />
                          </Elements>
                        </Card>
                      </div>

                      {/* Person Asset Image */}
                      <img
                        src="/assets/PersonAsset.svg"
                        className="absolute bottom-0 right-10 h-[400px] object-contain"
                        alt="Person Illustration"
                      />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </div>
      )}

      <PaymentModal open={isPaymentModal} onOpenChange={setIsPaymentModal} promise={promise} planData={planData} />
    </>
  );
};

export default PlansAndPricing;
