"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowUpRight, Github } from "lucide-react";
import { ProjectModal, type ProjectData } from "~/components/project-modal";
import { ScrambleText } from "~/components/effects";

const PROJECTS: ProjectData[] = [
    {
        title: "Consol8",
        description: "Full-stack inventory & accounting platform",
        longDescription:
            "A full\u2011stack web application that centralizes product inventory, purchasing, accounting, production and analytics workflows for businesses handling both raw ingredients and finished goods. It is currently used by 5+ small-medium sized Australian Businesses, I am in charge of maintenence and upkeep, as well as developing new features requested by my customers.",
        tech: ["Next.js 15", "TypeScript", "tRPC", "PostgreSQL", "Redis", "Docker"],
        tech_short: ["Next.js", "TypeScript", "tRPC", "PostgreSQL"],
        visit: "https://dev.consol8.com",
        featured: true,
        hero_image: "c8/2.jpg",
        images: ["c8/2.jpg", "c8/14.jpg", "c8/1.jpg", "c8/13.jpg", "c8/4.jpg", "c8/5.jpg", "c8/6.jpg", "c8/7.jpg", "c8/8.jpg", "c8/9.jpg", "c8/10.jpg", "c8/11.jpg", "c8/12.jpg", "c8/3.jpg"],
        timeline: "9 months",
        teamSize: "Solo project",
        role: "Full-Stack Developer",
        keyFeatures: ["Multi-location inventory", "Accounting integrations", "Production tracking", "Real-time analytics", "AI Predictive forecasting and analytics", "AI invoice & PO decoder"],
        challenges: ["Complex data relationships", "Real-time sync with queue's and fail retry", "Scale optimization", "Customer Support"],
        outcomes: ["$5m+ processed in 1.5 years", "99.8% uptime", "Complex data relationships"],
    },
        {
        title: "Relio - Tinder for Events",
        description: "Networking shouldn't feel like paperwork!",
        longDescription:
            "Our submitted to test flight, IOS app submitted for Unihack 2026. Relio makes networking events smarter and more meaningful by helping you connect with the right people. Instead of wandering through a room full of strangers or leaving with forgettable contacts, Relio uses shared interests and event data to recommend the most relevant people for you to meet.",
        tech: ["TurboRepo", "NextJS", "Typescript", "PostgreSQL", "better-auth", "react-native", "TRPC", "elastic"],
        tech_short: ["Next.js", "TypeScript", "D3.js", "PostgreSQL"],
        github: "https://github.com/christianf7/Relio",
        visit: "https://devpost.com/software/relio",
        hero_image: "relio/1.jpg",
        images: [{
            type: "youtube",
            youtubeId: "aVCHk7Cjnmk",
            title: "Relio"
        }, "relio/1.jpg", "relio/2.jpg", "relio/3.jpg", "relio/4.jpg", "relio/5.jpg"],
        timeline: "3 days...",
        teamSize: "6 people",
        role: "Full-Stack Developer",
        keyFeatures: ["LinkedIn Integration", "Elastic Search for AI-Powered Insights", "Working with a team of 6 people using GIT", "Weekly reports"],
        challenges: ["Very limited time", "First proper IOS app"],
        outcomes: ["500+ data points tracked", "Real-time updates", "Custom insights"],
    },
    {
        title: "El*Arquero Store",
        description: "Custom Shopify storefront for tequila brand",
        longDescription:
            "A custom Shopify headless storefront for El*Arquero Tequila, featuring a custom design and a focus on brand storytelling. Secondary focus on SEO and performance optimization, especially for mobile devices.",
        tech: ["Shopify", "Liquid", "JavaScript", "Tailwind CSS"],
        visit: "https://elarquero.com",
        hero_image: "el/1.jpg",
        images: ["el/1.jpg", "el/el-00002.png", "el/el-00003.png", "el/el-00004.png", "el/el-00005.png", "el/el-00006.png", "el/el-00007.png", "el/el-00008.png", "el/el-00009.png", "el/el-00010.png", "el/el-00011.png", "el/el-00012.png", "el/el-00013.png", "el/el-00014.png"],
        timeline: "1 month",
        teamSize: "Solo project",
        role: "Full-Stack Developer",
        keyFeatures: ["Headless shopify storefront", "Mobile-first design", "SEO optimization"],
        challenges: ["Brand storytelling", "Reusable components", "Performance optimization"],
        outcomes: ["Improved visibility", "Scalable foundation", "An online store selling $thousand's every month"],
    },
    {
        title: "Per Vocem Vita",
        description: "Headless WordPress site for a non-profit",
        longDescription:
            "A headless WordPress website built for Per Vocem Vita, a registered Australian charity that delivers free public speaking and debating workshops to primary school students. The site uses WordPress as a headless CMS for blog content and event management, with a custom-built frontend delivering a fast, modern experience. Designed to help the organisation reach more schools and volunteers across Melbourne.",
        tech: ["WordPress", "PHP", "REST API", "JavaScript", "CSS", "Responsive Design"],
        tech_short: ["WordPress", "Headless CMS", "PHP", "REST API"],
        visit: "https://pervocemvita.org",
        hero_image: "pvv/pvv.jpg",
        images: ["pvv/pvv.jpg", "pvv/pvv-00001.png", "pvv/pvv-00002.png", "pvv/pvv-00003.png", "pvv/pvv-00004.png", "pvv/pvv-00005.png", "pvv/pvv-00006.png", "pvv/pvv-00007.png"],
        timeline: "1 month",
        teamSize: "Solo project",
        role: "Full-Stack Developer",
        keyFeatures: ["Headless WordPress CMS", "Blog & event management", "Mobile-first responsive design", "SEO optimized", "Custom theme & branding"],
        challenges: ["Headless WordPress architecture", "Non-profit stakeholder requirements", "Content management for non-technical users", "Performance on shared hosting"],
        outcomes: ["500+ students reached", "20+ workshops promoted", "Scalable content platform for the charity"],
    },
    {
        title: "Blog / News Software (YAGA)",
        description: "Built from scratch news / blog site",
        longDescription:
            "(No longer active) A community-driven publishing platform built for young Australians to voice their perspectives on pressing issues. Explore articles, join discussions, and contribute to a movement towards a more inclusive and progressive Australia. Build from scratch in 2023.",
        tech: ["NextJS 14", "Mantine", "MongoDB", "NextAuth.js", "Cloudflare R2 & Workers", "Typescript"],
        tech_short: ["Next.JS", "MongoDB", "NextAuth.js", "Cloudflare R2 & Workers"],
        github: "https://github.com/christianf7/yaga",
        hero_image: "yaga/yaga.png",
        images: ["yaga/yaga-00002.png", "yaga/yaga-00001.png", "yaga/yaga-00003.png", "yaga/yaga-00004.png", "yaga/yaga-00005.png", "yaga/yaga-00006.png", "yaga/yaga-00007.png"],
        timeline: "2 months",
        teamSize: "2 people",
        role: "Full-Stack Developer",
        keyFeatures: ["Article Publishing", "Approval Workflow", "Featured Content", "Comments & Likes", "Role-Based Access", "User Dashboard", "Authentication", "Image Storage", "Dark Mode"],
        challenges: ["Spam / content filtering", "Image storage/optimization", "Social/oauth login"],
        outcomes: ["A community driven blog platform"],
    },
    {
        title: "ConnectMyPool",
        description: "Home Assistant integration for AstralPool systems",
        longDescription:
            "A custom Home Assistant integration for controlling AstralPool pool and spa systems through the ConnectMyPool cloud API. Features automatic equipment discovery, climate control for heaters, lighting zone management with colour programs, channel cycling logic, and a built-in Lovelace dashboard card with animated gauges and real-time controls. Handles API throttling gracefully and supports full diagnostics.",
        tech: ["Python", "Home Assistant", "HACS", "REST API", "Lovelace", "JavaScript"],
        tech_short: ["Python", "Home Assistant", "REST API"],
        github: "https://github.com/christianf7/hacs-connectmypool",
        images: [],
        hero_image: "cmp.jpg",
        timeline: "2 weeks",
        teamSize: "Solo project",
        role: "Developer",
        keyFeatures: ["Automatic equipment discovery", "Climate & lighting control", "Custom Lovelace dashboard card", "API throttle handling", "Channel cycling logic", "Full diagnostics support"],
        challenges: ["Reverse-engineering pool API", "Cycling-based mode control", "60-second API throttle", "Dynamic entity creation"],
        outcomes: ["Open-source on GitHub", "Published to HACS", "Full pool automation from Home Assistant"],
    },
    {
        title: "Swiftter",
        description: "Express API framework with built-in routing & auth",
        longDescription:
            "A Node.js framework for quickly building and testing powerful Express APIs with built-in dynamic route handling, authentication strategies, middleware management, and structured logging. Designed to let developers focus on business logic rather than boilerplate, Swiftter includes a CLI for project scaffolding, typed route definitions, and a modular architecture for scaling APIs effortlessly.",
        tech: ["TypeScript", "Node.js", "Express", "NPM"],
        tech_short: ["TypeScript", "Node.js", "Express"],
        github: "https://github.com/christianf7/Swiftter",
        images: [],
        hero_image: "swf/swf.png",
        timeline: "3 weeks",
        teamSize: "Solo project",
        role: "Developer",
        keyFeatures: ["Dynamic file-based routing", "Built-in authentication strategies", "Structured logging system", "CLI project scaffolding", "Middleware management", "Session & CORS support"],
        challenges: ["Designing an intuitive API surface", "Dynamic route resolution from filesystem", "Flexible authentication architecture", "TypeScript type safety across the framework"],
        outcomes: ["Published to NPM", "Open-source on GitHub", "Reusable across multiple projects"],
    },
    {
        title: "TextHive",
        description: "Invite-only web library for study resources",
        longDescription:
            "An invite-only web library for browsing and reading study resources — textbooks, English texts, exams and non-VCE material. Files live in a directory on the server; TextHive puts an authenticated, browsable interface in front of them, so a known group of students can find and read resources without the files being publicly addressable. Features in-browser PDF reading, favourites, and an admin panel for user management.",
        tech: ["Next.js 15", "TypeScript", "tRPC", "Prisma", "MySQL", "NextAuth", "Mantine"],
        tech_short: ["Next.js", "tRPC", "Prisma", "MySQL"],
        github: "https://github.com/christianf7/TextHive",
        hero_image: "th/th-00001.png",
        images: ["th/th-00001.png", "th/th-00002.png", "th/th-00003.png", "th/th-00004.png"],
        timeline: "2 weeks",
        teamSize: "Solo project",
        role: "Full-Stack Developer",
        keyFeatures: ["Invite-only signup system", "In-browser PDF streaming", "Folder tree browsing", "Favourites system", "Role-based access control", "Admin panel"],
        challenges: ["Secure file streaming without public URLs", "Invite-only auth flow", "Dynamic filesystem mirroring", "JWT session with role sync"],
        outcomes: ["Used by a group of students", "Secure resource distribution", "Zero public file exposure"],
    },
    {
        title: "Embedded Actions",
        description: "Custom GitHub Actions library for Discord webhooks",
        longDescription:
            "A custom GitHub Actions library that sends styled webhook notifications to Discord channels. Allows teams to get beautifully formatted build, deployment, and CI/CD notifications directly in their Discord servers with full customization of the webhook appearance and content.",
        tech: ["TypeScript", "GitHub Actions", "Discord API", "Node.js", "Jest"],
        tech_short: ["TypeScript", "GitHub Actions", "Discord API"],
        github: "https://github.com/christianf7/Embedded-Actions",
        images: [],
        hero_image: "ea/ea.png",
        timeline: "1 week",
        teamSize: "Solo project",
        role: "Developer",
        keyFeatures: ["Custom Discord webhook styling", "GitHub Actions integration", "Configurable notification templates", "CI/CD event support", "TypeScript type safety"],
        challenges: ["Discord API rate limiting", "Flexible template system", "Action input validation", "Cross-platform testing"],
        outcomes: ["Open-source on GitHub", "1 star", "333+ commits", "Reusable across repositories"],
    },
];

