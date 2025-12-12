import { Suspense, lazy } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { usePageView } from "@/hooks/usePageView";

// Lazy load heavy sections only when they enter viewport
const HeroSection = lazy(() =>
  import("@/components/HeroSection").then((mod) => ({
    default: (mod as any).default ?? (mod as any).HeroSection,
  }))
);
const AboutSection = lazy(() =>
  import("@/components/AboutSection").then((mod) => ({
    default: (mod as any).default ?? (mod as any).AboutSection,
  }))
);
const ExperienceSection = lazy(() =>
  import("@/components/ExperienceSection").then((mod) => ({
    default: (mod as any).default ?? (mod as any).ExperienceSection,
  }))
);
const ProjectsSection = lazy(() =>
  import("@/components/ProjectsSection").then((mod) => ({
    default: (mod as any).default ?? (mod as any).ProjectsSection,
  }))
);
const OtherProjectsSection = lazy(() =>
  import("@/components/OtherProjectsSection").then((mod) => ({
    default: (mod as any).default ?? (mod as any).OtherProjectsSection,
  }))
);
const SkillsSection = lazy(() =>
  import("@/components/SkillsSection").then((mod) => ({
    default: (mod as any).default ?? (mod as any).SkillsSection,
  }))
);
const QuizSection = lazy(() =>
  import("@/components/QuizSection").then((mod) => ({
    default: (mod as any).default ?? (mod as any).QuizSection,
  }))
);
const ContactSection = lazy(() =>
  import("@/components/ContactSection").then((mod) => ({
    default: (mod as any).default ?? (mod as any).ContactSection,
  }))
);
const InfoSection = lazy(() =>
  import("@/components/InfoSection").then((mod) => ({
    default: (mod as any).default ?? (mod as any).InfoSection,
  }))
);

// Optional: Custom loading spinner (reuse across site)
const SectionLoader = () => (
  <div className="flex items-center justify-center py-32">
    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
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
        {/* Hero is critical → load immediately but still in Suspense for consistency */}
        <HeroSection />

        {/* All other sections load only when near viewport */}
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ExperienceSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ProjectsSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <OtherProjectsSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <SkillsSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <QuizSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <InfoSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>

      </main>

      <Footer />
      {/* <ScrollToTop /> */}
    </div>
  );
}
