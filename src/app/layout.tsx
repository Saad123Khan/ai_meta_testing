// "use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { usePathname } from "next/navigation";
import SideBar from "@/components/sidebar";
import { ReduxProvider } from "@/components/reduxProvider";
import ReactQuery from "@/components/reactQuery";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI",
  description: "AI marketing",
  openGraph: {
    title: "Majai",
    description: "AI marketing",
    url: "https://majai.se",
    type: "website",
    images: [
      {
        url: "https://app.majai.se/assets/logo.webp",
        secureUrl: "https://app.majai.se/assets/logo.webp",
        alt: "Majai Logo",
        width: 800,
        height: 600,
      },
    ],
    fb: {
      app_id: "YOUR_APP_ID_HERE", // Replace YOUR_APP_ID_HERE with your actual app ID
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const route = usePathname();

  // const paths = [
  //   "/logout",
  //   "/",
  //   "/welcomeScreen",
  //   "/plansAndPricing",
  //   "/auth",
  //   "/forgotPassword",
  //   "/checkout",
  //   "/googleAnalytics",
  // ];
  // const verifyOtpRegex = /^\/(verify-otp|update-password)\/[^/]+$/;
  // const isValidRoute = paths.includes(route) || verifyOtpRegex.test(route);

  // console.log(paths.includes(route), "routeroute");
  return (
    <html lang="en">
      {/* <Head>
        <title>AI</title>
        <meta property="og:title" content="Majai" />
        <meta
          property="og:description"
          content="AI marketing"
        />
        
        <meta property="og:image" content="https://ai-meta-testing.vercel.app/assets/logo.webp"/>
        <meta
          property="og:image:secure_urlZ"
          content="https://ai-meta-testing.vercel.app/assets/logo.webp"
        />
        <meta property="og:url" content="https://ai-meta-testing.vercel.app" />
        <meta property="og:type" content="website" />
      </Head> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ReactQuery>
            {/* {isValidRoute ? <>{children}</> : <SideBar>{children}</SideBar>} */}
            {children}
            <Toaster />
          </ReactQuery>
        </ReduxProvider>
      </body>
    </html>
  );
}
