// import React from 'react'
// import { PaymentElement, LinkAuthenticationElement, useStripe, useElements } from '@stripe/react-stripe-js'
// import { useState } from 'react'
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import baseUrl from '../config';

// const CheckoutForm = ({ orderId }) => {

//     localStorage.setItem('orderId', orderId)
//     const stripe = useStripe()
//     const elements = useElements()
//     const [message, setMessage] = useState(null)
//     const [isLoading, setIsLoading] = useState(false)

//     const paymentElementOptions = {
//         loyout: 'tabs'
//     }

//     const submit = async (e) => {
//         e.preventDefault()

//         if (!stripe || !elements) {
//             return
//         }
//         setIsLoading(true)
//         const { error } = await stripe.confirmPayment({
//             elements,
//             confirmParams: {
//                 return_url: `${baseUrl}/order/confirm`
//             }
//         })
//         if (error.type === 'card_error' || error.type === 'validation_error') {
//             setMessage(error.message)
//         } else {
//             setMessage('An unexpected error occurred')
//         }
//         setIsLoading(false)
//     }

//     return (
//         <form className=' flex gap-4 flex-col justify-center items-center  rounded-lg' onSubmit={submit} id='payment-form' >
//             <LinkAuthenticationElement
//                 id='link-authentication-element'
//             />
//             <PaymentElement id='payment-element' options={paymentElementOptions} />

//             <button disabled={isLoading || !stripe || !elements} id='submit' className='mt-5 px-10 py-[6px] rounded-lg hover:shadow-green-500/20 hover:shadow-lg bg-green-500 text-white'>
//                 <span id='button-text'>
//                     {
//                         isLoading ? <div className='flex items-center '>Loading<AiOutlineLoading3Quarters className='animate-spin ml-2' />
//                         </div> : "Pay now"
//                     }
//                 </span>
//             </button>
//             {message && <div>{message}</div>}
//         </form>
//     )
// }

// export default CheckoutForm

'use client'


import { useMutation } from "@tanstack/react-query";
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  CardElement,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import apis from '@/services';
import { swalPopUp } from '@/lib/helper';
export default function CheckoutForm({planData}:any) {

  const stripe :any = useStripe();
  const elements :any= useElements();
  const [processing, setProcessing] = useState<boolean>();
  const [error, setError] = useState<any>();
  
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  let router = useRouter()

  const cardStyle = {
    style: {
      base: {
        color: "#000",
        fontFamily: "Poppins, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        border: "1px solid red",
        "::placeholder": {
          color: "#3e3e3e",
        },
      },
      invalid: {
        fontFamily: "Poppins, sans-serif",
        color: "#FF3333        ",
        iconColor: "#FF3333        ",
      },
    },
  };
  const { mutate, isPending } :any= useMutation({
    mutationFn: apis.checkoutPlan, 
    onSuccess: (data:any) => {
      if (data?.data?.success) {
       console.log(data,'datadatadatadata')
        swalPopUp("success", "Subscription successfully!", "success");
        router.push("/home")
      } 
    },
    onError: (error:any) => {
      swalPopUp("Error", error.message, "error");
      console.log("Error in Subscription verification", error);
    },
  });
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const cardNumberElement = elements.getElement(CardNumberElement);
    
    if (!cardNumberElement) {
      setError("Card number is not available.");
      setProcessing(false);
      return;
    }
  
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumberElement,
    });

    if (error) {
      setErrorMessage(error?.message ?? 'An unexpected error occurred.');

    } else {
      // Send the paymentMethod.id to your backend for further processing
      console.log('PaymentMethod created:', paymentMethod.id);
      // You can now send `paymentMethod.id` to your backend to create a PaymentIntent
      mutate({
        package_id: planData.id,
        payment_method_id: paymentMethod.id
      } as any);
    }
    setIsLoading(false);
  };
    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }
  

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-5">
     
      <CardNumberElement
              options={cardStyle}
              className="pay_input"
            />
             <CardExpiryElement
                options={cardStyle}
                className="pay_input"
              />
              <CardCvcElement
                options={cardStyle}
                className="pay_input"
              />
      <Button 
        type="submit" 
        disabled={!stripe || isLoading || isPending} 
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        {isLoading || isPending ? 'Processing...' : 'Pay now'}
      </Button>
      {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
    </form>
  )
}