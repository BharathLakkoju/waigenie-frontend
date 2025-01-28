"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Code2,
  Scan,
  ArrowRight,
  Brain,
  CheckCircle,
  ChevronRight,
  Cpu,
  GitBranch,
  TestTube,
  FileText,
  Terminal,
  Cog,
  Wand2,
} from "lucide-react";

interface SideTextProps {
  title: string;
  description: string;
}

const sideTextArr = [
  {
    title: "Increased Efficiency",
    description:
      "Reduce manual testing time by up to 70% with our AI-powered solutions.",
  },
  {
    title: "Improved Quality",
    description: "Catch more bugs and edge cases before they reach production.",
  },
  {
    title: "Reduce Costs",
    description:
      "Lower your QA expenses while improving test coverage and accuracy.",
  },
  {
    title: "Faster Time-To-Market",
    description:
      "Accelerate your software delivery pipeline with automated testing.",
  },
  {
    title: "Scalability",
    description:
      "Scale your testing efforts to meet the demands of your growing application.",
  },
  {
    title: "Continuous Improvement",
    description: "Continuously improve your testing processes with feedback.",
  },
];

export default function ServicesPage() {
  const titleRef = useRef(null);
  const heroRef = useRef(null);
  const listRef = useRef(null);
  const agentRef = useRef(null);
  const whyRef = useRef(null);

  const isTitleInView = useInView(titleRef, { once: true });
  const isHeroInView = useInView(heroRef, { once: true });
  const isListInView = useInView(listRef, { once: true });
  const isAgentInView = useInView(agentRef, { once: true });
  const isWhyInView = useInView(whyRef, { once: true });

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-white-50 via-blue-50 to-white-50 overflow-hidden mt-20 sm:mt-24 md:mt-28">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center items-center px-4"
        >
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold pt-6 sm:pt-8 md:pt-10 text-center">OUR SERVICES</span>
        </motion.div>

        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: -50 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row w-full justify-center items-center gap-8 md:gap-16 lg:gap-36 min-h-[30rem] md:min-h-[40rem] lg:min-h-[50rem] px-4 py-8"
        >
          <div className="w-full md:w-[400px] lg:w-[500px] h-[300px] md:h-[400px] lg:h-[500px] bg-[radial-gradient(50%_50%_at_50%_50%,_var(--tw-gradient-stops))] from-blue-500/40 to-blue-100/0.1 flex justify-center items-center backdrop-blur-md">
            <div className="w-full text-center text-xl sm:text-2xl md:text-3xl text-black p-6 md:p-10 rounded-lg bg-transparent">
              Empower your QA team with cutting-edge AI solutions tailored for
              enterprise needs
            </div>
          </div>
          <div className="w-full md:w-auto px-4 md:px-0">
            <Image
              src="/about_graphic.png"
              alt="About_Graphic"
              width={500}
              height={500}
              className="w-full md:w-[400px] lg:w-[500px] h-auto"
            />
          </div>
        </motion.div>

        <motion.div
          ref={listRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isListInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <ListComp />
        </motion.div>

        {/* AI Agent Section */}
        <motion.section
          ref={agentRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isAgentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-16 px-4"
        >
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
                  Meet Our AI Agent
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 mb-6">
                  Experience the future of QA testing with our advanced AI
                  agent, designed to revolutionize your testing process.
                </p>
                <Tabs defaultValue="features" className="w-full">
                  <TabsList className="flex flex-wrap">
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="benefits">Benefits</TabsTrigger>
                  </TabsList>
                  <TabsContent value="features">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <ChevronRight className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0" />
                        <span className="text-sm sm:text-base">Autonomous test scenario generation</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0" />
                        <span className="text-sm sm:text-base">Intelligent bug detection and reporting</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0" />
                        <span className="text-sm sm:text-base">Adaptive learning from test results</span>
                      </li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="benefits">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <ChevronRight className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0" />
                        <span className="text-sm sm:text-base">Reduce manual testing time by up to 70%</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0" />
                        <span className="text-sm sm:text-base">Improve test coverage and accuracy</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0" />
                        <span className="text-sm sm:text-base">Accelerate software delivery pipeline</span>
                      </li>
                    </ul>
                  </TabsContent>
                </Tabs>
                <Button className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white w-full sm:w-auto">
                  Try AI Agent Demo
                </Button>
              </div>
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 mx-auto bg-indigo-100 rounded-full flex items-center justify-center"
                  >
                    <Cpu className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 text-indigo-600" />
                  </motion.div>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <motion.div className="w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-purple-200 rounded-full opacity-50 filter blur-xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.div
          ref={whyRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isWhyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 flex flex-col md:flex-row justify-around items-center min-h-[500px] md:min-h-[700px] bg-[#C9EFFF]/50 rounded-2xl shadow-xl gap-8 md:gap-0 max-md:max-w-[calc(100%-40px)]"
        >
          <div className="text-3xl sm:text-4xl md:text-5xl flex flex-col justify-center items-center md:items-start font-normal text-center md:text-left">
            <span>Why</span>
            <span className="text-[#432F91]">WaiGenie?</span>
          </div>
          <div className="w-full md:w-[500px] flex flex-wrap">
            <div className="flex flex-col justify-center items-start gap-6 md:gap-10">
              {sideTextArr.map((item, index) => (
                <SideText
                  key={index}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}

function SideText({ title, description }: SideTextProps) {
  return (
    <>
      <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 w-full">
        <div className="p-2 bg-[#7A71E2] rounded-full flex-shrink-0">
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
        </div>
        <span className="flex flex-col gap-1 sm:gap-2">
          <span className="text-base sm:text-lg md:text-xl font-bold">{title}</span>
          <span className="text-xs sm:text-sm md:text-base">{description}</span>
        </span>
      </div>
    </>
  );
}

function ListComp() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);
  const arr = [
    {
      title: "AI-Powered Test Idea Generation",
      description:
        "Generate comprehensive test scenarios using advanced AI algorithms.",
      image: (
        <div className="relative">
          {/* SVG Animation Container */}
          <svg
            className="w-full h-[300px] sm:h-[350px] md:h-[400px]"
            viewBox="0 0 800 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Connecting Lines */}
            <path
              d="M200,200 C300,200 500,100 600,200"
              className={`stroke-blue-500/50 stroke-[2] fill-none ${
                animate ? "animate-drawLine" : ""
              }`}
              pathLength="1"
            />
            <path
              d="M200,200 C300,200 500,300 600,200"
              className={`stroke-purple-500/50 stroke-[2] fill-none ${
                animate ? "animate-drawLine delay-300" : ""
              }`}
              pathLength="1"
            />

            {/* Animated Particles */}
            <circle
              className={`fill-blue-500 ${
                animate ? "animate-moveParticle" : ""
              }`}
              r="4"
            >
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                path="M200,200 C300,200 500,100 600,200"
              />
            </circle>
            <circle
              className={`fill-purple-500 ${
                animate ? "animate-moveParticle delay-1000" : ""
              }`}
              r="4"
            >
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                path="M200,200 C300,200 500,300 600,200"
              />
            </circle>
          </svg>

          {/* Feature Icons */}
          <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div
              className={`p-4 bg-slate-800 rounded-full shadow-lg shadow-blue-500/20 ${
                animate ? "animate-fadeIn" : "opacity-0"
              }`}
            >
              <Brain className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-400" />
            </div>
          </div>

          <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
            <div
              className={`p-4 bg-slate-800 rounded-full shadow-lg shadow-purple-500/20 ${
                animate ? "animate-fadeIn delay-300" : "opacity-0"
              }`}
            >
              <TestTube className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-400" />
            </div>
          </div>

          <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
            <div
              className={`p-4 bg-slate-800 rounded-full shadow-lg shadow-green-500/20 ${
                animate ? "animate-fadeIn delay-600" : "opacity-0"
              }`}
            >
              <GitBranch className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-400" />
            </div>
          </div>

          <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2">
            <div
              className={`p-4 bg-slate-800 rounded-full shadow-lg shadow-teal-500/20 ${
                animate ? "animate-fadeIn delay-900" : "opacity-0"
              }`}
            >
              <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-teal-400" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Intelligent Element Inspector",
      description:
        "Automatically identify and analyze web elements with precision.",
      image: <ElementInspector />,
    },
    {
      title: "Gherkin Feature Generator",
      description:
        "Transform user stories into clear, concise Gherkin feature files.",
      image: <GherkinAnimation />,
    },
    {
      title: "Automated Code Generation",
      description:
        "Generate test automation scripts in multiple languages automatically.",
      image: <CodeGeneration />,
    },
    {
      title: "Web Agent Explorer",
      description:
        "Leverage AI to automatically explore and test complex user journeys.",
      image: <WebMazeAnimation />,
    },
    {
      title: "Custom Integration Solutions",
      description:
        "Seamlessly integrate WAIGENIE into your existing QA workflow and tools.",
      image: "/placeholder.svg",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center max-w-[85rem] mx-auto gap-6 sm:gap-8 lg:gap-10 my-10 sm:my-16 md:my-20 p-4 sm:p-6 md:p-8">
        {arr.map((item, index) => (
          <div
            className="border-2 rounded-lg w-full min-h-[350px] sm:min-h-[400px]"
            key={index}
          >
            {item.image}
            <div className="text-center text-base sm:text-lg font-bold px-2 sm:px-4">{item.title}</div>
            <div className="text-center text-sm sm:text-base text-black rounded-lg bg-transparent px-3 sm:px-5 py-2">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const WebMazeAnimation: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = svgRef.current;
      const nodes = svg.querySelectorAll(".node");
      const lines = svg.querySelectorAll(".line");
      const path = svg.querySelector(".path") as SVGPathElement;

      // Animate nodes
      nodes.forEach((node, index) => {
        node.animate(
          [
            { opacity: 0, transform: "scale(0)" },
            { opacity: 1, transform: "scale(1)" },
          ],
          { duration: 1000, delay: index * 100, fill: "forwards" }
        );
      });

      // Animate lines
      lines.forEach((line, index) => {
        line.animate([{ strokeDashoffset: 100 }, { strokeDashoffset: 0 }], {
          duration: 1000,
          delay: 500 + index * 100,
          fill: "forwards",
        });
      });

      // Animate path
      if (path) {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
        path.animate([{ strokeDashoffset: length }, { strokeDashoffset: 0 }], {
          duration: 3000,
          delay: 1500,
          fill: "forwards",
        });
      }
    }
  }, []);

  return (
    <svg
      ref={svgRef}
      className="w-full h-full"
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="400" height="300" fill="#fff" />

      {/* Nodes */}
      <circle className="node" cx="50" cy="50" r="10" fill="#4a5568" />
      <circle className="node" cx="150" cy="100" r="10" fill="#4a5568" />
      <circle className="node" cx="250" cy="50" r="10" fill="#4a5568" />
      <circle className="node" cx="350" cy="100" r="10" fill="#4a5568" />
      <circle className="node" cx="50" cy="200" r="10" fill="#4a5568" />
      <circle className="node" cx="150" cy="250" r="10" fill="#4a5568" />
      <circle className="node" cx="250" cy="300" r="10" fill="#4a5568" />
      <circle className="node" cx="350" cy="350" r="10" fill="#4a5568" />

      {/* Lines */}
      <line
        className="line"
        x1="50"
        y1="50"
        x2="150"
        y2="100"
        stroke="#718096"
        strokeWidth="2"
      />
      <line
        className="line"
        x1="150"
        y1="100"
        x2="250"
        y2="50"
        stroke="#718096"
        strokeWidth="2"
      />
      <line
        className="line"
        x1="250"
        y1="50"
        x2="350"
        y2="100"
        stroke="#718096"
        strokeWidth="2"
      />
      <line
        className="line"
        x1="50"
        y1="50"
        x2="50"
        y2="200"
        stroke="#718096"
        strokeWidth="2"
      />
      <line
        className="line"
        x1="150"
        y1="100"
        x2="150"
        y2="250"
        stroke="#718096"
        strokeWidth="2"
      />
      <line
        className="line"
        x1="250"
        y1="50"
        x2="250"
        y2="300"
        stroke="#718096"
        strokeWidth="2"
      />
      <line
        className="line"
        x1="350"
        y1="100"
        x2="350"
        y2="350"
        stroke="#718096"
        strokeWidth="2"
      />
      <line
        className="line"
        x1="50"
        y1="200"
        x2="150"
        y2="250"
        stroke="#718096"
        strokeWidth="2"
      />
      <line
        className="line"
        x1="150"
        y1="250"
        x2="250"
        y2="300"
        stroke="#718096"
        strokeWidth="2"
      />
      <line
        className="line"
        x1="250"
        y1="300"
        x2="350"
        y2="350"
        stroke="#718096"
        strokeWidth="2"
      />

      {/* Path */}
      <path
        className="path"
        d="M50,50 L150,100 L250,50 L350,100 L350,350 L250,300 L150,250 L50,200"
        fill="none"
        stroke="#48bb78"
        strokeWidth="4"
      />
    </svg>
  );
};

const ElementInspector = () => {
  const duration = 3;
  const delay = 0.3;

  const fadeInOut = {
    opacity: [0, 1, 1, 0],
    transition: {
      duration: duration,
      times: [0, 0.2, 0.8, 1],
      repeat: Infinity,
    },
  };

  const scanLine = {
    y: [0, 160, 160, 0],
    opacity: [0, 1, 1, 0],
    transition: {
      duration: duration,
      times: [0, 0.2, 0.8, 1],
      repeat: Infinity,
    },
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] bg-transparent rounded-xl backdrop-blur-sm overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-between gap-2 px-4 sm:px-6">
        <svg width="300" height="200" viewBox="0 0 300 200">
          <motion.rect
            x="50"
            y="20"
            width="200"
            height="160"
            rx="10"
            ry="10"
            fill="white"
            stroke="black"
            strokeWidth="2"
            animate={fadeInOut}
          />
          <motion.rect
            x="60"
            y="30"
            width="180"
            height="30"
            rx="5"
            ry="5"
            fill="#e0e0e0"
            animate={fadeInOut}
            transition={{ ...fadeInOut.transition, delay: delay }}
          />
          <motion.rect
            x="60"
            y="70"
            width="180"
            height="20"
            rx="5"
            ry="5"
            fill="#f0f0f0"
            animate={fadeInOut}
            transition={{ ...fadeInOut.transition, delay: delay * 2 }}
          />
          <motion.rect
            x="60"
            y="100"
            width="180"
            height="20"
            rx="5"
            ry="5"
            fill="#f0f0f0"
            animate={fadeInOut}
            transition={{ ...fadeInOut.transition, delay: delay * 3 }}
          />
          <motion.rect
            x="60"
            y="130"
            width="80"
            height="40"
            rx="5"
            ry="5"
            fill="#d0d0d0"
            animate={fadeInOut}
            transition={{ ...fadeInOut.transition, delay: delay * 4 }}
          />
          <motion.line
            x1="50"
            x2="250"
            strokeWidth="2"
            stroke="red"
            animate={scanLine}
          />
        </svg>
      </div>
    </div>
  );
};

export function GherkinAnimation() {
  return (
    <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] bg-transparent rounded-xl backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-between gap-2 px-4 sm:px-6">
        {/* User Story Card */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-32 sm:w-36 md:w-40 h-48 sm:h-52 md:h-54 bg-white rounded-lg shadow-xl p-4 sm:p-5 md:p-6 transform -rotate-3"
        >
          <FileText className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600 mb-3 sm:mb-4" />
          <div className="space-y-3 sm:space-y-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="h-3 sm:h-4 bg-slate-200 rounded"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="h-3 sm:h-4 bg-slate-200 rounded"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "90%" }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="h-3 sm:h-4 bg-slate-200 rounded"
            />
          </div>
        </motion.div>

        {/* Arrow Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.3 }}
          className="flex flex-col items-center gap-3 sm:gap-4"
        >
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-400" />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="p-1 bg-blue-500 rounded-full"
          >
            <Code2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
          </motion.div>
        </motion.div>

        {/* Gherkin Feature Card */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="w-44 h-52 bg-slate-800 rounded-lg shadow-xl p-4 transform rotate-3 text-green-400 font-mono"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="space-y-4"
          >
            <div className="text-xs">Feature: User Authentication</div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.5 }}
              className="pl-1 text-xs"
            >
              <div className="text-purple-400">Scenario: Successful Login</div>
              <div className="pl-4 text-blue-300">
                Given I am on the login page
              </div>
              <div className="pl-4 text-yellow-300">
                When I enter valid credentials
              </div>
              <div className="pl-4 text-green-300">
                Then I should be logged in
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
        <svg
          className="absolute w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-slate-500/20"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>
    </div>
  );
}

export function CodeGeneration() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <>
      <div className="relative w-full h-[300px] md:h-[400px]">
        {/* SVG Animation Container */}
        <svg
          className={`w-full h-full ${
            isVisible ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000`}
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Central Cog */}
          <g
            className="animate-spin-slow"
            style={{ transformOrigin: "center" }}
          >
            <circle
              cx="200"
              cy="200"
              r="80"
              className="fill-blue-500/20 stroke-blue-500"
              strokeWidth="2"
            />
            <circle
              cx="200"
              cy="200"
              r="60"
              className="fill-violet-500/20 stroke-violet-500"
              strokeWidth="2"
            />
          </g>

          {/* Orbiting Code Blocks */}
          {[0, 120, 240].map((angle, i) => (
            <g
              key={i}
              className="animate-orbit"
              style={{
                transformOrigin: "200px 200px",
                animationDelay: `${i * -2}s`,
              }}
            >
              <rect
                x="320"
                y="180"
                width="40"
                height="40"
                rx="8"
                className={`fill-${
                  i === 0 ? "blue" : i === 1 ? "violet" : "indigo"
                }-500/30 stroke-${
                  i === 0 ? "blue" : i === 1 ? "violet" : "indigo"
                }-500`}
                strokeWidth="2"
                transform={`rotate(${angle} 200 200)`}
              >
                <animate
                  attributeName="opacity"
                  values="0.5;1;0.5"
                  dur="3s"
                  repeatCount="indefinite"
                  begin={`${i * 1}s`}
                />
              </rect>
            </g>
          ))}

          {/* Connecting Lines */}
          <g className="stroke-gray-500/30">
            {[0, 120, 240].map((angle, i) => (
              <line
                key={`line-${i}`}
                x1="200"
                y1="200"
                x2="340"
                y2="200"
                strokeWidth="1"
                transform={`rotate(${angle} 200 200)`}
                className="animate-pulse"
              >
                <animate
                  attributeName="opacity"
                  values="0.2;0.5;0.2"
                  dur="2s"
                  repeatCount="indefinite"
                  begin={`${i * 0.6}s`}
                />
              </line>
            ))}
          </g>
        </svg>
      </div>
    </>
  );
}
