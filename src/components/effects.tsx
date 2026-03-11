"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { forwardRef, useRef, useState, useEffect } from "react";

export function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const chars = "!<>-_\\/[]{}—=+*^?#________";

    useEffect(() => {
        if (!isHovering) {
            setDisplayText(text);
            return;
        }

        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) return text[index];
                        if (char === " ") return " ";
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }
            iteration += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [isHovering, text]);

    return (
        <span
            className={`font-mono ${className}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {displayText}
        </span>
    );
}

export function Magnetic({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.4);
        y.set((e.clientY - centerY) * 0.4);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            style={{ x: xSpring, y: ySpring }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function GlitchText({ children, className = "" }: { children: string; className?: string }) {
    return (
        <span className={`relative inline-block ${className}`}>
            <span className="relative z-10">{children}</span>
            <span
                className="absolute top-0 left-0 -z-10 text-sky-400 opacity-70"
                style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
                    transform: "translate(-2px, -1px)",
                    animation: "glitch1 2.5s infinite linear alternate-reverse",
                }}
            >
                {children}
            </span>
            <span
                className="absolute top-0 left-0 -z-10 text-blue-400 opacity-70"
                style={{
                    clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
                    transform: "translate(2px, 1px)",
                    animation: "glitch2 3s infinite linear alternate-reverse",
                }}
            >
                {children}
            </span>
        </span>
    );
}

export function Marquee({ children, speed = 50 }: { children: React.ReactNode; speed?: number }) {
    return (
        <div className="relative overflow-hidden whitespace-nowrap">
            <motion.div
                className="inline-flex"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
            >
                {children}
                {children}
            </motion.div>
        </div>
    );
}

export const SpotlightCard = forwardRef<
    HTMLDivElement,
    {
        children: React.ReactNode;
        className?: string;
        glowColor?: string;
        onClick?: React.MouseEventHandler<HTMLDivElement>;
    }
>(function SpotlightCard({ children, className = "", glowColor = "rgba(56,189,248,0.5)", onClick }, externalRef) {
    const internalRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        const el = internalRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <motion.div
            ref={(node) => {
                (internalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                if (typeof externalRef === "function") externalRef(node);
                else if (externalRef) (externalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            }}
            className={`relative overflow-hidden backdrop-blur-sm ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            onClick={onClick}
        >
            {isHovering && (
                <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 60%)`,
                    }}
                />
            )}
            {children}
        </motion.div>
    );
});

export function SplitTextReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
    const words = text.split(" ");

    return (
        <span className={className}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
                    <motion.span
                        className="inline-block"
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.5,
                            delay: delay + i * 0.05,
                            ease: [0.33, 1, 0.68, 1],
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}

export function BentoItem({
    children,
    className = "",
    colSpan = 1,
    rowSpan = 1,
    onClick,
}: {
    children: React.ReactNode;
    className?: string;
    colSpan?: number;
    rowSpan?: number;
    onClick?: () => void;
}) {
    return (
        <motion.div
            className={`relative overflow-hidden rounded-3xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm sm:[grid-column:span_var(--col)] sm:[grid-row:span_var(--row)] ${className}`}
            style={{
                "--col": colSpan,
                "--row": rowSpan,
            } as React.CSSProperties}
            whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.1)" }}
            transition={{ duration: 0.3 }}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
}
