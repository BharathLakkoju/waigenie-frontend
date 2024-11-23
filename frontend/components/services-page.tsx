"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Inria_Serif } from "next/font/google";
import { ArrowBigRightDash, ArrowRight, ChevronRight, Cpu } from "lucide-react";

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

const arr = [
  {
    title: "AI-Powered Test Idea Generation",
    description:
      "Generate comprehensive test scenarios using advanced AI algorithms.",
    image: "/placeholder.svg",
  },
  {
    title: "Intelligent Element Inspector",
    description:
      "Automatically identify and analyze web elements with precision.",
    image: "/placeholder.svg",
  },
  {
    title: "Gherkin Feature Generator",
    description:
      "Transform user stories into clear, concise Gherkin feature files.",
    image: "/placeholder.svg",
  },
  {
    title: "Automated Code Generation",
    description:
      "Generate test automation scripts in multiple languages automatically.",
    image: "/placeholder.svg",
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
              src="/About_Graphic.png"
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
  return (
    <>
      <div className="grid grid-cols-3 justify-center items-center max-w-6xl mx-auto gap-10 my-20 pb-10">
        {arr.map((item, index) => (
          <div
            className="border-2 rounded-lg min-w-[300px] min-h-[350px]"
            key={index}
          >
            <div className="p-2">
              <Image
                src={item.image}
                alt="about_graphic"
                width={200}
                height={200}
                className="p-2"
              />
            </div>
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
