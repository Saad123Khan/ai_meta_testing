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
           <meta
            property="og:image:secure"
            content="https://app.majai.se/assets/logo.webp"
          />
          <meta property="og:image" content="https://app.majai.se/assets/logo.webp"/>
          <meta property="og:url" content="https://majai.se" />
          <meta property="og:type" content="website" />
        </Head>
      
        <div>
            <p>About</p>
        </div>
        </>
    )
}

export default About