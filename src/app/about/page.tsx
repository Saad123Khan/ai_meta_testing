import Head from "next/head"

const About = () => {
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
           <meta
            property="og:image:secure_url"
            content="https://ai-meta-testing.vercel.app/assets/logo.webp"
          />
          <meta property="og:url" content="https://ai-meta-testing.vercel.app" />
          <meta property="og:type" content="website" />
        </Head>
      
        <div>
            <p>About</p>
        </div>
        </>
    )
}

export default About