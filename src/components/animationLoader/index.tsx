import React, { useState, useEffect } from "react";

const SimpleOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0); // Track the current step
  const [progress, setProgress] = useState(0); // Track the progress for each step

  const steps = [
    { title: "Setting up your workspace", description: "Bringing your workspace to life" },
    { title: "Adding departments", description: "Personalizing your workspace" },
    { title: "Inviting people", description: "Reaching out to your peers" }
  ];

  useEffect(() => {
    if (currentStep < steps.length) {
      let progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 1) {
            clearInterval(progressInterval); // Stop progress after completion of each step
            return 1;
          }
          return prev + 0.05; // Increase progress for each interval
        });
      }, 100);

      return () => clearInterval(progressInterval); // Cleanup interval on component unmount or change
    }
  }, [currentStep]);

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setProgress(0); // Reset progress for the next step
      setCurrentStep((prev) => prev + 1); // Move to the next step
    }
  };

  return (
    <div className="onboarding">
      <div className="onboarding-steps">
        {steps.map((step, index) => {
          let phase = "waiting"; // Default phase is 'waiting'

          // If the current step is done or past, mark it as 'done'
          if (index < currentStep) phase = "done";
          else if (index === currentStep) phase = "current";

          return (
            <div key={index} className={`onboarding-step ${phase}`}>
              <div className="onboarding-step-title">
                <h2>{step.title}</h2>
                <p>{step.description}</p>
              </div>
              <div className="progress-circle">
                <svg width="50" height="50" viewBox="0 0 50 50">
                  <circle cx="25" cy="25" r="20" fill="none" stroke="#ddd" strokeWidth="4" />
                  <circle
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke="#4caf50"
                    strokeWidth="4"
                    strokeDasharray="125.6"
                    strokeDashoffset={125.6 - 125.6 * progress}
                    style={{ transition: "stroke-dashoffset 0.1s ease-in-out" }}
                  />
                </svg>
                <span>{Math.round(progress * 100)}%</span>
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={handleNextStep} disabled={currentStep >= steps.length}>
        {currentStep === steps.length ? "Completed" : "Next Step"}
      </button>
    </div>
  );
};

export default SimpleOnboarding;
