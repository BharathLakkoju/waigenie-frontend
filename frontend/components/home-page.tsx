"use client";
import {
  Puzzle,
  Settings,
  Users,
  ChevronRight,
  Globe,
  FileText,
  Search,
  Brain,
  Info,
  Code,
  BriefcaseBusinessIcon,
  Building2,
  BarChart,
  ShieldCheck,
  Handshake,
  Lightbulb,
  SearchCode,
  FileCode2,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  MotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import React from "react";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Lenis from "lenis";
import { useRouter } from "next/navigation";

const products = [
  {
    title: "IdeaForge",
    icon: Lightbulb,
    description:
      "Generate comprehensive test scenarios using advanced AI algorithms.",
    color: "from-indigo-400 to-purple-500",
    link: "/products/IdeaForge",
  },
  {
    title: "DOMDetective",
    icon: Info,
    description:
      "Automatically identify and analyze web elements with precision.",
    color: "from-blue-400 to-indigo-500",
    link: "/products/DomDetective",
  },
  {
    title: "CucumberCraft",
    icon: FileText,
    description:
      "Transform user stories into clear, concise Gherkin feature files.",
    color: "from-emerald-400 to-teal-500",
    link: "/products/CucumberCraft",
  },
  {
    title: "AutoScribe",
    icon: Code,
    description:
      "Generate test automation scripts in multiple languages automatically.",
    color: "from-cyan-400 to-blue-500",
    link: "/products/AutoScribe",
  },
  {
    title: "WebTrekker",
    icon: SearchCode,
    description: "Explore and test complex user journeys with AI assistance.",
    color: "from-violet-400 to-purple-500",
    link: "/products/WebTrekker",
  },
];

const productsForCards = [
  {
    title: "IdeaForge",
    src: "",
    description:
      "Generate comprehensive test scenarios using advanced AI algorithms.",
    color: "from-indigo-400 to-purple-500",
    url: "/products/IdeaForge",
  },
  {
    title: "DOMDetective",
    src: "",
    description:
      "Automatically identify and analyze web elements with precision.",
    color: "from-blue-400 to-indigo-500",
    url: "/products/DomDetective",
  },
  {
    title: "CucumberCraft",
    src: "",
    description:
      "Transform user stories into clear, concise Gherkin feature files.",
    color: "from-emerald-400 to-teal-500",
    url: "/products/CucumberCraft",
  },
  {
    title: "AutoScribe",
    src: "",
    description:
      "Generate test automation scripts in multiple languages automatically.",
    color: "from-cyan-400 to-blue-500",
    url: "/products/AutoScribe",
  },
  {
    title: "WebTrekker",
    src: "",
    description: "Explore and test complex user journeys with AI assistance.",
    color: "from-violet-400 to-purple-500",
    url: "/products/WebTrekker",
  },
];

const phrases = [
  "Test your Web Ideas",
  "Inspect your Web Elements",
  "Generate Gherkin Scenarios",
  "Generate Automation Scripts",
  "Explore AI Web Agents",
];

const titlesAndContext = [
  {
    title: "Generate Test Ideas Instantly",
    context:
      "Are you tired of manually coming up with test ideas for your web applications? Our Test Idea Generation feature uses AI to automatically generate test ideas based on user stories and selected web page elements.Simply enter a URL and select the elements you want to test, and our tool will generate a list of test ideas for you.Save time and increase your test coverage with Test Idea Generation.",
    videoSrc: "",
  },
  {
    title: "Identify and Extract Element Information",
    context:
      "Easily identify and extract information about web page elements for testing. Enter a URL and our tool will generate a CSV file containing information about all elements with IDs.Use this feature to quickly gather information about the elements on a page, making it easier to create and execute tests.",
    videoSrc: "",
  },
  {
    title: "Convert User Stories into Gherkin Feature Files",
    context:
      "Transform user stories into BDD Gherkin feature files with just a few clicks. Simply enter a user story and our tool will generate a Gherkin feature file for you. Use this feature to streamline your test case creation process and ensure consistency in your tests.",
    videoSrc: "",
  },
  {
    title: "Generate Automated Test Code with Gherkin Steps",
    context:
      "Save time and effort by generating automated test code based on Gherkin steps. Enter a URL, Gherkin feature steps, and select a language to generate automated test code. Our tool supports both Python and Java, making it easy to integrate with your existing testing framework.",
    videoSrc: "",
  },
  {
    title: "Make use of Waigenie's AI-Powered Web Agent",
    context:
      "Use our AI-powered web agent to demonstrate the capabilities of Waigenie. Enter an objective and URL to start the web agent demo and see how it interacts with the web page. Use this feature to showcase the power of Waigenie to potential clients and stakeholders.",
    videoSrc: "",
  },
];

export default function HomePage() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BackgroundBeamsWithCollision className="min-h-screen relative w-full">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="min-h-screen flex items-center justify-center dark:text-zinc-100 text-zinc-900"
        >
          <TextAnimation />
          <motion.div
            className="rounded-full absolute bottom-10 border border-zinc-600 p-2 dark:text-zinc-400"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown />
          </motion.div>
        </motion.div>
      </BackgroundBeamsWithCollision>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-b from-blue-300 to-white dark:bg-gradient-to-b dark:from-blue-900 dark:to-black md:min-h-screen"
      >
        <FeatureCarousel />
      </motion.div>
      {/* <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-b from-blue-300 to-white dark:bg-gradient-to-b dark:from-blue-900 dark:to-black min-h-screen"
      >
        <main ref={container} className="relative">
          {productsForCards.map((product, i) => {
            // Calculate target scale based on project index
            const targetScale = 1 - (productsForCards.length - i) * 0.05;

            return (
              <CardComponent
                key={`p_${i}`}
                i={i}
                {...product}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </main>
      </motion.div> */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white dark:bg-gradient-to-b dark:from-black dark:to-black"
      >
        <ListComponent />
        <EnhancedB2BSection />
      </motion.div>
    </motion.div>
  );
}

