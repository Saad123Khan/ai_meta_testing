import Image from "next/image";
import Dashboard from "./plansAndPricing/page";
import SideBar from "@/components/sidebar";
import Auth from "./auth/page";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>AI</title>
        <meta property="og:title" content="Majai" />
        <meta
          property="og:description"
          content="AI marketing"
        />
        
        <meta property="og:image" content="https://ai-meta-testing.vercel.app/assets/logo.webp"/>
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://ai-meta-testing.vercel.app" />
        <meta property="og:type" content="website" />
      </Head>
     {/* <Dashboard/> */}
     <Auth/>
     </>
  );
}
