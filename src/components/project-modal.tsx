"use client";

import React, { useState, useEffect, useCallback } from "react";
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
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { Card, CardContent } from "~/components/ui/card";
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
    const [cursorZone, setCursorZone] = useState<'left' | 'middle' | 'right' | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile device
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

    const openFullScreen = () => {
        setIsFullScreen(true);
    };

    const closeFullScreen = () => {
        setIsFullScreen(false);
        setCursorZone(null);
    };

    // Handle escape key to close fullscreen only (prevent modal close)
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
            // Use capture phase with highest priority
            document.addEventListener('keydown', handleEscape, { capture: true, passive: false });
            // Also add to window for extra safety
            window.addEventListener('keydown', handleEscape, { capture: true, passive: false });
        }

        return () => {
            document.removeEventListener('keydown', handleEscape, true);
            window.removeEventListener('keydown', handleEscape, true);
        };
    }, [isFullScreen]);

    // Touch/swipe support for mobile
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

            // Only handle horizontal swipes (ignore vertical)
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0 && project.images.length > 1) {
                    // Swiped left, go to next image
                    nextImage();
                } else if (diffX < 0 && project.images.length > 1) {
                    // Swiped right, go to previous image
                    prevImage();
                }
            } else if (Math.abs(diffX) < 30 && Math.abs(diffY) < 30) {
                // Tap (not swipe) - close fullscreen
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

    // Mouse tracking and cursor management for fullscreen (desktop only)
    useEffect(() => {
        if (!isFullScreen || isMobile) return;

        // Hide all cursors aggressively
        const style = document.createElement('style');
        style.id = 'fullscreen-cursor-hide';
        style.innerHTML = `
            * { cursor: none !important; }
            body { cursor: none !important; }
            html { cursor: none !important; }
        `;
        document.head.appendChild(style);

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Calculate zones based on viewport (excluding close button area)
            const width = window.innerWidth;
            const leftThird = width / 3;
            const rightThird = (width * 2) / 3;
            const closeButtonArea = 80;

            // Don't set zone if in close button area
            if (e.clientX > width - closeButtonArea && e.clientY < closeButtonArea) {
                setCursorZone(null);
                return;
            }

            let zone: 'left' | 'middle' | 'right';
            if (e.clientX < leftThird) {
                zone = 'left';
            } else if (e.clientX > rightThird) {
                zone = 'right';
            } else {
                zone = 'middle';
            }

            setCursorZone(zone);
        };

        const handleClick = (e: MouseEvent) => {
            // Don't handle clicks on buttons or interactive elements
            const target = e.target as HTMLElement;
            if (target.closest('button') || target.closest('[data-clickable]')) {
                return;
            }

            // Check if click is in close button area (top-right corner)
            const closeButtonArea = 80; // 80px area around close button
            if (e.clientX > window.innerWidth - closeButtonArea && e.clientY < closeButtonArea) {
                return; // Ignore clicks in close button area
            }

            e.preventDefault();
            e.stopPropagation();

            const width = window.innerWidth;
            const leftThird = width / 3;
            const rightThird = (width * 2) / 3;

            let zone: 'left' | 'middle' | 'right';
            if (e.clientX < leftThird) {
                zone = 'left';
            } else if (e.clientX > rightThird) {
                zone = 'right';
            } else {
                zone = 'middle';
            }

            if (zone === 'left' && project.images.length > 1) {
                prevImage();
            } else if (zone === 'right' && project.images.length > 1) {
                nextImage();
            } else {
                closeFullScreen();
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('click', handleClick, true);
            // Restore cursor
            const styleEl = document.getElementById('fullscreen-cursor-hide');
            if (styleEl) styleEl.remove();
        };
    }, [isFullScreen, project.images.length]);

    // Custom cursor component (desktop only)
    const CustomCursor = () => {
        if (!isFullScreen || !cursorZone || isMobile) return null;

        const getCursorIcon = () => {
            switch (cursorZone) {
                case 'left':
                    return project.images.length > 1 ? (
                        <div className="w-8 h-8 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-lg">
                            <ChevronLeft className="w-5 h-5 text-black" />
                        </div>
                    ) : (
                        <div className="w-8 h-8 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-lg">
                            <X className="w-5 h-5 text-black" />
                        </div>
                    );
                case 'right':
                    return project.images.length > 1 ? (
                        <div className="w-8 h-8 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-lg">
                            <ChevronRight className="w-5 h-5 text-black" />
                        </div>
                    ) : (
                        <div className="w-8 h-8 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-lg">
                            <X className="w-5 h-5 text-black" />
                        </div>
                    );
                case 'middle':
                    return (
                        <div className="w-8 h-8 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-lg">
                            <X className="w-5 h-5 text-black" />
                        </div>
                    );
                default:
                    return null;
            }
        };

        return (
            <div
                className="fixed pointer-events-none z-[1001] transition-all duration-100"
                style={{
                    left: mousePosition.x,
                    top: mousePosition.y,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                {getCursorIcon()}
            </div>
        );
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild className="cursor-pointer">
                    {children}
                </DialogTrigger>
                <DialogContent className="!max-w-[95vw] w-[95vw] max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700 p-4 sm:p-6 mx-auto sm:!max-w-[95vw]">
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
                                        <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 w-fit">
                                            Featured
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex gap-2 flex-shrink-0">
                                    <Button size="sm" variant="outline" asChild className="cursor-pointer">
                                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                                            <Github className="w-4 h-4 sm:mr-2" />
                                            <span className="hidden sm:inline">Code</span>
                                        </a>
                                    </Button>
                                    <Button size="sm" asChild className="cursor-pointer">
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-4 h-4 sm:mr-2" />
                                            <span className="hidden sm:inline">Demo</span>
                                        </a>
                                    </Button>
                                </div>
                            </div>
                            <DialogDescription className="text-base sm:text-lg text-white/80">
                                {project.longDescription}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="mt-6 space-y-6">
                            {/* Image Carousel using shadcn */}
                            <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
                                <CardContent className="p-0">
                                    <Carousel className="w-full">
                                        <CarouselContent>
                                            {project.images.map((image, index) => (
                                                <CarouselItem key={index}>
                                                    <div className="relative h-48 sm:h-64 md:h-80 lg:h-96">
                                                        <motion.div
                                                            className="absolute inset-0 group/image"
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
                                                                    const parent = target.parentElement;
                                                                    if (parent) {
                                                                        parent.classList.add('bg-gradient-to-br', 'from-teal-500/20', 'to-emerald-500/20', 'flex', 'items-center', 'justify-center');
                                                                        parent.innerHTML = '<div class="text-white/30 text-center"><div class="text-6xl mb-2">🖼️</div><p>Project Screenshot ' + (index + 1) + '</p></div>';
                                                                    }
                                                                }}
                                                            />
                                                            {/* Zoom indicator overlay */}
                                                            <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                                                <div className="opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 bg-white/10 backdrop-blur-sm rounded-full p-3">
                                                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </motion.div>
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
                                </CardContent>
                            </Card>

                            {/* Project Details Grid - Fixed to 2 columns */}
                            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                                {/* Project Info */}
                                <Card className="bg-slate-800/50 border-slate-700">
                                    <CardContent className="p-4 sm:p-6 space-y-4">
                                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                            <Calendar className="w-5 h-5 text-teal-400" />
                                            Project Details
                                        </h3>
                                        <div className="space-y-3 text-white/70">
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
                                        <Separator className="bg-slate-600" />
                                        <div>
                                            <h4 className="text-white font-medium mb-2">Technologies Used:</h4>
                                            <div className="flex gap-2 flex-wrap">
                                                {project.tech.map((tech) => (
                                                    <Badge key={tech} variant="outline" className="border-teal-500/30 text-teal-300">
                                                        {tech}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Key Features */}
                                <Card className="bg-slate-800/50 border-slate-700">
                                    <CardContent className="p-4 sm:p-6 space-y-4">
                                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                            <Zap className="w-5 h-5 text-emerald-400" />
                                            Key Features
                                        </h3>
                                        <ul className="space-y-2">
                                            {project.keyFeatures.map((feature, index) => (
                                                <li key={index} className="text-white/70 flex items-start gap-2">
                                                    <span className="text-emerald-400 mt-1.5">•</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Challenges & Outcomes */}
                            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                                <Card className="bg-slate-800/50 border-slate-700">
                                    <CardContent className="p-4 sm:p-6 space-y-4">
                                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                            <Target className="w-5 h-5 text-orange-400" />
                                            Challenges & Solutions
                                        </h3>
                                        <ul className="space-y-2">
                                            {project.challenges.map((challenge, index) => (
                                                <li key={index} className="text-white/70 flex items-start gap-2">
                                                    <span className="text-orange-400 mt-1.5">•</span>
                                                    {challenge}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="bg-slate-800/50 border-slate-700">
                                    <CardContent className="p-4 sm:p-6 space-y-4">
                                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                            <Users className="w-5 h-5 text-blue-400" />
                                            Outcomes & Impact
                                        </h3>
                                        <ul className="space-y-2">
                                            {project.outcomes.map((outcome, index) => (
                                                <li key={index} className="text-white/70 flex items-start gap-2">
                                                    <span className="text-blue-400 mt-1.5">•</span>
                                                    {outcome}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </motion.div>
                </DialogContent>
            </Dialog>

            {/* Custom Cursor */}
            <CustomCursor />

            {/* Fullscreen Image Modal */}
            {isFullScreen && (
                <div className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Main Image */}
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImageIndex}
                                src={`/${project.images[currentImageIndex]}`}
                                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                                className="max-w-[90vw] max-h-[90vh] object-contain"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                            />
                        </AnimatePresence>

                        {/* Close button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                closeFullScreen();
                            }}
                            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 z-[1001]"
                            data-clickable="true"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Image counter */}
                        {project.images.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                                {currentImageIndex + 1} / {project.images.length}
                            </div>
                        )}


                    </div>
                </div>
            )}
        </>
    );
}