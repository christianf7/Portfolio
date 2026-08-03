"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
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
    Github,
    ExternalLink,
    Globe,
    Clock,
    Users,
    Zap,
    Target,
    X,
    ChevronLeft,
    ChevronRight,
    TrendingUp,
    Images,
    ZoomIn,
    Play,
} from "lucide-react";

export type MediaItem = string | { type: "youtube"; youtubeId: string; title?: string };

function isYouTube(item: MediaItem): item is { type: "youtube"; youtubeId: string; title?: string } {
    return typeof item === "object" && item.type === "youtube";
}

function getMediaSrc(item: MediaItem): string {
    if (isYouTube(item)) return `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
    return `/${item}`;
}

function getYouTubeEmbedUrl(id: string): string {
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
}

export interface ProjectData {
    title: string;
    description: string;
    longDescription: string;
    tech: string[];
    tech_short?: string[];
    github?: string;
    demo?: string;
    visit?: string;
    featured?: boolean;
    hero_image?: string;
    images: MediaItem[];
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

function LightboxViewer({
    images,
    title,
    currentIndex,
    onIndexChange,
    onClose,
}: {
    images: MediaItem[];
    title: string;
    currentIndex: number;
    onIndexChange: (i: number) => void;
    onClose: () => void;
}) {
    const thumbStripRef = useRef<HTMLDivElement>(null);
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);
    const isScrollingRef = useRef(false);
    const len = images.length;

    const goNext = useCallback(() => {
        onIndexChange((currentIndex + 1) % len);
    }, [currentIndex, len, onIndexChange]);

    const goPrev = useCallback(() => {
        onIndexChange((currentIndex - 1 + len) % len);
    }, [currentIndex, len, onIndexChange]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.stopPropagation();
                e.preventDefault();
                onClose();
            } else if (e.key === "ArrowRight") {
                goNext();
            } else if (e.key === "ArrowLeft") {
                goPrev();
            }
        };
        window.addEventListener("keydown", handleKey, { capture: true });
        return () => window.removeEventListener("keydown", handleKey, true);
    }, [onClose, goNext, goPrev]);

    // Infinite scroll: triplicate images, keep the middle set as the "real" one
    // Snap back to center set when scroll settles to maintain illusion
    const tripleImages = [...images, ...images, ...images];
    const centerOffset = len;

    useEffect(() => {
        const strip = thumbStripRef.current;
        if (!strip || len <= 1) return;
        const targetChild = strip.children[centerOffset + currentIndex] as HTMLElement | undefined;
        if (!targetChild) return;
        const stripRect = strip.getBoundingClientRect();
        const thumbRect = targetChild.getBoundingClientRect();
        const scrollTarget = targetChild.offsetLeft - stripRect.width / 2 + thumbRect.width / 2;
        isScrollingRef.current = true;
        strip.scrollTo({ left: scrollTarget, behavior: "smooth" });
        const timer = setTimeout(() => { isScrollingRef.current = false; }, 400);
        return () => clearTimeout(timer);
    }, [currentIndex, centerOffset, len]);

    // On mount, jump (no animation) to center set
    useEffect(() => {
        const strip = thumbStripRef.current;
        if (!strip || len <= 1) return;
        const targetChild = strip.children[centerOffset + currentIndex] as HTMLElement | undefined;
        if (!targetChild) return;
        const stripRect = strip.getBoundingClientRect();
        const thumbRect = targetChild.getBoundingClientRect();
        const scrollTarget = targetChild.offsetLeft - stripRect.width / 2 + thumbRect.width / 2;
        strip.scrollTo({ left: scrollTarget, behavior: "instant" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Snap scroll back to center set when user scrolls to edges
    useEffect(() => {
        const strip = thumbStripRef.current;
        if (!strip || len <= 1) return;
        const handleScroll = () => {
            if (isScrollingRef.current) return;
            const singleSetWidth = strip.scrollWidth / 3;
            if (strip.scrollLeft < singleSetWidth * 0.15) {
                strip.scrollLeft += singleSetWidth;
            } else if (strip.scrollLeft > singleSetWidth * 1.85) {
                strip.scrollLeft -= singleSetWidth;
            }
        };
        strip.addEventListener("scroll", handleScroll, { passive: true });
        return () => strip.removeEventListener("scroll", handleScroll);
    }, [len]);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        const touch = e.touches[0];
        if (touch) touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    }, []);

    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        const start = touchStartRef.current;
        const end = e.changedTouches[0];
        if (!start || !end) return;
        const dx = start.x - end.clientX;
        const dy = start.y - end.clientY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
            if (dx > 0) goNext();
            else goPrev();
        }
        touchStartRef.current = null;
    }, [goNext, goPrev]);

    return (
        <div
            style={{ zIndex: 99999, pointerEvents: "auto" }}
            className="fixed inset-0"
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-black/95 flex flex-col"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-2.5 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 cursor-pointer"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="absolute top-5 left-5 z-10 text-zinc-500 text-sm font-mono">
                    {currentIndex + 1} / {len}
                </div>

                <div
                    className="flex-1 flex items-center justify-center relative px-4 sm:px-16"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {len > 1 && (
                        <button
                            onClick={goPrev}
                            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 cursor-pointer z-10"
                        >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    )}

                    <AnimatePresence mode="wait">
                        {isYouTube(images[currentIndex]!) ? (
                            <motion.div
                                key={`yt-${currentIndex}`}
                                className="w-full max-w-5xl aspect-video rounded-lg overflow-hidden"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                            >
                                <iframe
                                    src={getYouTubeEmbedUrl((images[currentIndex] as { type: "youtube"; youtubeId: string }).youtubeId)}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={`${title} video`}
                                />
                            </motion.div>
                        ) : (
                            <motion.img
                                key={currentIndex}
                                src={`/${images[currentIndex]}`}
                                alt={`${title} screenshot ${currentIndex + 1}`}
                                className="max-w-full max-h-[calc(100vh-160px)] sm:max-h-[calc(100vh-180px)] object-contain rounded-lg select-none"
                                draggable={false}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                            />
                        )}
                    </AnimatePresence>

                    {len > 1 && (
                        <button
                            onClick={goNext}
                            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 cursor-pointer z-10"
                        >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    )}
                </div>

                {len > 1 && (
                    <div className="shrink-0 py-3 sm:py-4 px-4 sm:px-8">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <button
                                onClick={goPrev}
                                className="shrink-0 bg-white/10 hover:bg-white/20 text-white p-1.5 rounded-full transition-all cursor-pointer"
                            >
                                <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                            <div
                                ref={thumbStripRef}
                                className="flex-1 flex gap-2 overflow-x-auto scrollbar-hide"
                                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                            >
                                {tripleImages.map((item, i) => {
                                    const realIndex = i % len;
                                    const isActive = realIndex === currentIndex;
                                    const isVideo = isYouTube(item);
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => onIndexChange(realIndex)}
                                            className={`shrink-0 rounded-lg overflow-hidden transition-all duration-200 cursor-pointer relative ${
                                                isActive
                                                    ? "ring-2 ring-sky-500 opacity-100 scale-105"
                                                    : "opacity-40 hover:opacity-70"
                                            }`}
                                        >
                                            <img
                                                src={getMediaSrc(item)}
                                                alt={`Thumbnail ${realIndex + 1}`}
                                                className="w-20 h-[52px] sm:w-28 sm:h-[72px] object-cover"
                                                draggable={false}
                                            />
                                            {isVideo && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="bg-black/60 rounded-full p-1">
                                                        <Play className="w-3 h-3 text-white fill-white" />
                                                    </div>
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                            <button
                                onClick={goNext}
                                className="shrink-0 bg-white/10 hover:bg-white/20 text-white p-1.5 rounded-full transition-all cursor-pointer"
                            >
                                <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

function ImageGrid({
    images,
    title,
    onLightboxChange,
}: {
    images: MediaItem[];
    title: string;
    onLightboxChange: (open: boolean) => void;
}) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const openLightbox = useCallback((index: number) => {
        setLightboxIndex(index);
        onLightboxChange(true);
    }, [onLightboxChange]);

    const closeLightbox = useCallback(() => {
        setLightboxIndex(null);
        onLightboxChange(false);
    }, [onLightboxChange]);

    const visibleInitial = Math.min(5, images.length);
    const hasMore = images.length > 5;
    const remainingCount = images.length - 5;

    const zoomOverlay = (
        <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 bg-white/10 backdrop-blur-sm rounded-full p-2.5">
                <ZoomIn className="w-4 h-4 text-white" />
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile: stacked layout / Desktop: 3+2 grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl overflow-hidden">
                {/* Large hero image/video */}
                {images[0] && (
                    <div
                        className="col-span-2 sm:col-span-3 relative group/img cursor-pointer overflow-hidden"
                        onClick={() => openLightbox(0)}
                    >
                        <img
                            src={getMediaSrc(images[0])}
                            alt={`${title} screenshot 1`}
                            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                            style={{ aspectRatio: "16/10" }}
                        />
                        {isYouTube(images[0]) ? (
                            <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                <div className="bg-black/60 backdrop-blur-sm rounded-full p-4 group-hover/img:scale-110 transition-transform">
                                    <Play className="w-8 h-8 text-white fill-white" />
                                </div>
                            </div>
                        ) : zoomOverlay}
                    </div>
                )}

                {/* Small images: 2-col on mobile, 2x2 grid in right 2 cols on desktop */}
                <div className="col-span-2 sm:col-span-2 grid grid-cols-2 sm:grid-cols-2 sm:grid-rows-2 gap-1.5 sm:gap-2">
                    {images.slice(1, visibleInitial).map((item, i) => {
                        const actualIndex = i + 1;
                        const isLastSlot = actualIndex === 4 && hasMore;
                        const isVideo = isYouTube(item);

                        return (
                            <div
                                key={actualIndex}
                                className="relative group/img cursor-pointer overflow-hidden aspect-video sm:aspect-auto"
                                onClick={() => openLightbox(isLastSlot ? 4 : actualIndex)}
                            >
                                <img
                                    src={getMediaSrc(item)}
                                    alt={`${title} screenshot ${actualIndex + 1}`}
                                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                                />
                                {!isLastSlot && !isVideo && zoomOverlay}
                                {!isLastSlot && isVideo && (
                                    <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                        <div className="bg-black/60 backdrop-blur-sm rounded-full p-2">
                                            <Play className="w-4 h-4 text-white fill-white" />
                                        </div>
                                    </div>
                                )}

                                {isLastSlot && (
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-1 group-hover/img:bg-black/70 transition-colors">
                                        <Images className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                        <span className="text-white text-xs sm:text-sm font-medium">+{remainingCount} more</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {typeof document !== "undefined" && createPortal(
                <AnimatePresence>
                    {lightboxIndex !== null && (
                        <LightboxViewer
                            images={images}
                            title={title}
                            currentIndex={lightboxIndex}
                            onIndexChange={(i) => setLightboxIndex(i)}
                            onClose={closeLightbox}
                        />
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}

export function ProjectModal({ project, children }: ProjectModalProps) {
    const lightboxOpenRef = useRef(false);

    const handleLightboxChange = useCallback((open: boolean) => {
        lightboxOpenRef.current = open;
    }, []);

    const handleEscapeKeyDown = useCallback((e: KeyboardEvent) => {
        if (lightboxOpenRef.current) {
            e.preventDefault();
        }
    }, []);

    const handlePointerDownOutside = useCallback((e: Event) => {
        if (lightboxOpenRef.current) {
            e.preventDefault();
        }
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild className="cursor-pointer">
                {children}
            </DialogTrigger>
            <DialogContent
                className="!max-w-[100vw] w-[100vw] sm:!max-w-[95vw] sm:w-[95vw] lg:!max-w-6xl max-h-[100dvh] sm:max-h-[90vh] overflow-y-auto bg-zinc-950 border-zinc-800/80 sm:rounded-xl rounded-none p-0 mx-auto"
                showCloseButton={false}
                onEscapeKeyDown={handleEscapeKeyDown}
                onPointerDownOutside={handlePointerDownOutside}
            >
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    {/* Header */}
                    <div className="sticky top-0 z-10 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/50 px-4 py-3 sm:px-8 sm:py-5">
                        <DialogHeader className="space-y-0">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                    <DialogTitle className="text-lg sm:text-2xl font-bold text-white truncate">
                                        {project.title}
                                    </DialogTitle>
                                    {project.featured && (
                                        <span className="text-[10px] sm:text-[11px] font-medium px-2 sm:px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/20 shrink-0">
                                            Featured
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-zinc-700/80 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 transition-all"
                                        >
                                            <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        </a>
                                    )}
                                    {project.visit && (
                                        <a
                                            href={project.visit}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-sky-500 text-white text-xs sm:text-sm font-medium hover:bg-sky-400 transition-colors"
                                        >
                                            <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                            Visit
                                        </a>
                                    )}
                                    {project.demo && (
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white text-black text-xs sm:text-sm font-medium hover:bg-zinc-200 transition-colors"
                                    >
                                        <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                        Demo
                                    </a>
                                    )}
                                </div>
                            </div>
                            <DialogDescription className="text-xs sm:text-base text-zinc-500 mt-1.5 sm:mt-2 leading-relaxed line-clamp-3 sm:line-clamp-none">
                                {project.longDescription}
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    {/* Content */}
                    <div className="px-3 py-4 sm:px-8 sm:py-6 space-y-4 sm:space-y-6">
                        {/* Image Grid */}
                        <ImageGrid
                            images={project.images}
                            title={project.title}
                            onLightboxChange={handleLightboxChange}
                        />

                        {/* Meta row */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/40 p-2.5 sm:p-4 text-center">
                                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 mx-auto mb-1 sm:mb-2" />
                                <p className="text-white text-xs sm:text-sm font-medium">{project.timeline}</p>
                                <p className="text-zinc-600 text-[10px] sm:text-xs mt-0.5">Timeline</p>
                            </div>
                            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/40 p-2.5 sm:p-4 text-center">
                                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 mx-auto mb-1 sm:mb-2" />
                                <p className="text-white text-xs sm:text-sm font-medium">{project.teamSize}</p>
                                <p className="text-zinc-600 text-[10px] sm:text-xs mt-0.5">Team</p>
                            </div>
                            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/40 p-2.5 sm:p-4 text-center">
                                <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 mx-auto mb-1 sm:mb-2" />
                                <p className="text-white text-xs sm:text-sm font-medium">{project.role}</p>
                                <p className="text-zinc-600 text-[10px] sm:text-xs mt-0.5">Role</p>
                            </div>
                        </div>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-1 sm:gap-1.5">
                            {project.tech.map((tech) => (
                                <span key={tech} className="px-2 sm:px-3 py-0.5 sm:py-1 bg-zinc-800/60 text-zinc-400 text-[10px] sm:text-xs rounded-full border border-zinc-700/30">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Details grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                            <div className="rounded-xl bg-zinc-900/40 border border-zinc-800/30 p-4 sm:p-5 space-y-2 sm:space-y-3">
                                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    <h4 className="text-xs sm:text-sm font-semibold">Key Features</h4>
                                </div>
                                <ul className="space-y-1.5 sm:space-y-2">
                                    {project.keyFeatures.map((feature, i) => (
                                        <li key={i} className="text-zinc-400 text-xs sm:text-sm flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-emerald-400/60 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="rounded-xl bg-zinc-900/40 border border-zinc-800/30 p-4 sm:p-5 space-y-2 sm:space-y-3">
                                <div className="flex items-center gap-2 text-orange-400 mb-1">
                                    <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    <h4 className="text-xs sm:text-sm font-semibold">Challenges</h4>
                                </div>
                                <ul className="space-y-1.5 sm:space-y-2">
                                    {project.challenges.map((challenge, i) => (
                                        <li key={i} className="text-zinc-400 text-xs sm:text-sm flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-orange-400/60 shrink-0" />
                                            {challenge}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="rounded-xl bg-zinc-900/40 border border-zinc-800/30 p-4 sm:p-5 space-y-2 sm:space-y-3">
                                <div className="flex items-center gap-2 text-sky-400 mb-1">
                                    <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    <h4 className="text-xs sm:text-sm font-semibold">Outcomes</h4>
                                </div>
                                <ul className="space-y-1.5 sm:space-y-2">
                                    {project.outcomes.map((outcome, i) => (
                                        <li key={i} className="text-zinc-400 text-xs sm:text-sm flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-sky-400/60 shrink-0" />
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
    );
}
