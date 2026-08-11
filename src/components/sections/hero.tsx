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
            className="relative h-[100dvh] flex flex-col justify-end sm:justify-center overflow-hidden"
            style={{ opacity }}
        >
            <motion.div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 pb-6 sm:pb-0 pt-20 sm:pt-0" style={{ y }}>
                <div className="mb-3 sm:mb-4">
                    <h1 className="text-[clamp(3rem,12vw,8.5rem)] font-bold leading-[0.85] tracking-tighter">
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
                    className="mb-4 sm:mb-6"
                >
                    <p className="text-[15px] sm:text-lg md:text-xl lg:text-2xl text-zinc-300 leading-relaxed max-w-xl">
                        Full-stack developer building things that work.
                        <br className="hidden sm:block" />
                        <span className="sm:hidden"> </span>
                        <span className="text-zinc-400">Computer Science & Commerce @ Monash University.</span>
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: baseDelay + 0.7, duration: 0.6 }}
                    className="flex gap-3 sm:gap-4 mb-6 sm:mb-8"
                >
                    <Magnetic>
                        <button
                            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                            className="group px-5 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded-full flex items-center gap-2 hover:gap-4 transition-all cursor-pointer text-sm sm:text-base"
                        >
                            See my work
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                        </button>
                    </Magnetic>
                    <Magnetic>
                        <button
                            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                            className="px-5 sm:px-8 py-3 sm:py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-colors cursor-pointer text-sm sm:text-base"
                        >
                            Get in touch
                        </button>
                    </Magnetic>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isLoaded ? { opacity: 1 } : {}}
                    transition={{ delay: baseDelay + 0.9, duration: 0.6 }}
                    className="border-t border-white/10 pt-4 sm:pt-6"
                >
                    <Marquee speed={30}>
                        <div className="flex items-center shrink-0">
                            {TECH_STACK.map((tech, i) => (
                                <span key={i} className="text-zinc-400 text-xs sm:text-sm font-mono tracking-wider flex items-center shrink-0 px-3 sm:px-4">
                                    {tech}
                                    <span className="text-zinc-600 ml-3 sm:ml-4">◆</span>
                                </span>
                            ))}
                        </div>
                    </Marquee>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}
