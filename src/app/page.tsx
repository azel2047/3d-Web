"use client";

import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Experiments from "@/components/Experiments";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import { useState, useEffect } from "react";

const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <>
      <Preloader isLoading={isLoading} />
      {!isMobile && <CustomCursor />}
      <main className="relative">
        <Navigation />
        <Hero />
        <Projects />
        <About />
        <Experiments />
        <Footer />
      </main>
    </>
  );
}
