"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "~/components/ui/carousel";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import {
    Github,
    ExternalLink,
    Calendar,
    Users,
    Zap,
    Target,
    ChevronLeft,
    ChevronRight,
    X
} from "lucide-react";

export interface ProjectData {
    title: string;
    description: string;
    longDescription: string;
    tech: string[];
    tech_short?: string[];
    github: string;
    demo: string;
    featured?: boolean;
    hero_image: string;
    images: string[];
    timeline: string;
    teamSize: string;
    role: string;
    keyFeatures: string[];
    challenges: string[];
    outcomes: string[];
}

interface ProjectModalProps {
    project: ProjectData;
    children: React.ReactNode;
}

export function ProjectModal({ project, children }: ProjectModalProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    };

    const openFullScreen = () => setIsFullScreen(true);
    const closeFullScreen = () => setIsFullScreen(false);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isFullScreen) {
                e.stopPropagation();
                e.preventDefault();
                e.stopImmediatePropagation();
                closeFullScreen();
                return false;
            }
        };

        if (isFullScreen) {
            document.addEventListener('keydown', handleEscape, { capture: true, passive: false });
            window.addEventListener('keydown', handleEscape, { capture: true, passive: false });
        }

        return () => {
            document.removeEventListener('keydown', handleEscape, true);
            window.removeEventListener('keydown', handleEscape, true);
        };
    }, [isFullScreen]);

    useEffect(() => {
        if (!isFullScreen || !isMobile) return;

        let touchStartX = 0;
        let touchStartY = 0;

        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches[0]) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (!touchStartX || !touchStartY || !e.changedTouches[0]) return;

            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;

            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0 && project.images.length > 1) nextImage();
                else if (diffX < 0 && project.images.length > 1) prevImage();
            } else if (Math.abs(diffX) < 30 && Math.abs(diffY) < 30) {
                closeFullScreen();
            }

            touchStartX = 0;
            touchStartY = 0;
        };

        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isFullScreen, isMobile, project.images.length]);

    return (
        <>
            <Dialog>
                <DialogTrigger asChild className="cursor-pointer">
                    {children}
                </DialogTrigger>
                <DialogContent
                    className="!max-w-[95vw] w-[95vw] max-h-[90vh] overflow-y-auto bg-zinc-950 border-zinc-800 p-4 sm:p-6 mx-auto sm:!max-w-[95vw]"
                    showCloseButton={false}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <DialogHeader className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                    <DialogTitle className="text-xl sm:text-2xl font-bold text-white">
                                        {project.title}
                                    </DialogTitle>
                                    {project.featured && (
                                        <Badge className="bg-sky-500/15 text-sky-300 border-sky-500/30 w-fit">
                                            Featured
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex gap-2 flex-shrink-0">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700 text-zinc-300 text-sm hover:border-zinc-600 hover:text-white transition-colors"
                                        >
                                            <Github className="w-4 h-4" />
                                            <span className="hidden sm:inline">Code</span>
                                        </a>
                                    )}
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        <span className="hidden sm:inline">Demo</span>
                                    </a>
                                </div>
                            </div>
                            <DialogDescription className="text-base sm:text-lg text-zinc-400">
                                {project.longDescription}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="mt-6 space-y-6">
                            <div className="rounded-2xl overflow-hidden border border-zinc-800">
                                <Carousel className="w-full">
                                    <CarouselContent>
                                        {project.images.map((image, index) => (
                                            <CarouselItem key={index}>
                                                <div className="relative h-48 sm:h-64 md:h-80 lg:h-96">
                                                    <div
                                                        className="absolute inset-0 group/image cursor-zoom-in"
                                                        onClick={() => {
                                                            setCurrentImageIndex(index);
                                                            openFullScreen();
                                                        }}
                                                    >
                                                        <img
                                                            src={`/${image}`}
                                                            alt={`${project.title} screenshot ${index + 1}`}
                                                            className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-300"
                                                            onError={(e) => {
                                                                const target = e.target as HTMLImageElement;
                                                                target.style.display = 'none';
                                                            }}
                                                        />
                                                        <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                                            <div className="opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 bg-white/10 backdrop-blur-sm rounded-full p-3">
                                                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    {project.images.length > 1 && (
                                        <>
                                            <CarouselPrevious className="left-2 sm:left-4" />
                                            <CarouselNext className="right-2 sm:right-4" />
                                        </>
                                    )}
                                </Carousel>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                                <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm p-4 sm:p-6 space-y-4">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-sky-400" />
                                        Project Details
                                    </h3>
                                    <div className="space-y-3 text-zinc-400">
                                        <div className="flex justify-between">
                                            <span>Timeline:</span>
                                            <span className="text-white">{project.timeline}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Team Size:</span>
                                            <span className="text-white">{project.teamSize}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>My Role:</span>
                                            <span className="text-white">{project.role}</span>
                                        </div>
                                    </div>
                                    <Separator className="bg-zinc-800" />
                                    <div>
                                        <h4 className="text-white font-medium mb-2">Technologies Used:</h4>
                                        <div className="flex gap-2 flex-wrap">
                                            {project.tech.map((tech) => (
                                                <span key={tech} className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-full border border-zinc-700/50">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm p-4 sm:p-6 space-y-4">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-emerald-400" />
                                        Key Features
                                    </h3>
                                    <ul className="space-y-2">
                                        {project.keyFeatures.map((feature, index) => (
                                            <li key={index} className="text-zinc-400 flex items-start gap-2">
                                                <span className="text-emerald-400 mt-1.5">•</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                                <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm p-4 sm:p-6 space-y-4">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <Target className="w-5 h-5 text-orange-400" />
                                        Challenges & Solutions
                                    </h3>
                                    <ul className="space-y-2">
                                        {project.challenges.map((challenge, index) => (
                                            <li key={index} className="text-zinc-400 flex items-start gap-2">
                                                <span className="text-orange-400 mt-1.5">•</span>
                                                {challenge}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm p-4 sm:p-6 space-y-4">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <Users className="w-5 h-5 text-blue-400" />
                                        Outcomes & Impact
                                    </h3>
                                    <ul className="space-y-2">
                                        {project.outcomes.map((outcome, index) => (
                                            <li key={index} className="text-zinc-400 flex items-start gap-2">
                                                <span className="text-blue-400 mt-1.5">•</span>
                                                {outcome}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </DialogContent>
            </Dialog>

            <AnimatePresence>
                {isFullScreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center"
                        onClick={closeFullScreen}
                    >
                        <div className="relative w-full h-full flex items-center justify-center" style={{ zIndex: 1 }}>
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImageIndex}
                                    src={`/${project.images[currentImageIndex]}`}
                                    alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                                    className="max-w-[90vw] max-h-[90vh] object-contain"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.25 }}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </AnimatePresence>

                            <button
                                onClick={(e) => { e.stopPropagation(); closeFullScreen(); }}
                                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 z-[1001] cursor-pointer"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {project.images.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 z-[1001] cursor-pointer"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button
                                        style={{ zIndex: 100 }}
                                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 z-[1001] cursor-pointer"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                                        {currentImageIndex + 1} / {project.images.length}
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
