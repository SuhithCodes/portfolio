"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background min-h-screen z-50">
      <div className="relative flex flex-col items-center">
        {/* Main Logo Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Rotating Border Effect */}
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-primary"
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Static Border */}
          <div className="absolute inset-0 rounded-xl border-2 border-secondary opacity-20" />

          {/* Logo Content */}
          <motion.div
            className="relative w-24 h-24 rounded-xl bg-background flex items-center justify-center"
            animate={{
              boxShadow: [
                "0 0 0 2px rgba(59, 130, 246, 0.2)",
                "0 0 0 2px rgba(59, 130, 246, 0.5)",
                "0 0 0 2px rgba(59, 130, 246, 0.2)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.span
              className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              SG
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          className="mt-12 w-48 h-0.5 bg-muted overflow-hidden rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="mt-4 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Loading...
        </motion.div>
      </div>
    </div>
  );
}
