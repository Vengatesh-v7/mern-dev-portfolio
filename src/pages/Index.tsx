import { lazy } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { usePageView } from "@/hooks/usePageView";
import { LazyMount } from "@/components/LazyMount";

// Lazy load all sections for better initial load
const HeroSection = lazy(() => import("@/components/HeroSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const OtherProjectsSection = lazy(() => import("@/components/OtherProjectsSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const QuizSection = lazy(() => import("@/components/QuizSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const InfoSection = lazy(() => import("@/components/InfoSection"));

// Minimal skeleton loader
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20 min-h-[200px]">
    <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

export default function Index() {
  // Track page views
  usePageView();

  return (
    <div className="relative min-h-screen">
      {/* Subtle Noise Overlay - Always Visible */}
      <div className="noise-overlay fixed inset-0 pointer-events-none z-50" />

      <Header />

      <main className="relative">
        {/* Hero is critical → load immediately */}
        <LazyMount fallback={<SectionLoader />} rootMargin="2000px 0px" minHeightClassName="min-h-screen">
          <HeroSection />
        </LazyMount>

        {/* Mount other sections only when near viewport */}
        <LazyMount fallback={<SectionLoader />}>
          <AboutSection />
        </LazyMount>

        <LazyMount fallback={<SectionLoader />}>
          <ExperienceSection />
        </LazyMount>

        <LazyMount fallback={<SectionLoader />}>
          <ProjectsSection />
        </LazyMount>

        <LazyMount fallback={<SectionLoader />}>
          <OtherProjectsSection />
        </LazyMount>

        <LazyMount fallback={<SectionLoader />}>
          <SkillsSection />
        </LazyMount>

        <LazyMount fallback={<SectionLoader />}>
          <QuizSection />
        </LazyMount>

        <LazyMount fallback={<SectionLoader />}>
          <InfoSection />
        </LazyMount>

        <LazyMount fallback={<SectionLoader />}>
          <ContactSection />
        </LazyMount>
      </main>

      <Footer />
      {/* <ScrollToTop /> */}
    </div>
  );
}

