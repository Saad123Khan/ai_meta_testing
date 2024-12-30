import React from "react";
import Grid from "@mui/material/Grid2";
import AdvertiseCarousel from "@/components/advertisingCarousel";
import BrandCard from "./_components/brandCard";
import Head from "next/head";

const newBrands = [
  {
    name: "Brand Name",
    description: "description",
    img: "/assets/brand img1.png",
    color: "color",
    font: "font",
  },
  {
    name: "Brand Name",
    description: "description",
    img: "/assets/brand img2.png",
    color: "color",
    font: "font",
  },
];

const Brands = () => {
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
      <p className="text-2xl font-bold text-secondary-foreground">Brand</p>

      <Grid container spacing={2} sx={{mt:4}} >
        <Grid size={{ xs: 12 }}>
          <AdvertiseCarousel />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        {newBrands.map((item: any, index: any) => (
          <Grid size={{ xs: 12, md: 4, lg: 3 }} key={index}>
            <BrandCard data={item} />
          </Grid>
        ))}

        {/* Add New Folder card */}
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <BrandCard isNew />
        </Grid>
      </Grid>
    </div>
    </>
  );
};

export default Brands;
