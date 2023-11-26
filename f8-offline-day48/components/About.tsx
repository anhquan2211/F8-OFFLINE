"use client";

import { motion } from "framer-motion";

import { useSectionInView } from "@/lib/hooks";
import SectionHeading from "./Section-Heading";

const About = () => {
  // Using useSectionInView hook to track section visibility
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
      ref={ref}
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        After graduating with a degree in{" "}
        <span className="font-medium">Automation</span>, I made the bold
        decision to chase my passion for programming. I dove into a
        comprehensive coding bootcamp, immersing myself in{" "}
        <span className="font-medium">full-stack web development</span>. What
        truly ignites my enthusiasm in programming is{" "}
        <span className="font-italic">the art of problem-solving</span>.
        There&apos;s an incredible rush when I finally crack a challenging
        problem and unravel a solution.
      </p>
      <p>
        My tech toolkit revolves around{" "}
        <span className="underline">React, Next.js, Node.js, and MongoDB</span>.
        I&apos;ve also delved into{" "}
        <span className="underline">TypeScript and Prisma</span>, adding depth
        to my skill set. The thrill of staying updated and diving into emerging
        technologies keeps me on my toes. I&apos;m always seeking new knowledge
        and skills to refine my craft.
      </p>
      <p>
        Beyond coding, I find joy in exploring various facets of life. Whether
        I&apos;m engrossed in gaming, exploring the nuances of movies, or simply
        reveling in the company of my furry friend, my interests are diverse.
        Currently, my quest for learning extends beyond tech; I&apos;m delving
        into the realms of history and philosophy, while also picking up the
        strings of a guitar, seeking harmony in both melodies and thoughts.
        Amidst all these pursuits, I&apos;m actively seeking{" "}
        <span className="italic font-medium">
          a full-time role in software development
        </span>{" "}
        , eager to contribute my skills and passion to a dynamic team.
      </p>
    </motion.section>
  );
};

export default About;
