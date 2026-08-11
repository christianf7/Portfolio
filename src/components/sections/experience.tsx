"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GlitchText } from "~/components/effects";
import { MapPin, Calendar } from "lucide-react";

const EXPERIENCES = [
    {
        role: "Fullstack / Web Developer",
        company: "Freelance",
        period: "2023 — Now",
        year: "2023",
        description: "Building websites and apps for startups and small businesses. 15+ projects, 100% happy clients.",
        active: true,
        highlights: ["15+ projects", "100% satisfaction"],
    },
    {
        role: "IT Lead",
        company: "El*Arquero Tequila",
        period: "2024 — Now",
        year: "2024",
        description: "Running IT infrastructure, building custom tools, and managing the tech stack for a growing brand employing 15+ people, with distribution across 300+ venues/locations.",
        active: true,
        highlights: ["15+ team", "300+ venues"],
    },
    {
        role: "Assistant Customer Service Manager",
        company: "Woolworths Mount Waverley",
        period: "2021 — Now",
        year: "2021",
        description: "Managing front-end operations. Became a supervisor at 17, then a manager at 19. Often leading the whole store on nights and weekends.",
        active: true,
        highlights: ["Supervisor at 17", "Manager at 19"],
    },
    {
        role: "Java Developer",
        company: "Hypera Development",
        period: "2020 — 2022",
        year: "2020",
        description: "Built Minecraft plugins used by hundreds of servers. Learned a lot about open source, and building in teams using GIT and CI.",
        active: false,
        highlights: ["Open source", "Hundreds of servers"],
    },
];

export function ExperienceSection() {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section id="experience" ref={ref} className="relative py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    className="text-zinc-500 font-mono text-sm mb-4"
                >
                    003 / EXPERIENCE
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="text-4xl md:text-6xl font-bold text-white mb-16 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                >
                    Where I&apos;ve <GlitchText className="text-sky-400">worked</GlitchText>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {EXPERIENCES.map((exp, index) => (
                        <motion.div
                            key={exp.company}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.12 * index + 0.2 }}
                            className="group relative"
                        >
                            <div className="relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800/50 p-6 h-full transition-all duration-500 hover:border-zinc-700/60 hover:bg-zinc-900/70">
                                {/* Subtle corner glow on hover */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/0 group-hover:bg-sky-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 transition-all duration-700" />

                                <div className="relative">
                                    {/* Header: role + status */}
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <h3 className="text-lg font-semibold text-white group-hover:text-sky-400 transition-colors duration-300 leading-tight">
                                            {exp.role}
                                        </h3>
                                        {exp.active && (
                                            <span className="relative flex items-center gap-1.5 shrink-0 mt-1">
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" style={{ animationDuration: "2s" }} />
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                                                </span>
                                                <span className="text-emerald-400 text-[10px] font-mono uppercase tracking-wider">Active</span>
                                            </span>
                                        )}
                                    </div>

                                    {/* Company + period */}
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4">
                                        <span className="flex items-center gap-1.5 text-sky-400/70 text-sm font-medium">
                                            <MapPin className="w-3 h-3" />
                                            {exp.company}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-zinc-600 text-xs font-mono">
                                            <Calendar className="w-3 h-3" />
                                            {exp.period}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">{exp.description}</p>

                                    {/* Highlight chips */}
                                    <div className="flex flex-wrap gap-2">
                                        {exp.highlights.map((h) => (
                                            <span
                                                key={h}
                                                className="px-2.5 py-1 bg-zinc-800/60 text-zinc-500 text-[11px] rounded-lg font-mono border border-zinc-800/40 group-hover:border-zinc-700/50 group-hover:text-zinc-400 transition-colors duration-300"
                                            >
                                                {h}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
