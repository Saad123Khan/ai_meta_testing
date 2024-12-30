"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const StartupLoader = ({ onFinish }: { onFinish: () => void }) => {
  const [rotation, setRotation] = useState(0);
  const [isVisible, setIsVisible] = useState(true); 
  const numberOfCircles = 9;

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 5) % 360);
    }, 50);

    // Timer to stop the loader after 3 seconds
    const timeout = setTimeout(() => {
      setIsVisible(false);
      onFinish(); // Callback to hide loader
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <>
 <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-100 to-blue-100">
      <div className="relative w-32 h-16" aria-label="Loading indicator">
        {[...Array(numberOfCircles)].map((_, index) => {
          const angle = (rotation + (index / numberOfCircles) * 360) * (Math.PI / 180)
          const x = Math.cos(angle) * 50
          const y = Math.sin(angle) * 25
          return (
            <div
              key={index}
              className="absolute w-3 h-3 bg-white rounded-full transition-all duration-50 ease-linear"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(${x}px, ${y}px)`,
                opacity: 1 - (index * 0.1),
              }}
            />
          )
        })}
      </div>
      <p className="mt-8 text-white text-lg" aria-live="polite">Loading...</p>
    </div>
    </>
  );
};

export default StartupLoader;
