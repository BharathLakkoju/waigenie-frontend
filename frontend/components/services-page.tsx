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
      <main className="min-h-screen bg-gradient-to-br from-white-50 via-blue-50 to-white-50 overflow-hidden mt-28">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center items-center"
        >
          <span className="text-5xl font-bold pt-10">OUR SERVICES</span>
        </motion.div>

        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: -50 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex w-full justify-center items-center gap-36 min-h-[50rem]"
        >
          <div className="w-[500px] h-[500px] bg-[radial-gradient(50%_50%_at_50%_50%,_var(--tw-gradient-stops))] from-blue-500/40 to-blue-100/0.1 flex justify-center items-center backdrop-blur-md gap-20">
            <div className="w-[500px] text-center text-3xl text-black p-10 rounded-lg bg-transparent">
              Empower your QA team with cutting-edge AI solutions tailored for
              enterprise needs
            </div>
          </div>
          <div>
            <Image
              src="/about_graphic.png"
              alt="About_Graphic"
              width={500}
              height={500}
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
          className="mb-16"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                  Meet Our AI Agent
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  Experience the future of QA testing with our advanced AI
                  agent, designed to revolutionize your testing process.
                </p>
                <Tabs defaultValue="features" className="w-full">
                  <TabsList>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="benefits">Benefits</TabsTrigger>
                  </TabsList>
                  <TabsContent value="features">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <ChevronRight className="w-5 h-5 text-indigo-500 mr-2" />
                        <span>Autonomous test scenario generation</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-5 h-5 text-indigo-500 mr-2" />
                        <span>Intelligent bug detection and reporting</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-5 h-5 text-indigo-500 mr-2" />
                        <span>Adaptive learning from test results</span>
                      </li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="benefits">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <ChevronRight className="w-5 h-5 text-indigo-500 mr-2" />
                        <span>Reduce manual testing time by up to 70%</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-5 h-5 text-indigo-500 mr-2" />
                        <span>Improve test coverage and accuracy</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-5 h-5 text-indigo-500 mr-2" />
                        <span>Accelerate software delivery pipeline</span>
                      </li>
                    </ul>
                  </TabsContent>
                </Tabs>
                <Button className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                  Try AI Agent Demo
                </Button>
              </div>
              <div className="md:w-1/2">
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
                    className="w-64 h-64 mx-auto bg-indigo-100 rounded-full flex items-center justify-center"
                  >
                    <Cpu className="w-32 h-32 text-indigo-600" />
                  </motion.div>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <motion.div className="w-80 h-80 bg-purple-200 rounded-full opacity-50 filter blur-xl" />
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
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-around items-center h-[700px] bg-[#C9EFFF]/50 rounded-2xl shadow-xl"
        >
          <div
            className={`text-[5rem] flex flex-col justify-center items-start font-normal`}
          >
            <span>Why</span>
            <span className="text-[#432F91]">WaiGenie?</span>
          </div>
          <div className="w-[500px] flex flex-wrap">
            <div className="flex flex-col justify-center items-start gap-10">
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
      <div className="flex justify-center items-center gap-8">
        <div className="p-2 bg-[#7A71E2] rounded-full">
          <ArrowRight className="size-6 text-white" />
        </div>
        <span className="flex flex-col gap-2">
          <span className="text-xl font-bold">{title}</span>
          <span className="text-sm">{description}</span>
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
            className="w-full h-[400px]"
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
              <Brain className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
            <div
              className={`p-4 bg-slate-800 rounded-full shadow-lg shadow-purple-500/20 ${
                animate ? "animate-fadeIn delay-300" : "opacity-0"
              }`}
            >
              <TestTube className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
            <div
              className={`p-4 bg-slate-800 rounded-full shadow-lg shadow-green-500/20 ${
                animate ? "animate-fadeIn delay-600" : "opacity-0"
              }`}
            >
              <GitBranch className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2">
            <div
              className={`p-4 bg-slate-800 rounded-full shadow-lg shadow-teal-500/20 ${
                animate ? "animate-fadeIn delay-900" : "opacity-0"
              }`}
            >
              <CheckCircle className="w-8 h-8 text-teal-400" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Intelligent Element Inspector",
      description:
        "Automatically identify and analyze web elements with precision.",
      image: (<ElementInspector/>),
    },
    {
      title: "Gherkin Feature Generator",
      description:
        "Transform user stories into clear, concise Gherkin feature files.",
      image: (<GherkinAnimation/>),
    },
    {
      title: "Automated Code Generation",
      description:
        "Generate test automation scripts in multiple languages automatically.",
      image: (<CodeAnimation/>),
    },
    {
      title: "Web Agent Explorer",
      description:
        "Leverage AI to automatically explore and test complex user journeys.",
      image: "/placeholder.svg",
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
      <div className="grid grid-cols-3 justify-center items-center max-w-6xl mx-auto gap-10 my-20 pb-10">
        {arr.map((item, index) => (
          <div
            className="border-2 rounded-lg min-w-[300px] min-h-[350px]"
            key={index}
          >
            {item.image}
            <div className="text-center text-lg font-bold">{item.title}</div>
            <div className="text-center text-lg text-black rounded-lg bg-transparent px-5 py-2">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const ElementInspector = () => {
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsScanning(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] bg-transparent rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <InspectorSVG isScanning={isScanning} />
      </motion.div>

      {/* <FeatureIcons /> */}
    </div>
  );
};

const features = [
  { Icon: Search, label: "Detect" },
  { Icon: Code2, label: "Analyze" },
  { Icon: Scan, label: "Inspect" }
];

export const FeatureIcons = () => {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-8">
      {features.map(({ Icon, label }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="p-3 rounded-full bg-gray-800/50 backdrop-blur-sm">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <span className="text-sm text-gray-300">{label}</span>
        </motion.div>
      ))}
    </div>
  );
};


interface InspectorSVGProps {
  isScanning: boolean;
}

export const InspectorSVG = ({ isScanning }: InspectorSVGProps) => {
  return (
    <svg width="400" height="300" viewBox="0 0 400 300">
      <motion.rect
        x="50"
        y="50"
        width="300"
        height="200"
        rx="8"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      <motion.line
        x1="50"
        y1={isScanning ? "50" : "250"}
        x2="350"
        y2={isScanning ? "50" : "250"}
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          y: isScanning ? [0, 200] : [200, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {[
        { x: 100, y: 100 },
        { x: 200, y: 150 },
        { x: 300, y: 100 }
      ].map((point, index) => (
        <motion.circle
          key={index}
          cx={point.x}
          cy={point.y}
          r="4"
          fill="hsl(var(--primary))"
          initial={{ scale: 0 }}
          animate={{ 
            scale: [0, 1.5, 1],
            opacity: [0, 1, 0.5]
          }}
          transition={{
            duration: 2,
            delay: index * 0.5,
            repeat: Infinity
          }}
        />
      ))}
    </svg>
  );
};

export function GherkinAnimation() {
  return (
    <div className="relative w-full h-[400px] bg-transparent rounded-xl backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-between gap-2 px-6">
        {/* User Story Card */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-42 h-54 bg-white rounded-lg shadow-xl p-6 transform -rotate-3"
        >
          <FileText className="w-8 h-8 text-blue-600 mb-4" />
          <div className="space-y-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="h-4 bg-slate-200 rounded"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="h-4 bg-slate-200 rounded"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "90%" }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="h-4 bg-slate-200 rounded"
            />
          </div>
        </motion.div>

        {/* Arrow Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <ArrowRight className="size-6 text-blue-400" />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="p-1 bg-blue-500 rounded-full"
          >
            <Code2 className="w-6 h-6 text-white" />
          </motion.div>
        </motion.div>

        {/* Gherkin Feature Card */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="w-42 h-54 bg-slate-800 rounded-lg shadow-xl p-2 transform rotate-3 text-green-400 font-mono"
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
              <div className="pl-4 text-blue-300">Given I am on the login page</div>
              <div className="pl-4 text-yellow-300">When I enter valid credentials</div>
              <div className="pl-4 text-green-300">Then I should be logged in</div>
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
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
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

const CodeAnimation = () => {
  const [codeStreams, setCodeStreams] = useState<Array<{ id: number; delay: number }>>([]);

  useEffect(() => {
    const streams = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      delay: i * 0.5,
    }));
    setCodeStreams(streams);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {codeStreams.map(({ id, delay }) => (
        <motion.div
          key={id}
          className="absolute"
          initial={{ y: "-100%", x: `${(id * 20) + 10}%` }}
          animate={{
            y: "200%",
            transition: {
              duration: 8,
              delay,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <div className="flex flex-col items-center space-y-4 opacity-50">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="text-emerald-400">
                {index % 2 === 0 ? <Code2 size={24} /> : <Terminal size={24} />}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-t from-gray-800/80 via-transparent to-gray-800/80" />
    </div>
  );
};

const languages = [
  { name: "Python", color: "bg-blue-500" },
  { name: "JavaScript", color: "bg-yellow-400" },
  { name: "Java", color: "bg-red-500" },
  { name: "C#", color: "bg-purple-500" },
  { name: "Ruby", color: "bg-red-600" },
];

export const LanguageCircles = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {languages.map((lang, index) => (
        <motion.div
          key={lang.name}
          className="absolute"
          initial={{ scale: 0, opacity: 0 }}
          animate={isVisible ? {
            scale: 1,
            opacity: 1,
            x: Math.cos(((2 * Math.PI) / languages.length) * index) * 150,
            y: Math.sin(((2 * Math.PI) / languages.length) * index) * 150,
          } : {}}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: index * 0.1,
          }}
        >
          <motion.div
            className={`w-16 h-16 rounded-full ${lang.color} flex items-center justify-center
              shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white font-semibold text-sm">{lang.name}</span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};