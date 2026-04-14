"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { stiffness: 1000, damping: 50 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };
        const handleHoverStart = () => setIsHovering(true);
        const handleHoverEnd = () => setIsHovering(false);

        window.addEventListener("mousemove", moveCursor);

        const updateInteractiveElements = () => {
            const interactiveElements = document.querySelectorAll(
                'a, button, [role="button"], .cursor-pointer'
            );
            interactiveElements.forEach((el) => {
                el.addEventListener("mouseenter", handleHoverStart);
                el.addEventListener("mouseleave", handleHoverEnd);
            });
        };

        updateInteractiveElements();

        const observer = new MutationObserver(updateInteractiveElements);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            observer.disconnect();
        };
    }, []);

    return (
        <motion.div
            className="cursor-pencil md:block hidden pointer-events-none fixed top-0 left-0"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                rotate: isHovering ? -15 : 0,
                scale: isHovering ? 1.4 : 1,
                zIndex: 999999, // Absolute top
            }}
        >
            <div style={{ transform: "translate(-3px, -20px)" }}>
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" fill="white" stroke="#0B0D10" />
                    <path d="M15 5l3 3" stroke="#0B0D10" />
                </svg>
            </div>
        </motion.div>
    );
}
