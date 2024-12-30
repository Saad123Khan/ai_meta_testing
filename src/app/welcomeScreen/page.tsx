"use client";
import FeatureCard from "./_components/featureCard";
import { useRouter } from "next/navigation";
import { Qwitcher_Grypen } from "next/font/google";
import Head from "next/head";

const qwitcherGrypen = Qwitcher_Grypen({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const WelcomeScreen = () => {
  const router = useRouter();

  const handleCard = (route = "home", type: string) => {
    router.push(`/${route}`);
    localStorage.setItem("type", type);
  };

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

    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left section with gradient background and welcome text */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-purple-300 to-blue-300 items-center justify-center p-16">
        <h1
          className={`${qwitcherGrypen.className} text-[188px] font-cursive text-white`}
          style={{ transform: 'rotate(-22deg)' }}
        >
          welcome
        </h1>
      </div>

      {/* Right section with features grid */}
      <div className="w-full lg:w-1/2 bg-white p-8 lg:p-16 flex flex-col justify-center min-h-screen">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6">OUR FEATURES</h2>
          <p className="text-sm text-gray-600 mb-8">
            Select the main tool you would like to explore
          </p>
          <div className="grid grid-cols-2 gap-4">
            <FeatureCard
              icon={
                <img
                  src="/assets/Wallet icon.png"
                  alt="Wallet"
                  className="h-12 w-12"
                />
              }
              title="Add creation"
              bgColor="bg-[#FFE0FA]"
              color="text-[#5F004F]"
              handleCard={() => handleCard("home", "admin")}
            />
            <FeatureCard
              icon={
                <img
                  src="/assets/Bill icon.png"
                  alt="Bill"
                  className="h-12 w-12"
                />
              }
              title="Media & Brand creation"
              bgColor="bg-[#FFF8E0]"
              color="text-[#5F4400]"
              handleCard={() => handleCard("salesmanDashboard", "salesman")}
            />
            <FeatureCard
              icon={
                <img
                  src="/assets/Loan icon.png"
                  alt="Loan"
                  className="h-12 w-12"
                />
              }
              title="CRM"
              bgColor="bg-[#EBD3FC]"
              color="text-[#00265F]"
              handleCard={() => handleCard("crmDashboard", "crm")}
            />
            <FeatureCard
              icon={
                <img
                  src="/assets/Savings icon.png"
                  alt="Savings"
                  className="h-12 w-12"
                />
              }
              title="Management"
              bgColor="bg-[#FFCCE1]"
              color="text-[#C65D80]"
              handleCard={() => handleCard("superAdminDashboard", "superadmin")}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default WelcomeScreen;
