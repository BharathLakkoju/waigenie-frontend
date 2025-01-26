"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  Lightbulb,
  X,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
} from "lucide-react";

const faqs = [
  {
    question: "Can WAIGENIE handle complex test scenarios?",
    answer:
      "Yes, through: Multi-step action planning, Context-aware decision making, Dynamic validation strategies, Adaptive test flow management.",
  },
  {
    question: "How does WAIGENIE improve the QA process?", 
    answer:
      "WAIGENIE uses AI to generate comprehensive test scenarios, automate test script creation, and provide intelligent analysis of test results, significantly reducing time and effort in the QA process.",
  },
  {
    question: "Can WAIGENIE integrate with existing testing frameworks?",
    answer: 
      "Yes, WAIGENIE is designed to integrate seamlessly with popular testing frameworks, enhancing your current QA processes rather than replacing them entirely.",
  },
  {
    question: "How does WAIGENIE generate test scenarios?",
    answer:
      "WAIGENIE uses advanced language models and computer vision to analyze web pages, identify elements, and generate relevant test scenarios. It can create both positive and negative test cases, as well as consider edge cases and usability tests.",
  },
  {
    question: "Can WAIGENIE generate human-readable test cases?",
    answer:
      "Yes, WAIGENIE can generate test cases in Gherkin syntax, which is easy for both technical and non-technical stakeholders to understand.",
  },
];

const FAQItem = ({
  faq,
  isOpen,
  toggleOpen,
  index,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  toggleOpen: () => void;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="border-b border-gray-200 last:border-none"
    >
      <button
        className="flex justify-between items-center w-full py-6 px-4 text-left focus:outline-none hover:bg-gray-50 transition-colors duration-200"
        onClick={toggleOpen}
      >
        <span className="text-lg font-medium text-gray-900 flex-grow pr-4">
          {faq.question}
        </span>
        <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? (
            <Minus className="w-6 h-6 text-indigo-600" />
          ) : (
            <Plus className="w-6 h-6 text-indigo-600" />
          )}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-6">
              <motion.p 
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-gray-600 leading-relaxed"
              >
                {faq.answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function CreativeContactPageWithEnhancedFAQ() {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  const [isFAQExpanded, setIsFAQExpanded] = useState(false);
  const [currentFAQIndex, setCurrentFAQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const faqContainerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef(null);
  const contactRef = useRef(null);
  const faqRef = useRef(null);

  const isFormInView = useInView(formRef, { once: true });
  const isContactInView = useInView(contactRef, { once: true });
  const isFaqInView = useInView(faqRef, { once: true });

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  useEffect(() => {
    if (isFAQExpanded) {
      const timer = setInterval(() => {
        setCurrentFAQIndex((prevIndex) => (prevIndex + 1) % faqs.length);
      }, 8000);
      return () => clearInterval(timer);
    }
  }, [isFAQExpanded]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-200 to-white flex flex-col mt-24">
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Connect with our QA experts
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Looking to transform your QA process? Our Waigenie experts are
              ready to help you unlock the full potential of AI-driven testing.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between items-start mb-32">
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: -50 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col md:flex-row gap-2 w-full"
            >
              <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-[500px]">
                <div className="flex justify-between mb-4 border-b pb-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-4 h-4 border border-gray-300 flex items-center justify-center">
                      <span className="text-xs">x</span>
                    </div>
                  </div>
                </div>

                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Name:
                    </label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      className="w-full border-gray-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Mail:
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your mail id"
                      className="w-full border-gray-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message:
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message"
                      className="w-full min-h-[150px] border-gray-300"
                    />
                  </div>

                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    Send
                  </Button>
                </form>
              </div>

              <div className="md:self-end">
                <Image
                  src="/writingmessage.png?height=100&width=100"
                  alt="QA Expert Illustration"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
              <motion.div
                className="md:self-end bg-yellow-400 text-indigo-800 rounded-full p-2 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Lightbulb className="w-6 h-6" />
              </motion.div>
            </motion.div>

            <motion.div
              ref={contactRef}
              initial={{ opacity: 0, x: 50 }}
              animate={isContactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full lg:w-auto mt-0 md:mt-60 space-y-8"
            >
              <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-indigo-600" />
                  <span className="text-lg">1234567890</span>
                </div>

                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-indigo-600" />
                  <span className="text-lg">waigenie@gmail.com</span>
                </div>

                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-indigo-600" />
                  <span className="text-lg">123, XXX, abc-0000</span>
                </div>

                <div className="flex items-center space-x-6 pt-4">
                  <Link
                    href="#"
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                  </Link>
                  <Link
                    href="#"
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <Twitter className="h-6 w-6" />
                  </Link>
                  <Link
                    href="#"
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <Github className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Redesigned FAQ Section */}
          <motion.div
            ref={faqRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-32"
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold text-gray-900 mb-4"
                >
                  Frequently Asked Questions
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-gray-600"
                >
                  Everything you need to know about WAIGENIE's AI-powered testing capabilities
                </motion.p>
              </div>

              <motion.div 
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    faq={faq}
                    isOpen={openFAQIndex === index}
                    toggleOpen={() => toggleFAQ(index)}
                    index={index}
                  />
                ))}
              </motion.div>

              <motion.div 
                className="text-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Link
                  href="/FAQ"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  View All FAQs
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
