"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { MapPin, Search, FileCode, Code, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: "ideaforge",
    name: "IdeaForge",
    description:
      "Generate comprehensive test scenarios using advanced AI algorithms, ensuring thorough coverage of your application's functionality",
    icon: <MapPin className="w-6 h-6 text-blue-600" />,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "domdetective",
    name: "DOMDetective",
    description:
      "Automatically identify and analyze web elements with precision, streamlining the process of creating and maintaining elements in your tests.",
    icon: <Search className="w-6 h-6 text-blue-600" />,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "cucumbercraft",
    name: "CucumberCraft",
    description:
      "Transform user stories into clear, concise Gherkin feature files, bridging the gap between business requirements and test scenarios.",
    icon: <FileCode className="w-6 h-6 text-blue-600" />,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "autoscribe",
    name: "AutoScribe",
    description:
      "Generate test automation scripts in multiple languages automatically, reducing the time and effort required to create and maintain test code.",
    icon: <Code className="w-6 h-6 text-blue-600" />,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "webtrekker",
    name: "WebTrekker",
    description:
      "Leverage AI to automatically explore and test complex user journeys, uncovering edge cases and potential issues that manual testing might miss.",
    icon: <Globe className="w-6 h-6 text-blue-600" />,
    image: "/placeholder.svg?height=400&width=600",
  },
];

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, mass: 1 };
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [100, -100]),
    springConfig
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
    springConfig
  );

  return (
    <motion.div
      ref={cardRef}
      className="sticky top-32 mb-32 last:mb-0"
      style={{
        zIndex: products.length + index,
      }}
    >
      <motion.div
        className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-[2rem] overflow-hidden shadow-xl mx-4 lg:mx-auto max-w-6xl"
        style={{
          y,
          scale,
          opacity,
        }}
      >
        <div className="flex flex-col lg:flex-row items-center p-8 lg:p-12 gap-8">
          <div className="flex-1 lg:pr-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/80 backdrop-blur p-3 rounded-xl shadow-sm">
                {product.icon}
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {product.name}
              </h3>
            </div>
            <p className="text-gray-600 text-lg mb-8">{product.description}</p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                See Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-200 hover:bg-blue-50"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <motion.div
              className="relative rounded-xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen dark:bg-gradient-to-b dark:from-blue-900 dark:to-black">
      <main className="pt-44 pb-16">
        <div className="text-center mb-20">
          <motion.h1
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Products
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover our suite of AI-powered testing tools designed to
            revolutionize your QA process
          </motion.p>
        </div>

        <div className="relative mb-20">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
}
