import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import CanvasWrapper from "@/components/canvas/CanvasWrapper";

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  return (
    <>
      <CanvasWrapper />
      <Navbar />
      <main className="flex-1 relative z-10 pt-16">
        {section === "hero" && <Hero />}
        {section === "about" && <About />}
        {section === "projects" && <Projects />}
        {section === "experience" && <Experience />}
        {section === "achievements" && <Achievements />}
        {section === "contact" && <Contact />}
      </main>
      <Footer />
    </>
  );
}
