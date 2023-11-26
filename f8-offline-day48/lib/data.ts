import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import zingMP3Project from "@/public/ZingMP3_Project.jpg";
import trelloProject from "@/public/Trello_Project.jpg";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Education",
    hash: "#education",
  },
  {
    name: "Certificate",
    hash: "#certificate",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const educationData = [
  {
    title: "Ha Noi University of Science and Technology",
    location: "Ha Noi",
    icon: React.createElement(LuGraduationCap),
    date: "2019 - 2023",
  },
  {
    title: "Vinh Phuc High School for Gifted Student",
    location: "Vinh Phuc",
    icon: React.createElement(LuGraduationCap),
    date: "2016 - 2019",
  },
  {
    title: "Yen Lac Junior High School",
    location: "Vinh Phuc",
    icon: React.createElement(LuGraduationCap),
    date: "2014 - 2016",
  },
] as const;

export const certificatesData = [
  {
    title: "Graduated Ha Noi University of Science and Technology",
    location: "Ha Noi",
    icon: React.createElement(LuGraduationCap),
    CPA: "3.53/4.0",
    date: "2019 - 2023",
  },
  {
    title:
      "Encouraging Study Scholarship of Ha Noi University of Science and Technolog",
    location: "Ha Noi",
    icon: React.createElement(LuGraduationCap),
    CPA: null,
    date: "10/2022",
  },
  {
    title:
      "Certificate of Commendation from the Ho Chi Minh Communist Youth Union Executive Committee, Hanoi University of Science and Technology. ",
    location: "Ha Noi",
    icon: React.createElement(LuGraduationCap),
    CPA: null,
    date: "2019-2020, 2020-2021, 2021-2022",
  },
  {
    title:
      "Certificate of Commendation from the Rector of Hanoi University of Science and Technology.  ",
    location: "Ha Noi",
    icon: React.createElement(LuGraduationCap),
    CPA: null,
    date: "2020-2021",
  },
  {
    title:
      "Achieved the title of Excellent Student with 5 Criteria at the university level.  ",
    location: "Ha Noi",
    icon: React.createElement(LuGraduationCap),
    CPA: null,
    date: "2020-2021",
  },
] as const;

export const experiencesData = [
  {
    title: "This is the title",
    location: "Ha Noi",
    description: "This is the description",
    icon: React.createElement(LuGraduationCap),
    date: "2019",
  },
  {
    title: "Front-End Developer",
    location: "Ha Noi",
    description: "This is the description",
    icon: React.createElement(CgWorkAlt),
    date: "2019 - 2021",
  },
  {
    title: "Full-Stack Developer",
    location: "Ha Noi",
    description: "This is the description",
    icon: React.createElement(FaReact),
    date: "2021 - present",
  },
] as const;

export const projectsData = [
  {
    title: "Clone ZingMP3",
    description:
      "The project has main functions such as: song playlist, next/prev/play/pause/random song, karaoke for song",
    tags: ["Javascript", "HTML", "SCSS"],
    imageUrl: zingMP3Project,
  },
  {
    title: "Clone Trello",
    description:
      "The project has the following main functions: drag and drop columns and tags like trello web, build database and write drag and drop api, login registration,...",
    tags: ["ReactJs", "NodeJs/ExpressJs", "MUI", "Redux-Toolkit"],
    imageUrl: trelloProject,
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "MongoDB",
  "Redux",
  "Express",
  "Python",
  "Django",
  "Framer Motion",
] as const;
