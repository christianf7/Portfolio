"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, ArrowUpRight } from "lucide-react";
import { Magnetic, GlitchText } from "~/components/effects";

const NAV_ITEMS = [
    { id: "hero", label: "Home", icon: "⌂" },
    { id: "about", label: "About", icon: "◉" },
    { id: "projects", label: "Work", icon: "◈" },
    { id: "experience", label: "Exp", icon: "◇" },
    { id: "contact", label: "Contact", icon: "✉" },
];

export function FloatingDock() {
    const [activeSection, setActiveSection] = useState("hero");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 400);

            const sections = NAV_ITEMS.map((i) => i.id);
            for (const section of [...sections].reverse()) {
                const element = document.getElementById(section);
                if (element && element.getBoundingClientRect().top <= 300) {
                    setActiveSection(section);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        if (id === "hero") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
                >
                    <div className="flex items-center gap-1 px-2 py-2 bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl">
                        {NAV_ITEMS.map((item) => (
                            <Magnetic key={item.id}>
                                <button
                                    onClick={() => scrollTo(item.id)}
                                    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                                        activeSection === item.id
                                            ? "text-white"
                                            : "text-zinc-500 hover:text-zinc-300"
                                    }`}
                                >
                                    {activeSection === item.id && (
                                        <motion.div
                                            layoutId="activeDock"
                                            className="absolute inset-0 bg-zinc-800 rounded-xl -z-10"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="mr-1">{item.icon}</span>
                                    <span className="hidden sm:inline">{item.label}</span>
                                </button>
                            </Magnetic>
                        ))}
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}

export function TopNav() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled ? "py-4" : "py-6"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Magnetic>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="text-2xl font-bold tracking-tighter cursor-pointer"
                    >
                        <GlitchText className="text-white">CF.</GlitchText>
                    </a>
                </Magnetic>

                <div className="flex items-center gap-4">
                    <Magnetic>
                        <a
                            href="https://github.com/christianf7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                    </Magnetic>
                    <Magnetic>
                        <a
                            href="https://linkedin.com/in/christianf7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>
                    </Magnetic>
                    <Magnetic>
                        <a
                            href="mailto:christian@chrisfitz.dev"
                            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-zinc-200 transition-colors"
                        >
                            Let&apos;s talk
                            <ArrowUpRight className="w-3 h-3" />
                        </a>
                    </Magnetic>
                </div>
            </div>
        </motion.header>
    );
}
