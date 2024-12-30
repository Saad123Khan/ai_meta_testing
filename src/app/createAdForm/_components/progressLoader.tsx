"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";

export default function ProgressLoader() {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  const loadingTexts = [
    "Creating your content...",
    "Understanding your business...",
    "Analyzing...",
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="w-full max-w-md">
      <div className="relative h-3 overflow-hidden rounded-full bg-secondary">
        <motion.div 
          className="absolute h-full w-full bg-gradient-to-r from-secondary via-blue-600 to-primary"
          initial={{ x: "-100%" }}
          animate={{ x: `${progress - 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <div className="h-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={textIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full text-center text-muted-foreground"
          >
            {loadingTexts[textIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  </div>
  );
}
