"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef, useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { Progress } from "~/components/ui/progress";
import { ProjectModal, type ProjectData } from "~/components/project-modal";
import { MouseScrollIcon } from "~/components/mouse-scroll-icon";
import {
    Github,
    Linkedin,
    Mail,
    ExternalLink,
    Code2,
    Palette,
    Zap,
    MapPin,
    Calendar,
    Briefcase,
    Star,
    ArrowRight
} from "lucide-react";

// Floating particles component
const FloatingParticles = () => {
    const [mounted, setMounted] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });

    useEffect(() => {
        setMounted(true);
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });

        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!mounted) {
        return <div className="absolute inset-0 overflow-hidden pointer-events-none" />;
    }

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-teal-400/30 rounded-full"
                    initial={{
                        x: Math.random() * dimensions.width,
                        y: Math.random() * dimensions.height,
                    }}
                    animate={{
                        x: Math.random() * dimensions.width,
                        y: Math.random() * dimensions.height,
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};

const scrollToSection = (sectionId: string) => {
    if (sectionId === "hero") {
        // Scroll to the very top of the page for home
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: "smooth" });
    }
};

// Navigation component
const Navigation = () => {
    const [activeSection, setActiveSection] = useState("hero");

    const navItems = [
        { id: "hero", label: "Home" },
        { id: "about", label: "About" },
        { id: "projects", label: "Projects" },
        { id: "experience", label: "Experience" },
        { id: "contact", label: "Contact" },
    ];

    return (
        <motion.nav
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-black/20 backdrop-blur-lg border border-white/10 rounded-full px-6 py-3"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
        >
            <div className="flex gap-6">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`text-sm transition-all duration-300 hover:text-teal-400 cursor-pointer ${activeSection === item.id ? "text-teal-400" : "text-white/70"
                            }`}
                        data-clickable="true"
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </motion.nav>
    );
};

