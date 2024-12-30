"use client";

import { motion } from "framer-motion";
import { ImageIcon, RefreshCw } from "lucide-react";

export default function ImageUploadLoader({content}:any) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 text-center">
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <ImageIcon className="size-16 text-blue-400" strokeWidth={1.4} />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-400"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeOut",
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-400"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeOut",
            delay: 0.75,
          }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute -right-2 -bottom-2"
        >
          <RefreshCw className="size-6 text-blue-500" />
        </motion.div>
      </motion.div>
    </div>
    <div className="w-full text-base text-muted-foreground">
      Creating unique and personalized AI-generated {content} just for you! 🎨
      <p className="mt-2 text-sm">
        The process may take up to 1 minutes,
        plz stay on the advertise screen.
      </p>
    </div>
  </div>
  );
}
