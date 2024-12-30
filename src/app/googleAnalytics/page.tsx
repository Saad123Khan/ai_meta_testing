import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Head from "next/head"

const GoogleAnalytics = () => {
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
 
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6">
      {/* Logo and Header */}
      <div className="flex flex-col items-center space-y-2">
        <Image
          src="/assets/growth.png"
          alt="Google Analytics Logo"
          width={48}
          height={48}
          className="mb-2"
        />
        <h1 className="text-2xl font-semibold">Google Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Please enter your credentials to proceed.
        </p>
      </div>

      {/* Form Sections */}
      <div className="w-full max-w-md space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs text-muted-foreground font-medium">
                GOOGLE ANALYTICS PROFILE
              </h2>
            </div>
            <div className="flex justify-between items-center">
              <span>Google Analytics</span>
              <Button variant="link" className="text-blue-600 h-auto p-0">
                Switch
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs text-muted-foreground font-medium">
                SELECT ACCOUNT
              </h2>
            </div>
            <div className="flex justify-between items-center">
              <span>MyAd.se (undefined)</span>
              <Button variant="link" className="text-blue-600 h-auto p-0">
                Change
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs text-muted-foreground font-medium">
                SELECT PROPERTY
              </h2>
            </div>
            <div className="flex justify-between items-center">
              <span>Property Id</span>
              <Button variant="link" className="text-blue-600 h-auto p-0">
                Select
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  )
}

export default GoogleAnalytics;