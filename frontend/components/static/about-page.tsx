"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { Bot, Eye, Code, Play, LineChart } from "lucide-react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    icon: <Bot className="w-8 md:w-10 h-8 md:h-10 text-blue-600" />,
    title: "AI-Powered Test Idea Generation",
    description:
      "Generate comprehensive test scenarios using advanced AI algorithms.",
  },
  {
    icon: <Eye className="w-8 md:w-10 h-8 md:h-10 text-blue-600" />,
    title: "Intelligent Element Inspector", 
    description:
      "Automatically identify and analyze web elements with precision.",
  },
  {
    icon: <Code className="w-8 md:w-10 h-8 md:h-10 text-blue-600" />,
    title: "Gherkin Feature Generator",
    description:
      "Transform user stories into clear, concise Gherkin feature files.",
  },
  {
    icon: <Code className="w-8 md:w-10 h-8 md:h-10 text-blue-600" />,
    title: "Automated Code Generation",
    description:
      "Generate test automation scripts in multiple languages automatically.",
  },
  {
    icon: <Play className="w-8 md:w-10 h-8 md:h-10 text-blue-600" />,
    title: "Web Agent Explorer",
    description:
      "Leverage AI to automatically explore and test complex user journeys.",
  },
  {
    icon: <LineChart className="w-8 md:w-10 h-8 md:h-10 text-blue-600" />,
    title: "Advanced Analytics",
    description:
      "Gain insights into your testing processes and identify areas for improvement with detailed reporting and analytics.",
  },
];

