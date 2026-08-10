"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowUpRight, Github } from "lucide-react";
import { ProjectModal, type ProjectData } from "~/components/project-modal";
import { ScrambleText, GlitchText } from "~/components/effects";

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
        title: "ScanPoint",
        description: "Kiosk attendance SaaS with offline-first sync",
        longDescription:
            "A multi-app kiosk sign-in SaaS built as a Turborepo monorepo. ScanPoint lets organisations provision self-service kiosks that record attendance scans offline in IndexedDB, then converge automatically when connectivity returns. The platform spans four Next.js apps — a marketing site, an identity/auth service, an organisation dashboard, and a progressive web app for the kiosks themselves — backed by PostgreSQL with custom triggers for device synchronisation.",
        tech: ["Next.js 16", "TypeScript", "tRPC 11", "Prisma 7", "PostgreSQL", "Better Auth", "Turborepo", "Docker"],
        tech_short: ["Next.js", "TypeScript", "tRPC", "PostgreSQL"],
        github: "https://github.com/christianf7/ScanPoint",
        visit: "https://scanpoint.app",
        hero_image: "sp/sp-00002.png",
        images: ["sp/sp-00002.png", "sp/sp-00003.png", "sp/sp-00004.png", "sp/sp-00005.png", "sp/sp-00007.png", "sp/sp-00008.png", "sp/sp-00009.png", "sp/sp-00001.png", "sp/sp-00012.png", "sp/sp-00011.png", "sp/sp-00010.png"],
        timeline: "Ongoing",
        teamSize: "Solo project",
        role: "Full-Stack Developer",
        keyFeatures: ["Offline-first kiosk PWA with IndexedDB", "Multi-app Turborepo monorepo", "Device provisioning with single-use codes", "Automatic offline-to-online sync", "Organisation-scoped dashboard", "Docker Compose production deployment"],
        challenges: ["Offline-first architecture with eventual consistency", "Cross-app shared authentication cookies", "Device vs human identity separation", "PostgreSQL trigger-based sync"],
        outcomes: ["Four coordinated Next.js apps", "Zero-downtime kiosk operation", "Production Docker deployment with Cloudflare Tunnel"],
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
    }
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
                    className="text-4xl md:text-6xl font-bold text-white mb-16 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                >
                    Selected <GlitchText className="text-sky-400">projects</GlitchText>
                </motion.h2>

                <div className="space-y-px rounded-2xl overflow-hidden border border-zinc-800/60">
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.06 * index }}
                        >
                            <ProjectModal project={project}>
                                <div className="group relative flex items-stretch cursor-pointer bg-zinc-950/60 hover:bg-zinc-900/80 transition-all duration-300 border-b border-zinc-800/40 last:border-b-0">
                                    <div className="hidden sm:block relative w-44 md:w-56 shrink-0 overflow-hidden">
                                        <img
                                            src={`/${project.hero_image}`}
                                            alt={project.title}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-950/80" />
                                    </div>

                                    <div className="flex-1 flex items-center justify-between gap-4 px-5 sm:px-6 py-5">
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="text-zinc-600 font-mono text-[11px] tabular-nums">
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>
                                                <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-sky-400 transition-colors truncate">
                                                    <ScrambleText text={project.title} />
                                                </h3>
                                            </div>
                                            <p className="text-zinc-500 text-sm leading-snug mb-2.5 line-clamp-1">{project.description}</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {(project.tech_short ?? project.tech.slice(0, 4)).map((tech) => (
                                                    <span key={tech} className="px-2 py-0.5 bg-zinc-800/60 text-zinc-500 text-[11px] rounded-md font-mono">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="w-8 h-8 shrink-0 rounded-full border border-zinc-700/50 flex items-center justify-center group-hover:border-sky-500 group-hover:bg-sky-500/10 transition-all duration-300">
                                            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                                        </div>
                                    </div>
                                </div>
                            </ProjectModal>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.06 * PROJECTS.length }}
                    >
                        <a
                            href="https://github.com/christianf7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 px-5 sm:px-6 py-5 bg-zinc-950/40 hover:bg-zinc-900/60 transition-all duration-300"
                        >
                            <div className="w-10 h-10 rounded-full bg-zinc-800/60 border border-zinc-700/40 flex items-center justify-center group-hover:border-sky-500/50 group-hover:bg-sky-500/10 transition-all duration-300">
                                <Github className="w-5 h-5 text-zinc-500 group-hover:text-sky-400 transition-colors duration-300" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-white group-hover:text-sky-400 transition-colors">
                                    <ScrambleText text="Want to see more?" />
                                </h3>
                                <p className="text-zinc-600 text-xs font-mono">github.com/christianf7</p>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
