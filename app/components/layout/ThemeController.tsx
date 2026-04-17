"use client";
import React, { useEffect, useState, useRef } from "react";

export default function ThemeController({
    children,
    targetRef
}: {
    children: React.ReactNode;
    targetRef: React.RefObject<any>;
}) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const [targetOffset, setTargetOffset] = useState(0);
    const [vHeight, setVHeight] = useState(0);

    useEffect(() => {
        const updateOffset = () => {
            if (targetRef.current) {
                const rect = targetRef.current.getBoundingClientRect();
                setTargetOffset(rect.top + window.pageYOffset);
                setVHeight(window.innerHeight);
            }
        };

        updateOffset();
        window.addEventListener("resize", updateOffset);
        return () => window.removeEventListener("resize", updateOffset);
    }, [targetRef]);

    useEffect(() => {
        let frameId: number;

        const handleScroll = () => {
            frameId = requestAnimationFrame(() => {
                if (!overlayRef.current) return;

                const scrollY = window.pageYOffset || document.documentElement.scrollTop;

                const enterThreshold = targetOffset - vHeight - 100;
                const fullThreshold = targetOffset - (vHeight * 0.4);

                let progress = (scrollY - enterThreshold) / (fullThreshold - enterThreshold);
                progress = Math.max(0, Math.min(1, progress));

                // Background Opacity
                overlayRef.current.style.opacity = progress.toString();

                // Dynamic Text Color (Interpolate from #0B0D10 to #FFFFFF)
                const textProgress = Math.pow(progress, 1.5); // Slightly non-linear for nicer feel
                const r = Math.round(11 + (255 - 11) * textProgress);
                const g = Math.round(13 + (255 - 13) * textProgress);
                const b = Math.round(16 + (255 - 16) * textProgress);

                document.documentElement.style.setProperty("--section-text", `rgb(${r}, ${g}, ${b})`);

                // Also update the section-bg variable for components that still use it (like Navbar)
                // From white (255, 255, 255) to dark brown (26, 18, 11)
                const bgR = Math.round(255 + (26 - 255) * progress);
                const bgG = Math.round(255 + (18 - 255) * progress);
                const bgB = Math.round(255 + (11 - 255) * progress);
                document.documentElement.style.setProperty("--section-bg-rgb", `${bgR}, ${bgG}, ${bgB}`);
                document.documentElement.style.setProperty("--section-bg", `rgb(${bgR}, ${bgG}, ${bgB})`);
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(frameId);
        };
    }, [targetOffset, vHeight]);

    return (
        <div className="relative">
            {/* FIXED GPU-ACCELERATED BACKGROUND LAYER */}
            <div
                ref={overlayRef}
                className="fixed inset-0 z-0 bg-[#1a120b] pointer-events-none opacity-0"
                style={{ willChange: "opacity" }}
            />

            <div className="relative z-10" style={{ color: "var(--section-text)" }}>
                {children}
            </div>
        </div>
    );
}