export function TextAnimation() {
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-md:text-3xl lg:text-8xl font-bold flex flex-col items-center justify-center gap-2 h-15">
      <span className="mb-2">The best way to </span>
      <div className="inline-block h-32 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentPhrase}
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            exit={{ y: -140 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="inline-block bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text h-32 p-0"
          >
            {phrases[currentPhrase]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function FeatureCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isControlled, setIsControlled] = useState(false);

  useEffect(() => {
    if (isControlled) {
      const interval = setInterval(() => {
        setIsControlled(false);
      }, 7000);
      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % titlesAndContext.length
        );
        setDirection(1);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isControlled]);

  const nextSlide = () => {
    setIsControlled(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % titlesAndContext.length);
    setDirection(1);
  };

  const prevSlide = () => {
    setIsControlled(true);
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + titlesAndContext.length) % titlesAndContext.length
    );
    setDirection(-1);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between p-8 bg-transparent md:min-h-screen max-w-7xl mx-auto">
      <div className="md:w-1/2 p-4 min-h-[320px] flex flex-col justify-between items-start">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: 20 * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 * direction }}
            transition={{ duration: 0.2 }}
            className="flex flex-col justify-start items-start"
          >
            <span className="text-3xl text-black dark:text-white font-bold mb-4 max-w-xl">
              {titlesAndContext[currentIndex].title}
            </span>
            <span className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
              {titlesAndContext[currentIndex].context}
            </span>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-start items-center gap-2">
          <button
            onClick={prevSlide}
            className="bg-transparent p-2 rounded-full hover:text-zinc-400 transition-colors border dark:border-zinc-200 border-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Previous slide"
          >
            <ArrowLeft className="w-6 h-6 dark:text-zinc-100 group-hover:text-zinc-600 group-hover:dark:text-zinc-400 text-zinc-900" />
          </button>
          <button
            onClick={nextSlide}
            className="bg-transparent p-2 rounded-full hover:text-zinc-400 transition-colors border dark:border-zinc-200 border-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 group"
            aria-label="Next slide"
          >
            <ArrowRight className="w-6 h-6 dark:text-zinc-100 group-hover:text-zinc-600 group-hover:dark:text-zinc-400 text-zinc-900" />
          </button>
        </div>
      </div>
      <div className="md:w-1/2 p-4 relative md:h-[400px] w-[calc(100%-32px)] h-[250px] overflow-hidden rounded-2xl">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            className="absolute w-full h-full rounded-2xl"
            initial={{ x: 300 * direction, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300 * direction, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.5,
            }}
          >
            <div className="bg-gradient-to-br from-purple-500 via-orange-500 to-indigo-500 p-2 rounded-2xl shadow-lg w-[calc(100%-32px)] h-[calc(100%-32px)] flex items-center justify-center">
              {false ? (
                <img
                  src={titlesAndContext[currentIndex].videoSrc}
                  alt={`Video preview for ${titlesAndContext[currentIndex].title}`}
                  className="w-full h-full object-cover rounded-xl bg-blue-900"
                />
              ) : (
                <div className="w-full h-full rounded-xl bg-gray-300 relative flex justify-center items-center">
                  <span className="text-zinc-900">
                    Sample video here {currentIndex}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function ListComponent() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const router = useRouter();
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Genie
              </span>{" "}
              to do your testing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our suite of AI-powered testing tools to automate and
              enhance your testing workflow
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-24">
            {products.map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className="h-full overflow-hidden group cursor-pointer w-[300px]"
                  onMouseEnter={() => setHoveredProduct(product.title)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <CardContent className="p-6 relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                    />
                    <motion.div
                      className="relative z-10"
                      initial={false}
                      animate={{
                        y: hoveredProduct === product.title ? -20 : 0,
                        opacity: hoveredProduct === product.title ? 0 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <product.icon
                        className={`w-16 h-16 mb-4 bg-gradient-to-br ${product.color} rounded-full p-3 text-white`}
                      />
                      <h2 className="text-2xl font-bold mb-2">
                        {product.title}
                      </h2>
                      <p className="text-gray-600">{product.description}</p>
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={false}
                      animate={{
                        y: hoveredProduct === product.title ? 0 : 20,
                        opacity: hoveredProduct === product.title ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      onClick={() => {
                        router.push(product.link);
                      }}
                    >
                      <a
                        href={product.link}
                        className={`bg-gradient-to-r ${product.color} text-white hover:bg-gradient-to-r hover:${product.color} transition-colors duration-300 flex items-center px-3 py-2 rounded-full`}
                      >
                        <span className="flex items-center justify-center">
                          Learn More <ArrowUpRight className="ml-1 w-4 h-4" />
                        </span>
                      </a>
                    </motion.div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 p-4">
                    <Button
                      variant="outline"
                      className="w-full rounded-full"
                      asChild
                    >
                      <Link href={`signup`}>Try Demo</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// interface CardProps {
//   i: number;
//   title: string;
//   description: string;
//   src: string;
//   url: string;
//   color: string;
//   progress: MotionValue<number>;
//   range: number[];
//   targetScale: number;
// }

// const CardComponent: React.FC<CardProps> = ({
//   i,
//   title,
//   description,
//   src,
//   url,
//   color,
//   progress,
//   range,
//   targetScale,
// }) => {
//   const container = useRef<HTMLDivElement>(null);

//   const { scrollYProgress } = useScroll({
//     target: container,
//     offset: ["start end", "start start"],
//   });

//   const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
//   const scale = useTransform(progress, range, [1, targetScale]);

//   return (
//     <div
//       ref={container}
//       className="h-screen flex items-center justify-center sticky top-0"
//     >
//       <motion.div
//         style={{
//           scale,
//           top: `calc(-5vh + ${i * 25}px)`,
//         }}
//         className={`flex flex-col relative top-[-25%] h-[500px] w-[1000px] rounded-[25px] p-[50px] origin-top bg-gradient-to-br ${color}`}
//       >
//         <h2 className="text-center m-0 text-[28px]">{title}</h2>
//         <div className="flex h-full mt-[50px] gap-[50px]">
//           <div className="w-[40%] relative top-[10%]">
//             <p className="text-base first-letter:text-[28px] first-letter:font-['Title']">
//               {description}
//             </p>
//             <span className="flex items-center gap-[5px]">
//               <a
//                 href={url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-xs underline cursor-pointer"
//               >
//                 See more
//               </a>
//               <svg
//                 width="22"
//                 height="12"
//                 viewBox="0 0 22 12"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
//                   fill="black"
//                 />
//               </svg>
//             </span>
//           </div>
//           <div className="relative w-[60%] h-full rounded-[25px] overflow-hidden">
//             <motion.div className="w-full h-full" style={{ scale: imageScale }}>
//               <Image
//                 fill
//                 src={`/images/${src}`}
//                 alt="image"
//                 className="object-cover"
//               />
//             </motion.div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

export function B2BAnimation() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setKey((prevKey) => prevKey + 1);
    }, 5000); // Reset animation every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const centralCircleVariants = {
    initial: { scale: 1.5, opacity: 1 },
    shrink: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1, delay: 1 },
    },
  };

  const centralLogoVariants = {
    initial: { scale: 1.5, opacity: 1 },
    shrink: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1, delay: 1 },
    },
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1, delay: 2 },
    },
  };

  const outerCircleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, delay: 3 },
    },
  };

  const icons = [
    { Icon: Building2, label: "Business" },
    { Icon: Users, label: "Customers" },
    { Icon: BarChart, label: "Analytics" },
    { Icon: ShieldCheck, label: "Security" },
    { Icon: Globe, label: "Global" },
    { Icon: Building2, label: "Business" }, // Add an extra icon to match the number of circles
  ];

  return (
    <div className="w-full h-[500px] bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center rounded-md">
      <motion.svg
        key={key}
        viewBox="-250 -250 500 500"
        className="w-full h-full max-w-[500px]"
      >
        {/* Central circle */}
        <motion.circle
          cx="0"
          cy="0"
          r="60"
          className="stroke-purple-600 fill-white"
          strokeWidth="2"
          variants={centralCircleVariants}
          initial="initial"
          animate="shrink"
        />

        {/* Company logo */}
        <motion.foreignObject
          x="-20"
          y="-20"
          width="40"
          height="40"
          variants={centralLogoVariants}
          initial="initial"
          animate="shrink"
        >
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
        </motion.foreignObject>

        {/* Lines and outer circles */}
        {[0, 72, 144, 216, 288].map((angle, index) => (
          <motion.g key={angle}>
            {/* Line */}
            <motion.line
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              x1={Math.cos((angle * Math.PI) / 180) * 60}
              y1={Math.sin((angle * Math.PI) / 180) * 60}
              x2={Math.cos((angle * Math.PI) / 180) * 170}
              y2={Math.sin((angle * Math.PI) / 180) * 170}
              className="stroke-purple-400"
              strokeWidth="2"
            />

            {/* Outer circle */}
            <motion.g
              variants={outerCircleVariants}
              initial="hidden"
              animate="visible"
            >
              <circle
                cx={Math.cos((angle * Math.PI) / 180) * 180}
                cy={Math.sin((angle * Math.PI) / 180) * 180}
                r="40"
                className="stroke-purple-600 fill-white"
                strokeWidth="2"
              />
              <foreignObject
                x={Math.cos((angle * Math.PI) / 180) * 180 - 20}
                y={Math.sin((angle * Math.PI) / 180) * 180 - 20}
                width="40"
                height="40"
              >
                <div className="w-full h-full flex items-center justify-center">
                  {(index + 1) % 2 === 0 ? (
                    <Handshake className="w-6 h-6 text-zinc-800" />
                  ) : (
                    <BriefcaseBusinessIcon className="w-6 h-6 text-zinc-800" />
                  )}
                </div>
              </foreignObject>
            </motion.g>
          </motion.g>
        ))}
      </motion.svg>
    </div>
  );
}

