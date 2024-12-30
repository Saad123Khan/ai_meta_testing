'use client'

import * as React from "react"
import { User, Cog, Building2, CalendarDays, CalendarClock, CalendarFold, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type StepProps = {
  icon: React.ReactNode
  title: string
  description: string
  isActive: boolean
  onClick: () => void
}

const Step: React.FC<StepProps> = ({ icon, title, description, isActive, onClick }) => (
  <div className="flex flex-col items-center cursor-pointer" onClick={onClick}>
    <div className={cn(
      "rounded-full p-[10px] sm:p-2 md:p-4 mb-2",
      isActive ? "bg-primary text-primary-color" : "bg-muted text-muted-foreground"
    )}>
      {icon}
    </div>
    <div className="absolute top-16 w-max text-center">
      <h6 className={cn(
        "text-sm font-medium",
        isActive ? "text-[#002EF6] font-semibold text-[12px] sm:text-[18px] " : "text-foreground font-semibold text-[12px] sm:text-[18px]"
      )}>
        {title}
      </h6>
      <p className={cn(
        "text-xs",
        isActive ? "text-primary-foreground w-[50px] break-all sm:w-full font-semibold text-[9px] sm:text-[14px]" : "text-foreground text-[15px] text-[9px] sm:text-[15px] w-[40px] sm:w-[100px] md:w-full break-all"
      )}>
        {description}
      </p>
    </div>
  </div>
)

 const CustomStepper = () => {
  const [activeStep, setActiveStep] = React.useState(0)
  const isLastStep = activeStep === 3
  const isFirstStep = activeStep === 0

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1)
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1)

  const steps = [
    { icon: <CalendarIcon className="h-5 w-5" />, title: "Day 1", description: "Details about your account." },
    { icon: <CalendarFold  className="h-5 w-5" />, title: "Week 1", description: "Details about your account." },
    { icon: <CalendarDays className="h-5 w-5" />, title: "Week 2", description: "Details about your account." },
    { icon: <CalendarClock className="h-5 w-5" />, title: "Ongoing", description: "Details about your account." },
  ]

  return (
    <div className="w-full px-[10px] sm:px-24 py-4">
      <div className="flex justify-between items-center relative mb-32">
        {steps.map((step, index) => (
          <Step
            key={index}
            icon={step.icon}
            title={step.title}
            description={step.description}
            isActive={activeStep === index}
            onClick={() => setActiveStep(index)}
          />
        ))}
        <div className="absolute top-4 left-0 right-0 h-[2px] bg-muted -z-10">
          <div
            className="h-full bg-[#002EF6] transition-all duration-300 ease-in-out"
            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>
      {/* <div className="flex justify-between">
        <Button className="bg-black text-primary-color" onClick={handlePrev} disabled={isFirstStep} variant="outline">
          Prev
        </Button>
        <Button className="bg-black text-primary-color" onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div> */}
    </div>
  )
}

export default CustomStepper