// Hero section
const HeroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: false, // Allow re-triggering when scrolling back
    });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

    return (
        <motion.section
            id="hero"
            ref={(node) => {
                containerRef.current = node as HTMLDivElement;
                ref(node);
            }}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
            style={{ y, opacity }}
        >
            <FloatingParticles />

            <div className="relative z-10 text-center px-4">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8"
                >
                    <motion.h1
                        className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-teal-400 via-emerald-500 to-orange-500 bg-clip-text text-transparent mb-4"
                        initial={{ y: 50 }}
                        animate={inView ? { y: 0 } : { y: 50 }}
                        transition={{ delay: 0.2 }}
                    >
                        Christian
                    </motion.h1>

                    <motion.div
                        className="text-2xl md:text-4xl text-white/80 mb-6"
                        initial={{ y: 50, opacity: 0 }}
                        animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <span className="inline-block">Full-Stack Developer</span>
                        <motion.span
                            className="inline-block ml-2"
                            animate={{ rotate: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            👋
                        </motion.span>
                    </motion.div>
                </motion.div>

                <motion.p
                    className="text-xl text-white/60 max-w-2xl mx-auto mb-8 leading-relaxed"
                    initial={{ y: 50, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    I craft exceptional digital experiences with modern technologies.
                    Passionate about clean code, innovative solutions, and bringing ideas to life.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    initial={{ y: 50, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <Button
                        onClick={() => scrollToSection("projects")}
                        size="lg"
                        className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white border-0 px-8 py-6 text-lg group cursor-pointer"
                        data-clickable="true"
                    >
                        View My Work
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    <Button
                        onClick={() => scrollToSection("contact")}
                        size="lg"
                        className="border-white/30 text-white hover:bg-white/10 hover:border-white/40 px-8 py-6 text-lg cursor-pointer"
                        data-clickable="true"
                    >
                        Get In Touch
                    </Button>
                </motion.div>

            </div>

            {/* Mouse scroll icon at the very bottom of the hero section */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                <MouseScrollIcon />
            </div>

            {/* Animated background elements */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, -30, 0]
                }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, -50, 0],
                    y: [0, 30, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            />
        </motion.section>
    );
};

// About section
const AboutSection = () => {
    const [ref, inView] = useInView({
        threshold: 0.3,
    });

    const skills = [
        { name: "React/Next.js/Typescript", level: 90 },
        { name: "Node.js", level: 100 },
        { name: "PostgreSQL", level: 85 },
        { name: "AWS/Cloud", level: 75 },
        { name: "Docker", level: 80 },
        { name: "Git", level: 90 },
        { name: "Linux", level: 100 },
    ];

    const tools = [
        "React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL",
        "MongoDB", "AWS", "Docker", "Git", "Linux", "Tailwind CSS"
    ];

    return (
        <section id="about" ref={ref} className="py-20 bg-slate-950">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        About <span className="bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">Me</span>
                    </h2>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto">
                        I'm a passionate developer who loves creating beautiful, functional, and user-friendly applications
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <Code2 className="text-teal-400" />
                                    My Story
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-white/70 space-y-4">
                                <p>
                                    With over 5 years of experience in full-stack development, I started when I was extremely young.
                                    I remember being 11 and creating my first BATCH scripts on my primary school laptop.
                                </p>
                                <p>
                                    My name is Christian Fitzgerald, and I’m currently finishing Year 12 with plans to graduate in 2025. I consider myself a full-stack web developer, with strong skills in building scalable web applications that solve real-world problems.
                                    While I prefer working on full-stack web applications, I also have broad knowledge across multiple technical areas, including backend REST APIs, CI/CD pipelines, network engineering, software engineering, DevOps, and Linux server management.
                                    I’m passionate about creating clean, efficient solutions and continuously expanding my skills to stay ahead in modern software development.
                                </p>
                                <div className="flex gap-2 flex-wrap mt-4">
                                    {tools.map((tool, index) => (
                                        <motion.div
                                            key={tool}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                                            transition={{ delay: 0.4 + index * 0.1 }}
                                        >
                                            <Badge variant="secondary" className="bg-teal-500/20 text-teal-300 border-teal-500/30">
                                                {tool}
                                            </Badge>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <Zap className="text-yellow-400" />
                                    Skills & Expertise
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {skills.map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={inView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.6 + index * 0.1 }}
                                        className="space-y-2"
                                    >
                                        <div className="flex justify-between text-white">
                                            <span>{skill.name}</span>
                                            <span>{skill.level}%</span>
                                        </div>
                                        <Progress
                                            value={inView ? skill.level : 0}
                                            className="h-2 bg-slate-700"
                                        />
                                    </motion.div>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Projects section
const ProjectsSection = () => {
    const [ref, inView] = useInView({
        threshold: 0.2,
    });

    const projects: ProjectData[] = [
        {
            title: "Consol8",
            description: "Unified inventory, production, ordering & accounting console",
            longDescription: "A full‑stack web application that centralizes product inventory, purchasing, accounting, production and analytics workflows for businesses handling both raw ingredients and finished goods. Modules cover ordering, stock movements across locations, customer and supplier records, invoicing, reporting, sample stock tracking, accounting integrations and building / manufacturing products.",
            tech: ["NextJS 15 & React 18", "Typescript", "TRPC", "Prisma ORM & PostgreSQL", "Keycloak", "Tailwind CSS & Shadcn UI", "Redis", "Google Cloud", "Cloudflare R2", "Xero & MYOB", "Docker", "Bun & NPM", "Sendgrid"],
            tech_short: ["Next.js   ", "Typescript", "TRPC", "PostgreSQL", "Redis"],
            github: "https://github.com/christianf7/Consol8",
            demo: "https://hub.consol8.com",
            featured: false,
            hero_image: "Consol8.png",
            images: ["Consol8-5.png", "Consol8-1.png", "Consol8-2.png", "Consol8-3.png", "Consol8-4.png", "Consol8-6.png", "Consol8-7.png", "Consol8-8.png", "Consol8-9.png", "Consol8-10.png"],
            timeline: "4 months",
            teamSize: "Solo project",
            role: "Full-Stack Developer",
            keyFeatures: [
                "User authentication and authorization",
                "Product catalog with search and filtering",
                "Shopping cart and checkout process",
                "Payment integration with Stripe",
                "Admin dashboard for inventory management",
                "Responsive design for all devices"
            ],
            challenges: [
                "Implementing secure payment processing",
                "Optimizing database queries for large product catalogs",
                "Building real-time inventory updates"
            ],
            outcomes: [
                "Successfully processed $50K+ in transactions",
                "Achieved 99.9% uptime",
                "Reduced page load times by 40%"
            ]
        },
        {
            title: "El Arquero - Shopify Storefront",
            description: "Custom Shopify storefront with tailored design and SEO optimization",
            longDescription: "A fully customized Shopify storefront for El Arquero Tequila, blending premium brand storytelling with scalable e-commerce features and built-in SEO optimization.",
            tech: ["Shopify", "Liquid", "JavaScript", "Tailwind CSS", "SEO"],
            github: "https://github.com/christianf7",
            demo: "https://elarquero.shop",
            hero_image: "EL.png",
            images: ["EL-1.png", "EL-2.png", "EL-3.png"],
            timeline: "1 month",
            teamSize: "Solo project",
            role: "Full-Stack Developer",
            keyFeatures: [
                "Custom Shopify Liquid sections",
                "Responsive, mobile-first layouts",
                "SEO-optimized structure for discoverability",
                "Recipe and cocktail showcase pages",
                "Optimized checkout experience"
            ],
            challenges: [
                "Balancing brand storytelling with e-commerce usability",
                "Building scalable and reusable Liquid components",
                "Implementing SEO best practices for Shopify"
            ],
            outcomes: [
                "Improved brand visibility through SEO optimization",
                "Delivered a scalable foundation for marketing campaigns",
                "Enhanced customer engagement with recipe showcases"
            ]
        },
        {
            title: "El Arquero - Coming Soon",
            description: "Landing page for El Arquero Tequila with email signup and brand showcase",
            longDescription: "A sleek coming soon landing page built to introduce El Arquero Tequila, featuring email capture, contact integration, and a modern brand-focused design.",
            tech: ["Next.js", "React", "SendGrid", "Tailwind CSS", "SEO Optimisation"],
            github: "https://github.com/christianf7",
            demo: "https://elarquero.chrisfitz.dev",
            hero_image: "ELL.png",
            images: ["ELL-1.png", "ELL-2.png", "ELL-3.png"],
            timeline: "1 week",
            teamSize: "Solo project",
            role: "Full-Stack Developer",
            keyFeatures: [
                "Responsive landing page design",
                "Email signup with SendGrid integration",
                "Contact list management",
                "Brand showcase with hero imagery",
                "Optimized for fast loading and SEO"
            ],
            challenges: [
                "Integrating SendGrid for secure email handling",
                "Designing a brand-first UI that matched client vision",
                "Ensuring responsive layouts across all devices"
            ],
            outcomes: [
                "Built a scalable launch platform for brand awareness",
                "Successfully integrated email capture pipeline",
                "Optimized landing page with sub-1s load times"
            ]
        },
        {
            title: "Christian Fitzgerald - Portfolio",
            description: "Personal portfolio showcasing full-stack projects with SEO optimization",
            longDescription: "A modern developer portfolio built with Next.js and React, highlighting full-stack projects with a focus on clean design, scalability, and SEO optimization for visibility.",
            tech: ["Next.js", "React", "Tailwind CSS", "Shadcn UI", "SEO", "TRPC"],
            github: "https://github.com/christianf7/Portfolio",
            demo: "https://chrisfitz.dev",
            hero_image: "Portfolio.png",
            images: ["Portfolio.png"],
            timeline: "2 weeks",
            teamSize: "Solo project",
            role: "Full-Stack Developer",
            keyFeatures: [
                "Showcase of full-stack projects",
                "Responsive and mobile-first design",
                "SEO-optimized for discoverability",
                "Clean and modern UI with Tailwind CSS",
                "Deployed on Vercel for fast global performance"
            ],
            challenges: [
                "Structuring projects for clarity and scalability",
                "Ensuring consistent branding across pages",
                "Implementing strong SEO practices for higher ranking"
            ],
            outcomes: [
                "Built a professional online presence",
                "Improved visibility through SEO optimization",
                "Created a scalable platform to showcase future work"
            ]
        }

    ];

    return (
        <section id="projects" ref={ref} className="py-20 bg-slate-900">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Featured <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">Projects</span>
                    </h2>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto">
                        A showcase of my recent work and side projects
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={project.featured ? "md:col-span-2" : ""}
                        >
                            <ProjectModal project={project}>
                                <Card className="bg-slate-800/50 border-slate-700 pt-0 overflow-hidden group hover:bg-slate-800/70 transition-all duration-300 cursor-pointer">
                                    <div className="relative overflow-hidden">
                                        <div className="w-full h-48 relative">
                                            <img
                                                src={`/${project.hero_image}`}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    // Fallback to gradient background if image fails to load
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                    const parent = target.parentElement;
                                                    if (parent) {
                                                        parent.classList.add('bg-gradient-to-br', 'from-teal-500/20', 'to-emerald-500/20', 'flex', 'items-center', 'justify-center');
                                                        parent.innerHTML = '<div class="text-white/30 text-center"><div class="text-4xl mb-2">🖼️</div><p>Project Image</p></div>';
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <Button size="sm" className="cursor-pointer bg-teal-600 hover:bg-teal-700">
                                                More Info
                                            </Button>
                                        </div>
                                    </div>

                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-white">{project.title}</CardTitle>
                                            {project.featured && (
                                                <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                                                    <Star className="w-3 h-3 mr-1" />
                                                    Featured
                                                </Badge>
                                            )}
                                        </div>
                                        <CardDescription className="text-white/60">
                                            {project.description}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="flex gap-2 flex-wrap">
                                            {(project.tech_short ?? project.tech).map((tech) => (
                                                <Badge key={tech} variant="outline" className="border-teal-500/30 text-teal-300">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </ProjectModal>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Experience section
const ExperienceSection = () => {
    const [ref, inView] = useInView({
        threshold: 0.3,
    });

    const experiences = [
        {
            company: "Freelance",
            position: "Web Developer",
            period: "2023 - Present",
            location: "Remote",
            description: "Built websites and applications for small businesses and startups.",
            achievements: [
                "Completed 15+ private projects",
                "Maintained 100% client satisfaction",
                "Built scalable and reusable codebases"
            ],
        },
        {
            company: "El Arquero Tequila",
            position: "IT",
            period: "2024 - Present",
            location: "Melbourne, AU",
            description: "Managed the IT infrastructure and website for El Arquero Tequila, including the Shopify storefront and email marketing campaigns.",
            achievements: [
                "Manage and upkeep Workspace, and other critical services for business",
                "Develop custom tooling and automation for business",
                "Managed email marketing campaigns",
                "Developed Consol8, a full-stack web application for inventory and accounting"
            ],
        },
        {
            company: "Woolworths Mount Waverley",
            position: "Assistant Department Manager / Supervisor",
            period: "2021 - Present",
            location: "Melbourne, AU",
            description: "Manage the front end department at Woolworths Mount Waverley, including assisting rostering, reporting, training, and daily upkeep of department",
            achievements: [
                "Rolled out / maintained new online picking system",
                "Reached team supervisor at age of 17",
                "Often in charge of entire store when managers are absent"
            ],
        },
        {
            company: "Hypera Development",
            position: "Java & Web Developer",
            period: "2020 - 2022",
            location: "Remote",
            description: "Developed custom Java plugins for Minecraft, including popular ones like UltraStaffChat",
            achievements: [
                "Contributed on a plugin used by hundreds of servers"
            ]
        },
    ];

    return (
        <section id="experience" ref={ref} className="py-20 bg-slate-950">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Work <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Experience</span>
                    </h2>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto">
                        My professional journey and key achievements
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.company}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="relative"
                        >
                            {/* Timeline line */}
                            {index < experiences.length - 1 && (
                                <div className="absolute left-8 top-20 w-0.5 h-32 bg-gradient-to-b from-teal-500 to-emerald-500" />
                            )}

                            {/* Timeline dot */}
                            <div className="absolute left-6 top-8 w-4 h-4 bg-teal-500 rounded-full border-4 border-slate-950" />

                            <Card className="ml-16 mb-8 bg-slate-900/50 border-slate-700 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                        <div>
                                            <CardTitle className="text-white text-xl">{exp.position}</CardTitle>
                                            <CardDescription className="text-teal-400 text-lg font-medium">
                                                {exp.company}
                                            </CardDescription>
                                        </div>
                                        <div className="flex flex-col md:items-end gap-1">
                                            <Badge variant="outline" className="border-orange-500/30 text-orange-300 w-fit">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {exp.period}
                                            </Badge>
                                            <Badge variant="outline" className="border-green-500/30 text-green-300 w-fit">
                                                <MapPin className="w-3 h-3 mr-1" />
                                                {exp.location}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-white/70 mb-4">{exp.description}</p>
                                    <div className="space-y-2">
                                        <h4 className="text-white font-medium flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-teal-400" />
                                            Key Achievements:
                                        </h4>
                                        <ul className="space-y-1">
                                            {exp.achievements.map((achievement, i) => (
                                                <li key={i} className="text-white/60 flex items-start gap-2">
                                                    <span className="text-green-400 mt-1.5">•</span>
                                                    {achievement}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Contact section
const ContactSection = () => {
    const [ref, inView] = useInView({
        threshold: 0.3,
    });

    const contactMethods = [
        {
            icon: Mail,
            title: "Email",
            value: "christian@chrisfitz.dev",
            href: "mailto:christian@chrisfitz.dev",
            color: "text-teal-400",
        },
        {
            icon: Linkedin,
            title: "LinkedIn",
            value: "/in/christianf7",
            href: "https://linkedin.com/in/christianf7",
            color: "text-blue-500",
        },
        {
            icon: Github,
            title: "GitHub",
            value: "@christianf7",
            href: "https://github.com/christianf7",
            color: "text-emerald-400",
        },
    ];

    return (
        <section id="contact" ref={ref} className="py-20 bg-slate-900">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Let's <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Connect</span>
                    </h2>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto">
                        I'm always interested in new opportunities and interesting projects
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {contactMethods.map((method, index) => (
                        <motion.a
                            key={method.title}
                            href={method.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="block"
                        >
                            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 group cursor-pointer">
                                <CardContent className="p-6 text-center">
                                    <method.icon className={`w-12 h-12 mx-auto mb-4 ${method.color} group-hover:scale-110 transition-transform`} />
                                    <h3 className="text-white font-semibold text-lg mb-2">{method.title}</h3>
                                    <p className="text-white/60 group-hover:text-white/80 transition-colors">{method.value}</p>
                                </CardContent>
                            </Card>
                        </motion.a>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 px-8 py-6 text-lg cursor-pointer"
                    >
                        Download Resume
                    </Button>
                </motion.div>

                <Separator className="my-12 bg-slate-700" />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center"
                >
                    <p className="text-white/40">
                        © 2024 Christian Fitzgerald. Built with Next.js, Tailwind CSS, and Framer Motion.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default function Home() {
    return (
        <div className="relative bg-slate-900">
            <Navigation />
            <HeroSection />
            {/* Gradient transition between hero and about */}
            <div className="h-20 bg-gradient-to-b from-slate-900 to-slate-950"></div>
            <AboutSection />
            <ProjectsSection />
            <ExperienceSection />
            <ContactSection />
        </div>
    );
}
