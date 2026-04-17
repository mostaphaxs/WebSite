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

                // Use the same refined timing as before
                const enterThreshold = targetOffset - vHeight - 100;
                const fullThreshold = targetOffset - (vHeight * 0.4);

                let progress = (scrollY - enterThreshold) / (fullThreshold - enterThreshold);
                progress = Math.max(0, Math.min(1, progress));

                // Use transform/opacity for GPU acceleration
                overlayRef.current.style.opacity = progress.toString();
                // Use will-change to hint browser
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
            {/* 
          HIGH PERFORMANCE BACKGROUND LAYER 
          Using opacity on a fixed div is significantly more performant 
          than updating background-color on multiple elements.
      */}
            <div
                ref={overlayRef}
                className="fixed inset-0 z-0 bg-[#1a120b] pointer-events-none opacity-0"
                style={{ willChange: "opacity" }}
            />

            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
