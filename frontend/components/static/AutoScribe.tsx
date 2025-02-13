"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Code, Zap, Globe, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function AutoScribe() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-b from-white via-blue-300/50 to-white"
    >
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 max-md:mt-16">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-32 mb-12 sm:mb-20 min-h-[70vh] sm:min-h-[85vh]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2"
          >
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
            >
              AutoScribe
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8"
            >
              Generate test automation scripts in multiple languages
              automatically, reducing the time spent on writing and maintaining
              test code.
            </motion.p>
            <div className="flex flex-wrap gap-4">
              <Link href="/signup">  
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-start"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full text-sm sm:text-base"
                  >
                    Try Demo
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full md:w-1/2"
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-blue-200 rounded-lg transform rotate-3 w-full max-w-[500px] aspect-[500/525] mx-auto"></div>
              <Image
                src="/AutoScribeimage.png?"
                alt="AutoScribe illustration"
                width={500}
                height={525}
                className="relative z-10 rounded-lg shadow-xl w-full max-w-[500px] mx-auto"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.section className="flex flex-col justify-center items-center gap-6 sm:gap-10">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 h-auto sm:h-20 text-center px-4"
          >
            Understand how the AutoScribe works
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center items-center mb-16 sm:mb-32 w-full px-4"
          >
            <div className="w-full max-w-[1024px] aspect-video">
              <iframe
                src="https://www.youtube.com/embed/RB47l-9fm7k?autoplay=0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg shadow-xl w-full h-full"
              ></iframe>
            </div>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-20 min-h-[60vh] sm:min-h-96"
        >
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center"
          >
            Key Features
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Code className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />,
                title: "Multi-Language Support",
                description:
                  "Generate test scripts in popular languages like Python, Java, and JavaScript.",
              },
              {
                icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />,
                title: "Intelligent Code Generation",
                description:
                  "Create efficient and maintainable test code using best practices and patterns.",
              },
              {
                icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />,
                title: "Framework Integration",
                description:
                  "Seamlessly integrate with popular test automation frameworks and tools.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="group hover:shadow-lg transition-shadow duration-300 h-[180px] sm:h-[200px]">
                  <CardContent className="p-4 sm:p-6">
                    <motion.div
                      className="mb-3 sm:mb-4"
                      whileHover={{ scale: 1.03 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-20 flex flex-col items-center"
        >
          <span className="text-3xl sm:text-4xl text-center font-bold mb-8 sm:mb-12">Benefits</span>
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 max-w-4xl mx-auto w-full">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8"
            >
              Why Choose AutoScribe?
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                "Reduce test script creation time by up to 70%",
                "Ensure consistency across test suites",
                "Easily maintain and update test code",
                "Support for multiple programming languages",
                "Integration with CI/CD pipelines",
                "Continuous updates with latest best practices",
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center px-4"
        >
          <motion.h2
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
          >
            Ready to Automate Your Test Script Creation?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto"
          >
            Start using AutoScribe today to streamline your test automation
            process.
          </motion.p>
          <Link href="/signup">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full text-sm sm:text-base"
              >
                Get your Automation Script Now <ArrowRight className="ml-1 size-4 sm:size-6" />
              </Button>
            </motion.div>
          </Link>
        </motion.section>
      </main>
    </motion.div>
  );
}
