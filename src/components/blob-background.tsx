"use client";

import { lazy, Suspense } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { setScrollProgress } from "~/components/hero-blobs";

const HeroBlobs = lazy(() => import("~/components/hero-blobs"));

export function BlobBackground({ isLoaded }: { isLoaded: boolean }) {
    const { scrollYProgress } = useScroll();

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        setScrollProgress(v);
    });

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-black" />

            <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : {}}
                transition={{ duration: 2, ease: [0.33, 1, 0.68, 1] }}
            >
                <Suspense fallback={null}>
                    <HeroBlobs />
                </Suspense>
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black pointer-events-none" />
        </div>
    );
}
