import About from "@/components/About";
import Certificate from "@/components/Certificate";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Intro from "@/components/Intro";
import Projects from "@/components/Projects";
import SectionDivider from "@/components/Section-Divider";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider />
      <About />
      <Education />
      <Certificate />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}