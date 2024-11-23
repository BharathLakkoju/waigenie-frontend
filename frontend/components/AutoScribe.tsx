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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-32 mb-20 min-h-[85vh]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2"
          >
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
            >
              AutoScribe
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-gray-600 mb-8"
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
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full"
              >
                Try Demo
              </Button>
            </motion.div>
            </Link>
            {/* <Link href="/">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="flex justify-start"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-200 to-indigo-300 hover:from-blue-300 hover:to-indigo-400 text-black"
              >
                Learn more
              </Button>
            </motion.div>
            </Link> */}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:w-1/2"
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-blue-200 rounded-lg transform rotate-3 w-[500px] h-[525px]"></div>
              <Image
                src="/AutoScribeimage.png?"
                alt="AutoScribe illustration"
                width={500}
                height={525}
                className="relative z-10 rounded-lg shadow-xl"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 min-h-96"
        >
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Key Features
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="w-8 h-8 text-indigo-600" />,
                title: "Multi-Language Support",
                description:
                  "Generate test scripts in popular languages like Python, Java, and JavaScript.",
              },
              {
                icon: <Zap className="w-8 h-8 text-indigo-600" />,
                title: "Intelligent Code Generation",
                description:
                  "Create efficient and maintainable test code using best practices and patterns.",
              },
              {
                icon: <Globe className="w-8 h-8 text-indigo-600" />,
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
                <Card className="group hover:shadow-lg transition-shadow duration-300 h-[200px]">
                  <CardContent className="p-6">
                    <motion.div
                      className="mb-4"
                      whileHover={{ scale: 1.03 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
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
          className="mb-20 flex flex-col items-center"
        >
          <span className="text-4xl text-center font-bold mb-12">Benefits</span>
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-8"
            >
              Why Choose AutoScribe?
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
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
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span>{benefit}</span>
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
          className="text-center"
        >
          <motion.h2
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Ready to Automate Your Test Script Creation?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Start using AutoScribe today to streamline your test automation
            process.
          </motion.p>
          <Link href="/signup">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size={"lg"}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full "
            >
              Get your Automation Script Now <ArrowRight className="ml-1 size-6" />
            </Button>
          </motion.div>
          </Link>
        </motion.section>
      </main>
    </motion.div>
  );
}
