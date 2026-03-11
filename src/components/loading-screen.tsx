"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [count, setCount] = useState(0);
    const [phase, setPhase] = useState<"counting" | "revealing" | "done">("counting");

    useEffect(() => {
        if (phase !== "counting") return;

        const duration = 2200;
        const startTime = Date.now();

        const tick = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * 100));

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                setCount(100);
                setPhase("revealing");
                setTimeout(() => {
                    setPhase("done");
                    onComplete();
                }, 800);
            }
        };

        requestAnimationFrame(tick);
    }, [phase, onComplete]);

    if (phase === "done") return null;

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
            animate={phase === "revealing" ? { clipPath: "inset(0 0 100% 0)" } : { clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
            <div className="relative flex flex-col items-center">
                <motion.div
                    className="overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <span className="text-[clamp(4rem,20vw,14rem)] font-bold leading-none tracking-tighter text-white tabular-nums font-mono">
                        {String(count).padStart(3, "0")}
                    </span>
                </motion.div>

                <div className="mt-6 w-48 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-sky-400 rounded-full"
                        style={{ width: `${count}%` }}
                        transition={{ duration: 0.05 }}
                    />
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.4 }}
                    className="mt-4 text-zinc-500 text-xs tracking-[0.3em] uppercase font-mono"
                >
                    Loading
                </motion.p>
            </div>
        </motion.div>
    );
}