export function ProjectsSection() {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section id="projects" ref={ref} className="relative py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 * index }}
                        >
                            <ProjectModal project={project}>
                                <div className="group block w-full h-full rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm cursor-pointer hover:border-zinc-700/50 transition-colors overflow-hidden">
                                    <div className="relative h-40 sm:h-48 overflow-hidden">
                                        <img
                                            src={`/${project.hero_image}`}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                                        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="text-zinc-400 font-mono text-xs">0{index + 1}</span>
                                                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-400 transition-colors">
                                                        <ScrambleText text={project.title} />
                                                    </h3>
                                                </div>
                                                <p className="text-zinc-400 text-sm">{project.description}</p>
                                            </div>
                                            <div className="w-9 h-9 shrink-0 rounded-full bg-zinc-800/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-sky-500 transition-colors">
                                                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-5 py-3 flex flex-wrap gap-2">
                                        {(project.tech_short ?? project.tech.slice(0, 4)).map((tech) => (
                                            <span key={tech} className="px-3 py-1 bg-zinc-800/80 text-zinc-400 text-xs rounded-full">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </ProjectModal>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 * PROJECTS.length }}
                    >
                        <a
                            href="https://github.com/christianf7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block w-full h-full rounded-2xl bg-zinc-900/50 border border-zinc-800/50 border-dashed backdrop-blur-sm hover:border-sky-500/40 transition-all duration-300 overflow-hidden"
                        >
                            <div className="flex flex-col items-center justify-center h-full min-h-[13rem] sm:min-h-[15.5rem] px-6 py-6 text-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-zinc-800/80 flex items-center justify-center group-hover:bg-sky-500/20 group-hover:scale-110 transition-all duration-300">
                                    <Github className="w-7 h-7 text-zinc-500 group-hover:text-sky-400 transition-colors duration-300" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-sky-400 transition-colors">
                                        <ScrambleText text="Want to see more?" />
                                    </h3>
                                    <p className="text-zinc-500 text-sm max-w-[20rem]">
                                        Check out my GitHub for more projects, open-source contributions, and the source code for this portfolio.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-500 group-hover:text-sky-400 transition-colors text-sm font-mono">
                                    <span>github.com/christianf7</span>
                                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </div>
                            </div>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
