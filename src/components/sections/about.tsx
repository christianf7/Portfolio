"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Copy, Check } from "lucide-react";
import { GlitchText, BentoItem } from "~/components/effects";

const CORE_TECH = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"];

export function AboutSection() {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
    const [copied, setCopied] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText("christian@chrisfitz.dev");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="about" ref={ref} className="relative py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    className="text-zinc-500 font-mono text-sm mb-4"
                >
                    001 / ABOUT
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:auto-rows-[140px]">
                    <BentoItem colSpan={4} rowSpan={2} className="p-6 sm:p-8 flex flex-col justify-between min-h-0 sm:min-h-[280px]">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                I build <GlitchText className="text-sky-400">products</GlitchText> that people actually use.
                            </h2>
                            <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                                I'm a full-stack developer currently studying a double degree in Computer Science and Commerce at Monash University. I enjoy building scalable web applications that solve real-world problems, with a strong focus on clean code, thoughtful design, and practical, reliable solutions. 
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-6">
                            {CORE_TECH.map((tech) => (
                                <span key={tech} className="px-3 py-1 bg-zinc-800 text-zinc-400 text-sm rounded-full">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </BentoItem>

                    <BentoItem colSpan={2} rowSpan={1} className="p-6 flex flex-col justify-center items-center text-center col-span-1 sm:col-auto">
                        <span className="text-5xl font-bold text-white mb-1">5+</span>
                        <span className="text-zinc-500 text-sm">Years coding</span>
                    </BentoItem>

                    <BentoItem colSpan={2} rowSpan={1} className="p-6 flex flex-col justify-center items-center text-center col-span-1 sm:col-auto">
                        <span className="text-5xl font-bold text-white mb-1">15+</span>
                        <span className="text-zinc-500 text-sm">Projects shipped</span>
                    </BentoItem>

                    <BentoItem colSpan={2} rowSpan={1} className="p-6 col-span-1 sm:col-auto">
                        <div className="h-full flex flex-col justify-between gap-3">
                            <span className="text-zinc-500 text-xs font-mono">LOCATION</span>
                            <div>
                                <p className="text-white font-semibold">Melbourne, AU</p>
                                <p className="text-zinc-500 text-sm">GMT+11</p>
                            </div>
                        </div>
                    </BentoItem>

                    <BentoItem colSpan={2} rowSpan={1} className="p-6 cursor-pointer group col-span-1 sm:col-auto" onClick={copyEmail}>
                        <div className="h-full flex flex-col justify-between gap-3">
                            <span className="text-zinc-500 text-xs font-mono">EMAIL</span>
                            <div className="flex items-center justify-between">
                                <p className="text-white font-semibold text-sm truncate">me@chrisfitz.dev</p>
                                {copied ? (
                                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                ) : (
                                    <Copy className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors shrink-0" />
                                )}
                            </div>
                        </div>
                    </BentoItem>
                </div>
            </div>
        </section>
    );
}
