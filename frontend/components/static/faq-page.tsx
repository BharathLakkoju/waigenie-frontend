'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search, Tag } from 'lucide-react'

const faqs = [
  {
    question: "How does WAIGENIE generate test scenarios?",
    answer: "WAIGENIE uses advanced language models and computer vision to analyze web pages, identify elements, and generate relevant test scenarios. It can create both positive and negative test cases, as well as consider edge cases and usability tests.",
    category: "Functionality"
  },
  {
    question: "Can WAIGENIE work with different programming languages for test script generation?",
    answer: "Yes, WAIGENIE can generate test scripts in multiple languages, including Python and Java. It adapts the output based on the user's preference.",
    category: "Compatibility"
  },
  {
    question: "Can WAIGENIE integrate with existing test frameworks?",
    answer: "Yes, WAIGENIE generates test scripts that can be integrated into popular test frameworks like pytest for Python and TestNG for Java.",
    category: "Integration"
  },
  {
    question: "Can WAIGENIE capture screenshots during test execution?",
    answer: "Yes, WAIGENIE can capture screenshots at various stages of test execution, which can be useful for debugging and documentation purposes.",
    category: "Features"
  },
  {
    question: "Can WAIGENIE generate human-readable test cases?",
    answer: "Yes, WAIGENIE can generate test cases in Gherkin syntax, which is easy for both technical and non-technical stakeholders to understand.",
    category: "Usability"
  },
  {
    question: "How does WAIGENIE ensure test maintainability?",
    answer: "WAIGENIE generates well-structured, modular test code with clear separation of concerns, making tests easier to maintain and update.",
    category: "Maintenance"
  },
  {
    question: "Can WAIGENIE work with single-page applications (SPAs)?",
    answer: "Yes, WAIGENIE is designed to work with modern web applications, including SPAs, by properly handling dynamic content and asynchronous operations.",
    category: "Compatibility"
  },
  {
    question: "Can WAIGENIE generate API tests as well as UI tests?",
    answer: "While the current implementation focuses on UI testing, the AI-powered approach could potentially be extended to generate API tests as well.",
    category: "Features"
  },
  {
    question: "What makes WAIGENIE's Web Action Agent different from traditional test automation tools?",
    answer: "WAIGENIE's Web Action Agent combines AI-powered decision making with traditional automation tools. It can autonomously navigate websites, understand context, and make intelligent decisions about test flows, unlike traditional tools that require explicit programming for each action.",
    category: "Technology"
  },
  {
    question: "What types of web interactions can the Web Action Agent perform?",
    answer: "The agent can handle: Form filling and submissions, Button clicks and link navigation, Dropdown selections, Modal dialog interactions, File uploads, Multi-step workflows, Element verification and validation, Screenshot capture, Complex mouse actions (hover, drag-and-drop).",
    category: "Features"
  },
  {
    question: "What are the specific Gemini models being used in WAIGENIE?",
    answer: "WAIGENIE utilizes: Gemini-1.5-flash-latest for core LLM functionality, Gemini-1.5-pro-latest for multimodal capabilities, Text-embedding-004 for embedding generation.",
    category: "Technology"
  },
  {
    question: "Can WAIGENIE handle complex test scenarios?",
    answer: "Yes, through: Multi-step action planning, Context-aware decision making, Dynamic validation strategies, Adaptive test flow management.",
    category: "Functionality"
  },
  {
    question: "How does WAIGENIE ensure the security of sensitive data during testing?",
    answer: "Waigenie ensures data security by processing everything in real time without storing any data. This way, sensitive information is handled securely and discarded immediately after testing.",
    category: "Security"
  },
  {
    question: "Is WAIGENIE compliant with industry standards?",
    answer: "Yes, WAIGENIE is designed to comply with industry standards such as ISO 27001 and OWASP guidelines for secure software development, ensuring that our testing practices meet the highest security benchmarks.",
    category: "Compliance"
  },
  {
    question: "What kind of customer support does WAIGENIE offer?",
    answer: "WAIGENIE provides comprehensive customer support, including: Email and chat support during business hours, Access to a knowledge base with FAQs, tutorials, and user guides, Community forums for peer-to-peer assistance.",
    category: "Support"
  },
  {
    question: "Is there a free trial available for WAIGENIE?",
    answer: "Yes, WAIGENIE offers a free trial period for new users to explore the features and capabilities of the platform before committing to a subscription.",
    category: "Pricing"
  },
  {
    question: "How user-friendly is WAIGENIE for non-technical users?",
    answer: "WAIGENIE is designed with a user-friendly interface that allows non-technical users to create and manage tests easily. The natural language processing capabilities enable users to input requirements in plain language, making it accessible to all team members.",
    category: "Usability"
  },
  {
    question: "What browsers and platforms does WAIGENIE support?",
    answer: "WAIGENIE supports major web browsers such as Chrome, Firefox, and Safari, as well as mobile platforms. Future updates will expand compatibility with additional browsers and platforms.",
    category: "Compatibility"
  },
  {
    question: "How can users provide feedback or suggest new features?",
    answer: "Users can submit feedback directly through the application or via our website. We value user input and consider it when planning future updates and enhancements.",
    category: "Support"
  }
]

const categories = Array.from(new Set(faqs.map(faq => faq.category)))

const FAQItem = ({ faq, isOpen, toggleOpen }: { faq: typeof faqs[0], isOpen: boolean, toggleOpen: () => void }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex justify-between items-center w-full py-4 px-4 text-left focus:outline-none"
        onClick={toggleOpen}
      >
        <span className="text-lg font-medium text-gray-900">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-indigo-600" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 pb-4 text-gray-600">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function EnhancedFAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const filteredFaqs = faqs.filter(faq => 
    (selectedCategory ? faq.category === selectedCategory : true) &&
    (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-2 text-gray-900">Frequently Asked Questions</h2>
        <p className="text-xl text-center mb-12 text-gray-600">Find answers to common questions about WAIGENIE</p>
        
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 px-12 rounded-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative">
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="appearance-none w-full md:w-48 py-3 px-4 rounded-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <Tag className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <motion.div
          className="bg-white rounded-lg shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filteredFaqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFAQ(index)}
            />
          ))}
        </motion.div>

        {filteredFaqs.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 mt-8"
          >
            No matching FAQs found. Please try a different search term or category.
          </motion.p>
        )}
      </div>
    </section>
  )
}