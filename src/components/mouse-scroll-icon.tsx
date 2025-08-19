"use client";

import { motion } from "framer-motion";

export function MouseScrollIcon() {
    return (
        <div className="flex flex-col items-center gap-2">
            <motion.div
                className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center cursor-pointer"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <motion.div
                    className="w-1 h-3 bg-white/60 rounded-full mt-2"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>
            <motion.p
                className="text-white/40 text-xs font-medium"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                Scroll Down
            </motion.p>
        </div>
    );
}