export default function AboutPage() {
  const headerRef = useRef(null);
  const visionRef = useRef(null);
  const missionRef = useRef(null);
  const servicesRef = useRef(null);
  const workflowRef = useRef(null);
  const valuesRef = useRef(null);

  const isHeaderInView = useInView(headerRef, { once: true });
  const isVisionInView = useInView(visionRef, { once: true });
  const isMissionInView = useInView(missionRef, { once: true });
  const isServicesInView = useInView(servicesRef, { once: true });
  const isWorkflowInView = useInView(workflowRef, { once: true });
  const isValuesInView = useInView(valuesRef, { once: true });

  return (
    <>
      <div className="bg-gradient-to-b from-white via-blue-200/50 to-white">
        <div className="flex flex-col items-center justify-start mt-20 md:mt-32 max-w-7xl mx-auto gap-6 md:gap-10 px-4 md:px-6 max-md:mt-16">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center gap-3 md:gap-5 py-3 md:py-5 text-center"
          >
            <span className="text-3xl md:text-5xl font-bold">
              About{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text font-bold">
                WaiGenie
              </span>
            </span>
            <span className="text-lg md:text-2xl px-4">
              Revolutionizing Quality Assurance with AI-powered solutions
            </span>
          </motion.div>

          <motion.div
            ref={visionRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isVisionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col-reverse md:flex-row justify-center items-center gap-8 md:gap-44 my-10 md:my-20"
          >
            <div className="flex flex-col items-start justify-start w-full md:w-[450px] gap-6 md:gap-10 px-4 md:px-0">
              <span className="text-3xl md:text-4xl font-bold text-[#0717A1] max-md:text-center">
                Our Vision
              </span>
              <div className="flex flex-col-reverse gap-4 md:gap-5">
                <p className="text-justify text-base md:text-xl">
                  At Waigenie, we envision a future where QA processes are
                  seamlessly integrated with cutting-edge AI technology,
                  empowering teams to deliver flawless software at unprecedented
                  speeds.
                </p>
                <p className="text-justify text-base md:text-xl">
                  We're building a platform that will revolutionize how
                  enterprises approach quality assurance, making it more
                  efficient, accurate, and adaptable to the ever-changing
                  landscape of software development.
                </p>
              </div>
            </div>
            <div className="w-full md:w-auto px-4 md:px-0">
              <Image
                src="/our_vision.png"
                width={400}
                height={300}
                alt="Our_vision"
                className="w-full md:w-[400px] h-auto"
              />
            </div>
          </motion.div>

          <motion.div
            ref={missionRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isMissionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-start gap-6 md:gap-10 my-10 md:my-20 px-4 md:px-0"
          >
            <span className="text-3xl md:text-4xl font-bold text-[#0717A1]">
              Our Mission
            </span>
            <div className="bg-[#71B5E6] text-white px-6 md:px-10 py-4 md:py-5 max-w-5xl rounded-xl">
              <p className="p-4 md:p-10 text-center text-base md:text-xl">
                Empower QA teams with cutting-edge AI solutions tailored for
                enterprise needs, enabling them to deliver high-quality software
                faster and more efficiently than ever before.
              </p>
            </div>
          </motion.div>

          <motion.div
            ref={servicesRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="w-full max-w-6xl my-10 md:my-20 px-4 md:px-6"
          >
            <div className="mx-auto flex flex-col items-center justify-center gap-6 md:gap-10">
              <span className="text-3xl md:text-5xl text-center text-zinc-900 mb-8 md:mb-12 font-bold">
                What{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                  WaiGenie
                </span>{" "}
                can do?
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white flex flex-col items-center rounded-lg p-4 md:p-6 text-gray-900 shadow-lg"
                  >
                    <div className="flex items-center justify-center mb-3 md:mb-4">
                      {service.icon}
                    </div>
                    <span className="text-sm md:text-base font-semibold text-blue-600 text-center mb-2">
                      {service.title}
                    </span>
                    <span className="text-gray-600 text-center text-sm md:text-base">
                      {service.description}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={workflowRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isWorkflowInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center gap-6 md:gap-10 my-10 md:my-20 px-4 md:px-0"
          >
            <span className="text-3xl md:text-4xl font-bold text-[#5350FF]">
              How it works?
            </span>
            <div className="flex flex-col lg:flex-row items-center gap-4 md:gap-5 lg:gap-10">
              {[1, 2, 3, 4].map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isWorkflowInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="w-full md:w-[200px] lg:w-[300px] min-h-[180px] md:min-h-[200px] lg:min-h-[300px] flex flex-col justify-center items-center gap-2 lg:gap-8 p-2"
                >
                  <div className="bg-[radial-gradient(50%_50%_at_50%_50%,_var(--tw-gradient-stops))] from-blue-400/70 to-blue-100/0.1 w-[120px] md:w-[150px] h-[120px] md:h-[150px] flex justify-center items-center">
                    <Image
                      src={`/step_${step === 1 ? "sign_up" : step}.png`}
                      alt={`step-${step}`}
                      width={step === 3 ? 100 : 80}
                      height={80}
                      className="md:w-[100px] md:h-[100px]"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2 lg:gap-7">
                    <div className="flex justify-between items-center gap-2 h-8 md:h-10">
                      <span className="bg-[#5350FF] text-white rounded-full size-6 md:size-8 flex justify-center items-center p-1 md:p-2">
                        {step}
                      </span>
                      <span className="text-[#5350FF] font-bold text-base md:text-lg">
                        {step === 1
                          ? "Sign Up"
                          : step === 2
                          ? "Connect"
                          : step === 3
                          ? "Analyze"
                          : "Optimize"}
                      </span>
                    </div>
                    <div className="text-center text-sm md:text-base">
                      {step === 1
                        ? "Create your Waigenie account and set up your organization profile."
                        : step === 2
                        ? "Integrate Waigenie with your existing QA tools and workflows."
                        : step === 3
                        ? "Let our AI analyze your application and generate comprehensive test scenarios."
                        : "Continuously improve your QA process with AI-driven insights and recommendations."}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            ref={valuesRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center gap-8 md:gap-14 flex-col py-10 md:py-20 px-4 md:px-0"
          >
            <span className="text-3xl md:text-4xl font-bold text-[#5350FF]">
              Our Values
            </span>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-6 md:gap-10">
              {["Innovation", "Customer Success", "Collaboration"].map(
                (value, index) => (
                  <motion.div
                    key={value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="flex flex-col gap-2 w-full md:max-w-[300px] rounded-md shadow-xl p-4 md:p-5"
                  >
                    <span className="text-[#5350FF] font-semibold text-lg md:text-xl">
                      {value}
                    </span>
                    <span className="text-sm md:text-base">
                      {value === "Innovation"
                        ? "We're constantly pushing the boundaries of what's possible in AI-powered QA."
                        : value === "Customer Success"
                        ? "Your success is our success. We're committed to helping you achieve your QA goals."
                        : "We believe in the power of teamwork, both within our company and with our clients."}
                    </span>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