export function ListItem() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="w-[400px] h-[300px] bg-white shadow dark:shadow-gray-100 rounded-2xl dark:bg-zinc-200 flex justify-center items-center border"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-900"
        >
          Sample Content here
        </motion.span>
      </motion.div>
    </>
  );
}

const features = [
  {
    icon: <Puzzle className="w-12 h-12 text-indigo-500" />,
    title: "Customized Framework",
    description: "Tailored solutions based on your specific requirements",
  },
  {
    icon: <Settings className="w-12 h-12 text-indigo-500" />,
    title: "Flexible Features",
    description: "Modify and adapt every feature to meet your unique needs",
  },
  {
    icon: <Users className="w-12 h-12 text-indigo-500" />,
    title: "Dedicated Support",
    description: "Expert assistance throughout implementation and beyond",
  },
];

export function EnhancedB2BSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }));
  }, [controls]);

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-br from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
              WaiGenie
            </span>{" "}
            for Business
          </span>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-5">
            Empower your enterprise with customized AI-driven QA solutions that
            adapt to your unique challenges
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
            >
              <Card
                className="h-full transition-all duration-300 hover:shadow-xl bg-white/80 backdrop-blur-sm"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <motion.div
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="mb-6"
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full -mr-48 -mt-48 opacity-50" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full -ml-48 -mb-48 opacity-50" />

          <div className="relative z-10 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h3 className="text-3xl font-bold mb-6">
                Tailored for Your Success
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                At WAIGENIE, we understand that every business has unique
                challenges. Our B2B solutions offer:
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Customized frameworks",
                  "Flexible features",
                  "Scalable solutions",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center text-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.2 }}
                  >
                    <ChevronRight className="w-6 h-6 text-indigo-500 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Link
                href={"/Consultation"}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="mr-2">Schedule a Consultation</span>
                <ArrowRight className="w-5 h-5 inline-block" />
              </Link>
            </div>
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="relative"
              >
                <B2BAnimation />
                <div className="absolute inset-0 bg-transparent rounded-lg" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
