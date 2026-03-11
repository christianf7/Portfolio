"use client";

import { useState, useCallback } from "react";
import { LoadingScreen } from "~/components/loading-screen";
import { BlobBackground } from "~/components/blob-background";
import { TopNav, FloatingDock } from "~/components/navigation";
import { HeroSection } from "~/components/sections/hero";
import { AboutSection } from "~/components/sections/about";
import { ProjectsSection } from "~/components/sections/projects";
import { ExperienceSection } from "~/components/sections/experience";
import { ContactSection } from "~/components/sections/contact";
import { Footer } from "~/components/sections/footer";

export default function Portfolio() {
    const [siteLoaded, setSiteLoaded] = useState(false);
    const handleLoadComplete = useCallback(() => setSiteLoaded(true), []);

    return (
        <div className="relative bg-black min-h-screen text-white selection:bg-sky-500/30">
            <LoadingScreen onComplete={handleLoadComplete} />
            <BlobBackground isLoaded={siteLoaded} />
            <TopNav />
            <FloatingDock />
            <HeroSection isLoaded={siteLoaded} />
            <AboutSection />
            <ProjectsSection />
            <ExperienceSection />
            <ContactSection />
            <Footer />

            <style jsx global>{`
                @keyframes glitch1 {
                    0%, 100% { transform: translate(-2px, -1px); }
                    25% { transform: translate(2px, 1px); }
                    50% { transform: translate(-1px, 2px); }
                    75% { transform: translate(1px, -2px); }
                }
                @keyframes glitch2 {
                    0%, 100% { transform: translate(2px, 1px); }
                    25% { transform: translate(-2px, -1px); }
                    50% { transform: translate(1px, -2px); }
                    75% { transform: translate(-1px, 2px); }
                }
            `}</style>
        </div>
    );
}
