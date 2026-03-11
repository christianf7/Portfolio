"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Magnetic, Marquee, SplitTextReveal } from "~/components/effects";

const TECH_STACK = ["NEXT.JS", "TYPESCRIPT", "REACT", "NODE", "POSTGRES", "AWS", "DOCKER", "LINUX"];

export function HeroSection({ isLoaded }: { isLoaded: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const baseDelay = isLoaded ? 0.2 : 0;

    return (
        <motion.section
            id="hero"
            ref={containerRef}
            className="relative min-h-screen flex flex-col justify-center overflow-hidden"
            style={{ opacity }}
        >
            <motion.div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32" style={{ y }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: baseDelay, duration: 0.6 }}
                    className="mb-8"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        Available for work
                    </span>
                </motion.div>

                <div className="mb-8">
                    <h1 className="text-[clamp(2.5rem,10vw,10rem)] font-bold leading-[0.85] tracking-tighter">
                        {isLoaded && (
                            <>
                                <SplitTextReveal text="CHRISTIAN" className="text-white block" delay={baseDelay + 0.1} />
                                <span className="block overflow-hidden">
                                    <motion.span
                                        className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-300 block"
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: baseDelay + 0.25,
                                            ease: [0.33, 1, 0.68, 1],
                                        }}
                                    >
                                        FITZGERALD
                                    </motion.span>
                                </span>
                            </>
                        )}
                    </h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: baseDelay + 0.5, duration: 0.6 }}
                    className="mb-8 sm:mb-12"
                >
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-300 leading-relaxed max-w-[90vw] sm:max-w-xl">
                        Full-stack developer building things that work.
                        <br />
                        <span className="text-zinc-400">Computer Science & Commerce @ Monash University.</span>
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: baseDelay + 0.7, duration: 0.6 }}
                    className="flex flex-wrap gap-3 sm:gap-4 mb-12 sm:mb-20"
                >
                    <Magnetic>
                        <button
                            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                            className="group px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded-full flex items-center gap-2 hover:gap-4 transition-all cursor-pointer text-sm sm:text-base"
                        >
                            See my work
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                        </button>
                    </Magnetic>
                    <Magnetic>
                        <button
                            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                            className="px-6 sm:px-8 py-3 sm:py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-colors cursor-pointer text-sm sm:text-base"
                        >
                            Get in touch
                        </button>
                    </Magnetic>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isLoaded ? { opacity: 1 } : {}}
                    transition={{ delay: baseDelay + 0.9, duration: 0.6 }}
                    className="border-t border-white/10 pt-8"
                >
                    <Marquee speed={30}>
                        <div className="flex items-center gap-8 px-4">
                            {TECH_STACK.map((tech, i) => (
                                <span key={i} className="text-zinc-400 text-sm font-mono tracking-wider flex items-center gap-4">
                                    {tech}
                                    <span className="text-zinc-600">◆</span>
                                </span>
                            ))}
                        </div>
                    </Marquee>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : {}}
                transition={{ delay: baseDelay + 1.2, duration: 0.6 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 text-zinc-400"
                >
                    <span className="text-xs tracking-widest">SCROLL</span>
                    <div className="w-px h-12 bg-gradient-to-b from-zinc-400 to-transparent" />
                </motion.div>
            </motion.div>
        </motion.section>
    );
}
