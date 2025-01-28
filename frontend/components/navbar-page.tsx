"use client";
import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`dark:bg-neutral-950/75 bg-white/75 p-4 fixed w-full z-50 top-0 left-0`}
    >
      <div className="mx-auto flex justify-between items-center dark:text-zinc-100 text-zinc-900 container">
        <Link href="/" className="flex gap-2 items-center justify-center">
          <Image src="/logo.png" alt="Waigenie Logo" width={42} height={42} />
          <Image
            src="/logotext.svg"
            alt={"logo-text"}
            width={130}
            height={10}
          />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="flex items-center">
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className="text-zinc-900 dark:text-white px-4 py-2">
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/services" legacyBehavior passHref>
                <NavigationMenuLink className="text-zinc-900 dark:text-white px-4 py-2">
                  Services
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem className="relative">
              <NavigationMenuTrigger className="group flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 font-normal leading-none text-zinc-900 dark:text-white outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-violet7">
                Products
                <CaretDownIcon
                  className="relative top-px text-violet10 transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                  aria-hidden
                />
              </NavigationMenuTrigger>
              <NavigationMenuContent className="absolute left-1/2 -translate-x-1/2 rounded-md bg-white shadow-[0_10px_38px_-10px_rgba(22,23,24,0.35),0_10px_20px_-15px_rgba(22,23,24,0.2)]">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 gap-2 p-2 w-[300px] rounded-full"
                >
                  <NavigationMenuLink
                    href="/products/IdeaForge"
                    className="block px-4 py-2 text-sm text-zinc-900 dark:text-white hover:bg-blue-100 dark:hover:bg-neutral-800 rounded-md"
                  >
                    Idea Forge
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href="/products/DomDetective"
                    className="block px-4 py-2 text-sm text-zinc-900 dark:text-white hover:bg-blue-100 dark:hover:bg-neutral-800 rounded-md"
                  >
                    Dom Detective
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href="/products/CucumberCraft"
                    className="block px-4 py-2 text-sm text-zinc-900 dark:text-white hover:bg-blue-100 dark:hover:bg-neutral-800 rounded-md"
                  >
                    Cucumber Craft
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href="/products/AutoScribe"
                    className="block px-4 py-2 text-sm text-zinc-900 dark:text-white hover:bg-blue-100 dark:hover:bg-neutral-800 rounded-md"
                  >
                    AutoScribe
                  </NavigationMenuLink>
                </motion.div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/pricing" legacyBehavior passHref>
                <NavigationMenuLink className="text-zinc-900 dark:text-white px-4 py-2">
                  Pricing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className="text-zinc-900 dark:text-white px-4 py-2">
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="hidden lg:flex items-center justify-center gap-2"
        >
          <Link
            href="/signup"
            className="group flex items-center gap-1 dark:bg-zinc-100 bg-zinc-900 text-zinc-100 dark:text-zinc-900 rounded-full px-4 py-2 transition duration-300"
          >
            <span>Get started</span>
            <ArrowUpRight className="size-5 group-hover:rotate-45 transition-all duration-100" />
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-zinc-900 dark:text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden fixed inset-x-0 top-[76px] bg-white dark:bg-neutral-950 p-4 shadow-lg"
            >
              <div className="flex flex-col space-y-4">
                <Link
                  href="/about"
                  className="text-zinc-900 dark:text-white px-4 py-2 hover:bg-zinc-100 dark:hover:bg-neutral-800 rounded-md"
                  onClick={toggleMenu}
                >
                  About
                </Link>
                <Link
                  href="/services"
                  className="text-zinc-900 dark:text-white px-4 py-2 hover:bg-zinc-100 dark:hover:bg-neutral-800 rounded-md"
                  onClick={toggleMenu}
                >
                  Services
                </Link>
                <div className="relative">
                  <details className="group">
                    <summary className="text-zinc-900 dark:text-white px-4 py-2 hover:bg-zinc-100 dark:hover:bg-neutral-800 rounded-md list-none flex justify-between items-center cursor-pointer">
                      Products
                      <CaretDownIcon className="transition-transform duration-200 group-open:rotate-180" />
                    </summary>
                    <div className="pl-6 mt-2 space-y-2">
                      <Link
                        href="/products/IdeaForge"
                        className="block text-zinc-900 dark:text-white px-4 py-2 hover:bg-zinc-100 dark:hover:bg-neutral-800 rounded-md"
                        onClick={toggleMenu}
                      >
                        Idea Forge
                      </Link>
                      <Link
                        href="/products/DomDetective"
                        className="block text-zinc-900 dark:text-white px-4 py-2 hover:bg-zinc-100 dark:hover:bg-neutral-800 rounded-md"
                        onClick={toggleMenu}
                      >
                        Dom Detective
                      </Link>
                      <Link
                        href="/products/CucumberCraft"
                        className="block text-zinc-900 dark:text-white px-4 py-2 hover:bg-zinc-100 dark:hover:bg-neutral-800 rounded-md"
                        onClick={toggleMenu}
                      >
                        Cucumber Craft
                      </Link>
                      <Link
                        href="/products/AutoScribe"
                        className="block text-zinc-900 dark:text-white px-4 py-2 hover:bg-zinc-100 dark:hover:bg-neutral-800 rounded-md"
                        onClick={toggleMenu}
                      >
                        AutoScribe
                      </Link>
                    </div>
                  </details>
                </div>
                <Link
                  href="/pricing"
                  className="text-zinc-900 dark:text-white px-4 py-2 hover:bg-zinc-100 dark:hover:bg-neutral-800 rounded-md"
                  onClick={toggleMenu}
                >
                  Pricing
                </Link>
                <Link
                  href="/contact"
                  className="text-zinc-900 dark:text-white px-4 py-2 hover:bg-zinc-100 dark:hover:bg-neutral-800 rounded-md"
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center gap-1 justify-center dark:bg-zinc-100 bg-zinc-900 text-zinc-100 dark:text-zinc-900 rounded-full px-4 py-2 transition duration-300"
                  onClick={toggleMenu}
                >
                  <span>Get started</span>
                  <ArrowUpRight className="size-5" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
