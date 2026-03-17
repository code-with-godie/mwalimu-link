"use client";

import { motion } from "framer-motion";

// Dynamically import the Lottie Player
const LottiePlayer = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  {
    ssr: false, // Disable server-side rendering for this component
    loading: () => (
      <div className="h-[450px] w-[450px] bg-gray-100 rounded-lg" />
    ), // Optional loading fallback
  },
);

import dynamic from "next/dynamic";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[70vh] bg-background flex md:overflow-hidden">
      {/* Left Side - Form */}

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex-1 hidden lg:flex items-center justify-center sticky top-0"
      >
        <LottiePlayer
          autoplay
          loop
          src="/auth.json"
          style={{ height: "450px", width: "450px" }}
        />
      </motion.div>
      {/* Right Side - Lottie Animation */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex items-center justify-center p-8"
      >
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            {children}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
