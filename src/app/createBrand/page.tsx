"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import AdvertiseCarousel from "@/components/advertisingCarousel";
import CustomInputField from "@/components/customInputField";
import CustomAccordion from "@/components/customAccordion";
import MobileMockUp from "@/components/mobileMockup";
import CustomSelectField from "@/components/customSelectField";
import Head from "next/head";

const CreateBrand = () => {
  const [brandName, setBrandName] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const [brandLogo, setBrandLogo] = useState([]);
  const [brandColors, setBrandColors] = useState([]);

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
      <p className="text-2xl font-bold text-secondary-foreground">Create Brand</p>

      <Grid container spacing={2} sx={{mt:4}} >
        <Grid size={{ xs: 12 }}>
          <AdvertiseCarousel />
        </Grid>
      </Grid>
      <div className="mt-3">
        <p className="text-2xl text-center font-bold text-secondary-foreground">
          Import from website or enter brand details manually
        </p>
      </div>
      <div className="mt-4">
        <CustomSelectField
          label="Import From Website"
                  css={"bg-[#ffff] text-[#6B7280] border-none active:border-none rounded-[22px] p-8"}
          placeholder={"wesbite url: "}
          options={[
            { value: "apple", label: "Apple" },
            { value: "banana", label: "Banana" },
            { value: "blueberry", label: "Blueberry" },
            { value: "grapes", label: "Grapes" },
            { value: "pineapple", label: "Pineapple" },
          ]}
        />
      </div>
      <div className="mt-4">
        <p className="text-lg font-bold text-secondary-foreground">
          Enter brand details manually
        </p>
      </div>
      <div className="mt-4">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAccordion
              brandName={brandName}
              setBrandName={setBrandName}
              brandDescription={brandDescription}
              setBrandDescription={setBrandDescription}
              brandLogo={brandLogo}
              setBrandLogo={setBrandLogo}
              brandColors={brandColors}
              setBrandColors={setBrandColors}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} >
            <MobileMockUp
              brandName={brandName}
              setBrandName={setBrandName}
              brandDescription={brandDescription}
              setBrandDescription={setBrandDescription}
              brandLogo={brandLogo}
              setBrandLogo={setBrandLogo}
              brandColors={brandColors}
              setBrandColors={setBrandColors}
            />
          </Grid>
        </Grid>
      </div>
    </div>
    </>
  );
};

export default CreateBrand;
