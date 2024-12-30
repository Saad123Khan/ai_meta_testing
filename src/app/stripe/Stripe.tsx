'use client'

import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import Head from 'next/head'

// Replace with your actual publishable key
const promise = loadStripe(
  "pk_test_51HWS0PC2ulEqsTvP7J7S4GGg40mF1s8UsLA98Wbq0XHJqdF7n7Dyn5vCce5UNSFpcC9ghx6FEga0n65wj06w8d3h00oUxgkZgP"
);
export default function Stripe() {
  const [clientSecret, setClientSecret] = useState<string>('')

  // useEffect(() => {
  //   // Call your backend to create a PaymentIntent and get the clientSecret
  //   const createPaymentIntent = async () => {
  //     try {
  //       // Replace with your backend API to create a PaymentIntent
  //       const response = await fetch('/api/create-payment-intent', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ price: 2000 }), // Ensure price is passed correctly (in cents)
  //       })

  //       const data = await response.json()
  //       console.log('Received clientSecret:', data.clientSecret)

  //       // Set the clientSecret if the response is valid
  //       if (data.clientSecret) {
  //         setClientSecret(data.clientSecret)
  //       } else {
  //         console.error('No clientSecret returned from API')
  //       }
  //     } catch (error) {
  //       console.error('Error creating payment intent:', error)
  //     }
  //   }

  //   createPaymentIntent()
  // }, [])

  const appearance = {
    theme: 'stripe',
  }

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

    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
   
          <Elements stripe={promise}>
            <CheckoutForm />
          </Elements>
   
      </div>
    </div>
    </>
  )
}
