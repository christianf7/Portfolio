"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MessageSquare } from "lucide-react";

const EXPERIENCES = [
    {
        role: "Fullstack / Web Developer",
        company: "Freelance",
        period: "2023 — Now",
        description: "Building websites and apps for startups and small businesses. 15+ projects, 100% happy clients. ",
        enquireForReferences: true,
    },
    {
        role: "IT Lead",
        company: "El*Arquero Tequila",
        period: "2024 — Now",
        description: "Running IT infrastructure, building custom tools, and managing the tech stack for a growing brand employing 15+ people, with distribution accross 300+ venues/locations.",
        enquireForReferences: true,
    },
    {
        role: "Assistant Customer Service Manager",
        company: "Woolworths Mount Waverley",
        period: "2021 — Now",
        description: "Managing front-end operations. Became a supervisor at 17, then a manager at 19. Often leading the whole store on nights and weekends. Duties include ensuring deparnment and store is meeting KPI's, building weekly rosters, handling customer complaints, training new staff, and more.",
        enquireForReferences: true,
    },
    {
        role: "Java Developer",
        company: "Hypera Development",
        period: "2020 — 2022",
        description: "Built Minecraft plugins used by hundreds of servers. Learned a lot about open source, and building in teams using GIT and CI.",
        enquireForReferences: false,
    },
];

export function ExperienceSection() {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section id="experience" ref={ref} className="relative py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
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
                    className="text-4xl md:text-6xl font-bold text-white mb-16"
                >
                    Where I&apos;ve <span className="text-zinc-500">worked</span>
                </motion.h2>

                <div className="relative">
                    <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-sky-500/50 via-sky-500/20 to-transparent" />

                    <div className="space-y-0">
                        {EXPERIENCES.map((exp, index) => (
                            <motion.div
                                key={exp.company}
                                initial={{ opacity: 0, x: -30 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.15 * index }}
                                className="relative pl-12 md:pl-20 pb-12 last:pb-0 group"
                            >
                                <div className="absolute left-4 md:left-8 top-2 -translate-x-1/2 z-10">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={inView ? { scale: 1 } : {}}
                                        transition={{ delay: 0.15 * index + 0.2, type: "spring", stiffness: 300 }}
                                        className="relative"
                                    >
                                        <div className="w-4 h-4 rounded-full border-2 border-sky-500 bg-zinc-950 group-hover:bg-sky-500 transition-colors duration-300" />
                                        <div className="absolute inset-0 w-4 h-4 rounded-full bg-sky-500/20 animate-ping" style={{ animationDuration: "3s" }} />
                                    </motion.div>
                                </div>

                                <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm hover:border-sky-500/30 transition-all duration-300 p-6 group-hover:bg-zinc-900/70">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                                        <div>
                                            <h3 className="text-xl font-semibold text-white group-hover:text-sky-400 transition-colors">
                                                {exp.role}
                                            </h3>
                                            <p className="text-sky-400 text-sm">{exp.company}</p>
                                        </div>
                                        <span className="text-zinc-500 font-mono text-sm shrink-0 px-3 py-1 bg-zinc-800/50 rounded-full w-fit">
                                            {exp.period}
                                        </span>
                                    </div>
                                    <p className="text-zinc-400 leading-relaxed">{exp.description}</p>

                                    {exp.enquireForReferences && (
                                        <div className="mt-4 flex items-center gap-2 text-zinc-500 text-sm">
                                            <MessageSquare className="w-3.5 h-3.5" />
                                            <span className="italic">Please enquire for references</span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
