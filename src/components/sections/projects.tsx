"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowUpRight } from "lucide-react";
import { ProjectModal, type ProjectData } from "~/components/project-modal";
import { ScrambleText } from "~/components/effects";

const PROJECTS: ProjectData[] = [
    {
        title: "Consol8",
        description: "Full-stack inventory & accounting platform",
        longDescription:
            "A full\u2011stack web application that centralizes product inventory, purchasing, accounting, production and analytics workflows for businesses handling both raw ingredients and finished goods.",
        tech: ["Next.js 15", "TypeScript", "tRPC", "PostgreSQL", "Redis", "Docker"],
        tech_short: ["Next.js", "TypeScript", "tRPC", "PostgreSQL"],
        github: "https://github.com/christianf7/Consol8",
        demo: "https://hub.consol8.com",
        featured: true,
        hero_image: "Consol8.png",
        images: ["Consol8-5.png", "Consol8-1.png", "Consol8-2.png", "Consol8-3.png", "Consol8-4.png"],
        timeline: "4 months",
        teamSize: "Solo project",
        role: "Full-Stack Developer",
        keyFeatures: ["Multi-location inventory", "Accounting integrations", "Production tracking", "Real-time analytics"],
        challenges: ["Complex data relationships", "Real-time sync", "Scale optimization"],
        outcomes: ["$50K+ processed", "99.9% uptime", "40% faster loads"],
    },
    {
        title: "El Arquero Store",
        description: "Custom Shopify storefront for tequila brand",
        longDescription:
            "A fully customized Shopify storefront for El Arquero Tequila, blending premium brand storytelling with scalable e-commerce features.",
        tech: ["Shopify", "Liquid", "JavaScript", "Tailwind CSS"],
        github: "https://github.com/christianf7",
        demo: "https://elarquero.shop",
        hero_image: "EL.png",
        images: ["EL-1.png", "EL-2.png", "EL-3.png"],
        timeline: "1 month",
        teamSize: "Solo project",
        role: "Full-Stack Developer",
        keyFeatures: ["Custom Liquid sections", "Mobile-first design", "SEO optimization"],
        challenges: ["Brand storytelling", "Reusable components"],
        outcomes: ["Improved visibility", "Scalable foundation"],
    },
    {
        title: "El Arquero Landing",
        description: "Coming soon page with email capture",
        longDescription:
            "A sleek coming soon landing page built to introduce El Arquero Tequila, featuring email capture and modern design.",
        tech: ["Next.js", "React", "SendGrid", "Tailwind CSS"],
        github: "https://github.com/christianf7",
        demo: "https://elarquero.chrisfitz.dev",
        hero_image: "ELL.png",
        images: ["ELL-1.png", "ELL-2.png", "ELL-3.png"],
        timeline: "1 week",
        teamSize: "Solo project",
        role: "Full-Stack Developer",
        keyFeatures: ["Email signup", "Brand showcase", "Fast loading"],
        challenges: ["SendGrid integration", "Brand-first UI"],
        outcomes: ["Sub-1s load times", "Email pipeline"],
    },
];

export function ProjectsSection() {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    return (
        <section id="projects" ref={ref} className="relative py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    className="text-zinc-500 font-mono text-sm mb-4"
                >
                    002 / WORK
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="text-4xl md:text-6xl font-bold text-white mb-16"
                >
                    Selected <span className="text-zinc-500">projects</span>
                </motion.h2>

                <div className="space-y-2">
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 * index }}
                        >
                            <ProjectModal project={project}>
                                <div
                                    className="group relative block w-full p-6 md:p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm cursor-pointer hover:border-zinc-700/50 transition-colors"
                                    onMouseEnter={() => setHoveredProject(project.title)}
                                    onMouseLeave={() => setHoveredProject(null)}
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-2">
                                                <span className="text-zinc-600 font-mono text-sm">0{index + 1}</span>
                                                <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-sky-400 transition-colors">
                                                    <ScrambleText text={project.title} />
                                                </h3>
                                            </div>
                                            <p className="text-zinc-500 md:ml-12">{project.description}</p>
                                        </div>

                                        <div className="flex items-center gap-4 md:ml-8">
                                            <div className="hidden md:flex gap-2">
                                                {project.tech_short?.slice(0, 3).map((tech) => (
                                                    <span key={tech} className="px-3 py-1 bg-zinc-800 text-zinc-400 text-xs rounded-full">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-sky-500 transition-colors">
                                                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                                            </div>
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {hoveredProject === project.title && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                                className="absolute right-0 top-full mt-4 w-80 aspect-video rounded-xl overflow-hidden shadow-2xl z-50 hidden lg:block pointer-events-none"
                                            >
                                                <img
                                                    src={`/${project.hero_image}`}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </ProjectModal>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
