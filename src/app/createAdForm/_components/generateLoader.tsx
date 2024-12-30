"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import Backdrop from "@mui/material/Backdrop";
import { useTheme } from "@mui/material/styles";

const GenerateLoader = ({
  loading,
  content,
  mediaIcon,
}: {
  loading: boolean;
  content: string;
  mediaIcon: any;
}) => {
  const theme = useTheme();

  useEffect(() => {
    // Prevent body scroll when loading is true
    document.body.style.overflow = loading ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, [loading]);

  return (
    <Backdrop
      open={loading}
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        color: theme.palette.primary.main,
        zIndex: theme.zIndex.modal,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Dim background
      }}
    >
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 text-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {mediaIcon}
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
              <RefreshCw className="size-6 text-primary-color" />
            </motion.div>
          </motion.div>
        </div>
        <div className="w-full text-base text-primary-color">
          Creating unique and personalized AI-generated {content} just for you! 🎨
          <p className="mt-2 text-sm text-primary-color">
            The process may take up to 1 minute, please stay on the screen.
          </p>
        </div>
      </div>
    </Backdrop>
  );
};

export default GenerateLoader;
