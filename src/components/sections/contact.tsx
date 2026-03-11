"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, Linkedin, Mail } from "lucide-react";
import { Magnetic } from "~/components/effects";

export function ContactSection() {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

    return (
        <section id="contact" ref={ref} className="relative py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    className="text-zinc-500 font-mono text-sm mb-4"
                >
                    004 / CONTACT
                </motion.p>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
                        >
                            Let&apos;s build
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
                                something cool
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 }}
                            className="text-zinc-400 text-lg mb-8 max-w-md"
                        >
                            Got a project in mind? I&apos;m always down to chat about new ideas, freelance work, or just tech in general.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 }}
                        >
                            <Magnetic>
                                <a
                                    href="mailto:christian@chrisfitz.dev"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors"
                                >
                                    <Mail className="w-5 h-5" />
                                    christian@chrisfitz.dev
                                </a>
                            </Magnetic>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        <a
                            href="https://github.com/christianf7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700 transition-all"
                        >
                            <Github className="w-8 h-8 text-zinc-400 group-hover:text-white mb-4 transition-colors" />
                            <p className="text-white font-semibold">GitHub</p>
                            <p className="text-zinc-500 text-sm">@christianf7</p>
                        </a>

                        <a
                            href="https://linkedin.com/in/christianf7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700 transition-all"
                        >
                            <Linkedin className="w-8 h-8 text-zinc-400 group-hover:text-white mb-4 transition-colors" />
                            <p className="text-white font-semibold">LinkedIn</p>
                            <p className="text-zinc-500 text-sm">/in/christianf7</p>
                        </a>

                        <a
                            href="mailto:christian@chrisfitz.dev"
                            className="group p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700 transition-all col-span-2"
                        >
                            <Mail className="w-8 h-8 text-zinc-400 group-hover:text-white mb-4 transition-colors" />
                            <p className="text-white font-semibold">Email</p>
                            <p className="text-zinc-500 text-sm">christian@chrisfitz.dev</p>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
