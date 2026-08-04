"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GlitchText } from "~/components/effects";

const EXPERIENCES = [
    {
        role: "Fullstack / Web Developer",
        company: "Freelance",
        period: "2023 — Now",
        year: "2023",
        description: "Building websites and apps for startups and small businesses. 15+ projects, 100% happy clients.",
        active: true,
    },
    {
        role: "IT Lead",
        company: "El*Arquero Tequila",
        period: "2024 — Now",
        year: "2024",
        description: "Running IT infrastructure, building custom tools, and managing the tech stack for a growing brand employing 15+ people, with distribution across 300+ venues/locations.",
        active: true,
    },
    {
        role: "Assistant Customer Service Manager",
        company: "Woolworths Mount Waverley",
        period: "2021 — Now",
        year: "2021",
        description: "Managing front-end operations. Became a supervisor at 17, then a manager at 19. Often leading the whole store on nights and weekends.",
        active: true,
    },
    {
        role: "Java Developer",
        company: "Hypera Development",
        period: "2020 — 2022",
        year: "2020",
        description: "Built Minecraft plugins used by hundreds of servers. Learned a lot about open source, and building in teams using GIT and CI.",
        active: false,
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

                <div className="relative ml-4 sm:ml-0">
                    {/* Timeline spine */}
                    <div className="absolute left-0 sm:left-24 top-0 bottom-0 w-px">
                        <motion.div
                            className="w-full h-full bg-gradient-to-b from-sky-500 via-sky-500/40 to-zinc-800/20"
                            initial={{ scaleY: 0 }}
                            animate={inView ? { scaleY: 1 } : {}}
                            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                            style={{ transformOrigin: "top" }}
                        />
                    </div>

                    <div className="space-y-10">
                        {EXPERIENCES.map((exp, index) => (
                            <motion.div
                                key={exp.company}
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.15 * index + 0.3 }}
                                className="relative flex items-start group"
                            >
                                {/* Year label - desktop */}
                                <div className="hidden sm:block w-24 shrink-0 pt-1 pr-6 text-right">
                                    <span className="text-zinc-600 font-mono text-xs group-hover:text-sky-400/60 transition-colors">
                                        {exp.year}
                                    </span>
                                </div>

                                {/* Timeline node */}
                                <div className="absolute left-0 sm:left-24 top-2 -translate-x-1/2 z-10">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={inView ? { scale: 1 } : {}}
                                        transition={{ delay: 0.15 * index + 0.4, type: "spring", stiffness: 400, damping: 15 }}
                                        className="relative"
                                    >
                                        <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                                            exp.active
                                                ? "border-sky-400 bg-sky-400/20 group-hover:bg-sky-400 group-hover:shadow-[0_0_12px_rgba(56,189,248,0.5)]"
                                                : "border-zinc-600 bg-zinc-900 group-hover:border-zinc-400"
                                        }`} />
                                        {exp.active && (
                                            <div className="absolute inset-0 w-3 h-3 rounded-full bg-sky-400/30 animate-ping" style={{ animationDuration: "3s" }} />
                                        )}
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 pl-6 sm:pl-6 pb-2">
                                    <div className="rounded-lg px-4 py-3 -mx-4 group-hover:bg-zinc-900/50 transition-all duration-300">
                                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                                            <h3 className="text-base font-semibold text-white group-hover:text-sky-400 transition-colors">
                                                {exp.role}
                                            </h3>
                                            <span className="text-zinc-600 font-mono text-[11px] sm:hidden">{exp.period}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-sky-400/60 text-sm">{exp.company}</span>
                                            {exp.active && (
                                                <span className="px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-400/10 rounded">
                                                    current
                                                </span>
                                            )}
                                            <span className="hidden sm:inline text-zinc-700 text-xs font-mono ml-auto">{exp.period}</span>
                                        </div>
                                        <p className="text-zinc-500 text-sm leading-relaxed">{exp.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Timeline end cap */}
                    <motion.div
                        className="absolute left-0 sm:left-24 bottom-0 -translate-x-1/2"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 1.2 }}
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
