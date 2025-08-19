"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        // Hide default cursor
        document.body.style.cursor = 'none';
        document.documentElement.style.cursor = 'none';

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });

            // Check if hovering over clickable element
            const target = e.target as HTMLElement;
            const isClickable = target?.closest('button, a, [role="button"], [data-clickable], .cursor-pointer') ??
                window.getComputedStyle(target).cursor === 'pointer';
            setIsPointer(!!isClickable);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = '';
            document.documentElement.style.cursor = '';
        };
    }, []);

    // Smooth cursor following
    useEffect(() => {
        const animate = () => {
            setCursorPos(prev => ({
                x: prev.x + (mousePos.x - prev.x) * 0.15,
                y: prev.y + (mousePos.y - prev.y) * 0.15,
            }));
        };

        const animationId = setInterval(animate, 8);
        return () => clearInterval(animationId);
    }, [mousePos]);

    return (
        <>
            {/* Main cursor */}
            <motion.div
                className="fixed pointer-events-none z-[9999]"
                style={{
                    left: cursorPos.x,
                    top: cursorPos.y,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <div className="relative">
                    {/* Outer ring */}
                    <motion.div
                        className={`w-8 h-8 border-2 rounded-full transition-all duration-200 ${isPointer
                                ? 'border-teal-400 bg-teal-400/20 scale-150'
                                : 'border-white/60 bg-white/10'
                            }`}
                        animate={{
                            scale: isClicking ? 0.8 : isPointer ? 1.5 : 1,
                        }}
                        transition={{ duration: 0.1 }}
                    />

                    {/* Inner dot */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
                        animate={{
                            scale: isClicking ? 1.5 : 1,
                            backgroundColor: isPointer ? '#14b8a6' : '#ffffff',
                        }}
                        transition={{ duration: 0.1 }}
                    />

                    {/* Click ripple effect */}
                    {isClicking && (
                        <motion.div
                            className="absolute inset-0 border-2 border-teal-400 rounded-full"
                            initial={{ scale: 1, opacity: 1 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    )}
                </div>
            </motion.div>

            {/* Trailing cursor for extra smoothness */}
            <motion.div
                className="fixed pointer-events-none z-[9998]"
                style={{
                    left: mousePos.x,
                    top: mousePos.y,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <div className="w-1 h-1 bg-white/40 rounded-full" />
            </motion.div>
        </>
    );
}
