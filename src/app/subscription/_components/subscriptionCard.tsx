import { Card } from '@/components/ui/card'
import React from 'react'

const SubscriptionCard = ({data}:any) => {
  return (
    <div>
        <Card className='text-center bg-primary p-3 border-none rounded-[15px] ' >
            <p className='text-[28px] font-semibold text-[#0025C5] ' >{data.value}</p>
            <p className='text-[18px] font-semibold text-primary-color ' >{data.type} Subscribers</p>
        </Card>
    </div>
  )
}

export default SubscriptionCard