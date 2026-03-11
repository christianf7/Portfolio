"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const EXPERIENCES = [
    {
        role: "Web Developer",
        company: "Freelance",
        period: "2023 — Now",
        description: "Building websites and apps for startups and small businesses. 15+ projects, 100% happy clients.",
    },
    {
        role: "IT Lead",
        company: "El Arquero Tequila",
        period: "2024 — Now",
        description: "Running IT infrastructure, building custom tools, and managing the tech stack for a growing brand.",
    },
    {
        role: "Assistant Manager",
        company: "Woolworths",
        period: "2021 — Now",
        description: "Managing front-end operations. Became supervisor at 17. Often running the whole store.",
    },
    {
        role: "Java Developer",
        company: "Hypera Development",
        period: "2020 — 2022",
        description: "Built Minecraft plugins used by hundreds of servers. Learned a lot about open source.",
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

                <div className="space-y-6">
                    {EXPERIENCES.map((exp, index) => (
                        <motion.div
                            key={exp.company}
                            initial={{ opacity: 0, x: -30 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.1 * index }}
                            className="group"
                        >
                            <div className="flex flex-col md:flex-row gap-4 md:gap-8 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm hover:border-zinc-700/50 transition-colors">
                                <div className="md:w-48 shrink-0">
                                    <span className="text-zinc-500 font-mono text-sm">{exp.period}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-sky-400 transition-colors">
                                        {exp.role}
                                    </h3>
                                    <p className="text-sky-400 text-sm mb-3">{exp.company}</p>
                                    <p className="text-zinc-500">{exp.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
