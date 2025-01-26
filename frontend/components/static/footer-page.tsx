"use client";
import React from "react";
import Link from "next/link";
import {
  DiscordLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import { ArrowUpRight, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { usePathname } from 'next/navigation';

const Footer: React.FC = () => {
  const pathname = usePathname();
  const isProductPage = [
    '/products/AutoScribe',
    '/products/CucumberCraft', 
    '/products/DomDetective',
    '/products/IdeaForge',
    '/products/WebTrekker'
  ].includes(pathname);

  return (
    <footer
      className="dark:bg-black py-8 sticky top-full"
      style={{
        background:
          "linear-gradient(to bottom, #FFFFFF 0%, #C9EFFF 59%, #C9EFFF 100%)",
      }}
    >
      {!isProductPage && (
        <div className="container mx-auto px-4 min-h-[300px] md:h-[500px]">
          <div className="flex flex-col items-center justify-center h-full w-full gap-8 md:gap-14 text-center">
            <span className="text-3xl md:text-5xl font-bold px-4">
              Want to add AI in your automation testing?
            </span>
            <div>
              <Link
                href={"/signup"}
                className="bg-indigo-600 text-white rounded-full transition duration-300 shadow-none hover:bg-indigo-700 hover:text-white hover:shadow-lg border-none px-4 md:px-5 py-2 md:py-3 flex items-center gap-2"
              >
                Start Testing Now
                <ArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-4 w-full md:w-[calc(100%-100px)] mx-auto justify-around">
          <div className="flex flex-col items-center md:items-start">
            <span className="flex flex-col justify-start items-center md:items-start gap-2 dark:text-zinc-100 text-zinc-900 text-2xl mb-5">
              <Image
                src="/logo.png"
                alt="Waigenie Logo"
                width={42}
                height={42}
              />
              <span className="text-2xl mt-2 font-bold">Waigenie</span>
            </span>
            <span className="text-gray-600 dark:text-gray-400 max-w-[350px] text-center md:text-left">
              We are dedicated to providing high-quality services and products
              to our customers.
            </span>
          </div>
          <div className="dark:text-white text-zinc-900 w-full md:w-[150px]">
            <span className="text-lg font-semibold mb-4 block text-center md:text-left">
              Quick Links
            </span>
            <ul className="text-gray-600 dark:text-gray-300 mt-4 flex flex-col items-center md:items-start">
              <li className="mb-2">
                <Link
                  href="/"
                  className="hover:text-gray-900 hover:dark:text-gray-100"
                >
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/services"
                  className="hover:text-gray-900 hover:dark:text-gray-100"
                >
                  Services
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/about"
                  className="hover:text-gray-900 hover:dark:text-gray-100"
                >
                  About
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/contact"
                  className="hover:text-gray-900 hover:dark:text-gray-100"
                >
                  Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/terms"
                  className="hover:text-gray-900 hover:dark:text-gray-100"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/privacy"
                  className="hover:text-gray-900 hover:dark:text-gray-100"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/cancel-refund"
                  className="hover:text-gray-900 hover:dark:text-gray-100"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="dark:text-white text-zinc-900 w-full md:w-[150px]">
            <span className="text-lg font-semibold mb-4 block text-center md:text-left">
              Products
            </span>
            <ul className="text-gray-600 dark:text-gray-300 mt-4 flex flex-col items-center md:items-start">
              <li className="mb-2">
                <Link
                  href="/products/IdeaForge"
                  className="hover:text-gray-900 hover:dark:text-gray-100"
                >
                  IdeaForge
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/products/DomDetective"
                  className="hover:text-gray-900 hover:dark:text-gray-100"
                >
                  DomDetective
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/products/CucumberCraft"
                  className="hover:text-gray-900 hover:dark:text-gray-100"
                >
                  CucumberCraft
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/products/AutoScribe"
                  className="hover:text-gray-900 hover:dark:text-gray-100"
                >
                  AutoScribe
                </Link>
              </li>
              {/* <li className="mb-2">
                <Link
                  href="/products/WebTrekker"
                  className="hover:text-gray-900 hover:dark:text-gray-100"
                >
                  WebTrekker
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="text-zinc-900 dark:text-white w-full md:w-[150px]">
            <span className="text-lg font-semibold mb-4 block text-center md:text-left">
              Follow Us
            </span>
            <ul className="flex flex-col space-y-2 mt-4 items-center md:items-start">
              <li className="hover:translate-x-2 transition-transform">
                <Link
                  href=""
                  aria-label="instagram"
                  className="w-fit flex justify-start items-center gap-2"
                >
                  <InstagramLogoIcon className="size-5" />
                  <span>Instagram</span>
                </Link>
              </li>
              <li className="hover:translate-x-2 transition-transform">
                <Link
                  href=""
                  aria-label="twitter"
                  className="flex justify-start items-center gap-2 w-fit"
                >
                  <TwitterLogoIcon className="size-5" />
                  <span>Twitter (Now X)</span>
                </Link>
              </li>
              <li className="hover:translate-x-2 transition-transform">
                <Link
                  href=""
                  aria-label="discord"
                  className="flex justify-start items-center gap-2 w-fit"
                >
                  <DiscordLogoIcon className="size-5" />
                  <span>Discord</span>
                </Link>
              </li>
              <li className="hover:translate-x-2 transition-transform">
                <Link
                  href="https://www.linkedin.com/company/waigenie"
                  aria-label="LinkedIn"
                  className="flex justify-start items-center gap-2 w-fit"
                >
                  <Linkedin className="size-5" />
                  <span className="flex justify-around items-center gap-1">LinkedIn <div className="bg-emerald-500 size-2 rounded-full animate-pulse"/></span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-8 w-full md:w-[calc(100%-100px)] mx-auto h-0.5 bg-indigo-300/50 rounded-full" />
        <div className="border-t border-gray-200 mt-8 text-center">
          <span className="text-gray-600 dark:text-gray-100 text-xs">
            © {new Date().getFullYear()} WaiGenie. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
