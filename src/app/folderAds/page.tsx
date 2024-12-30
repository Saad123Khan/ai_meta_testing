import CampaignCard from "@/components/campaignCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { campaigns } from "@/lib/constant";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import FolderIcon from "@mui/icons-material/Folder";
import Head from "next/head";

const FolderAds = () => {
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
      <p className="text-xl font-bold text-secondary-foreground">
        {`Advertise > `}{" "}
        <span className="text-md font-bold opacity-55 text-secondary-foreground">
          {" "}
          Folder Name
        </span>
      </p>

      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid size={{ xs: 12 }}>
          <Card className="bg-primary border-none rounded-[24px] p-8">
            <CardContent className="p-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Box
                    sx={{
                      background: "#ffff",
                      color: "#242730",
                      padding: 1,
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      mr: 1,
                    }}
                  >
                    <FolderIcon className="text-primary" />
                  </Box>
                  <p className="text-primary-color">
                    Create folders to keep everything organized
                  </p>
                </div>
                <div>
                  <Button
                    variant="default"
                    className="bg-secondary text-primary-color hover:bg-blue-700"
                  >
                    Edit Folder
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        {campaigns.map((items: any) => (
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <CampaignCard campaignData={items} />
          </Grid>
        ))}
      </Grid>
    </div>
    </>
  );
};

export default FolderAds;
