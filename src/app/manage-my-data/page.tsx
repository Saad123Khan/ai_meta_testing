"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { swalPopUp } from "@/lib/helper";
import apis from "@/services";
import Head from "next/head";

export default function ManageMyData() {
  const [selectedAction, setSelectedAction] =
    useState<string>("Remove my data");
  const [email, setEmail] = useState<string>("");

  const { mutate: manageYourData, isPending: manageDataPending }: any  = useMutation({
    mutationFn: apis.manageMyData,
    onSuccess: ({
      data,
    }: {
      data: {
        data: any;
        status: boolean;
        message: string;
        image_url: string;
      };
    }) => {
      swalPopUp(
        "Success",
        "Your request has been submitted successfully.",
        "success"
      );
      setEmail("");
    },
    onError: (error: any) => {
      swalPopUp("Error", error.message || "Something went wrong", "error");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      swalPopUp("Error", "Email is required", "error");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      swalPopUp("Error", "Please enter a valid email", "error");
    } else {
      manageYourData({ option: selectedAction, email });
      // setError("");
      // alert("Form submitted successfully!");
    }
  };

  return (
    <>
      <Head>
        <title>AI</title>
        <meta property="og:title" content="Majai" />
        <meta property="og:description" content="AI marketing" />
        <meta
          property="og:image:secure"
          content="https://app.majai.se/assets/logo.webp"
        />
        <meta
          property="og:image"
          content="https://app.majai.se/assets/logo.webp"
        />
        <meta property="og:url" content="https://majai.se" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <Card className="backdrop-blur-sm bg-white/80">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Managing Your Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-base font-semibold">
                    Select one of the following options
                  </Label>
                  <RadioGroup
                    value={selectedAction}
                    onValueChange={setSelectedAction}
                    className="space-y-3"
                    defaultValue="Remove my data"
                  >
                    <div className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-slate-50">
                      <RadioGroupItem value="Remove my data" id="remove_data" />
                      <Label
                        htmlFor="remove_data"
                        className="flex-1 cursor-pointer"
                      >
                        Remove my data
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-slate-50">
                      <RadioGroupItem
                        value="Deactivate or delete my account"
                        id="deactivate_delete"
                      />
                      <Label
                        htmlFor="deactivate_delete"
                        className="flex-1 cursor-pointer"
                      >
                        Deactivate or delete my account
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <form action="">
                    <Label htmlFor="email" className="text-base font-semibold">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-lg"
                    />
                  </form>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={manageDataPending}
                    className="px-8 h-11 text-primary-color rounded-lg"
                  >
                    {manageDataPending ? "Loading..." : "Submit"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
