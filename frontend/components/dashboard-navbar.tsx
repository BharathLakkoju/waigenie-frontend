// components/dashboard-navbar.tsx
"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar"; // Assuming SidebarLink is imported here
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@prisma/client";
import TestIdea from "./test-idea";
import GenerateBDD from "./generate-bdd";
import IdentifyEl from "./identify-el";
import AutomateCode from "./automate-code";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { signout } from "@/actions/auth";
import AgentExplorer from "./agent-explorer";
import { FaRobot } from "react-icons/fa";
import { Code, FileCode2, Info, Lightbulb, SearchCode, LogOut } from "lucide-react";

export function DashboardNavbar({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const handleSignout = async () => {
    await signout();
    router.push("/");
  };

  const [activeLink, setActiveLink] = useState("IdeaForge");

  const links = [
    {
      label: "IdeaForge",
      href: "#",
      icon: (
        <>
          <Lightbulb className="text-neutral-700 dark:text-neutral-200 size-10 flex-shrink-0" />
        </>
      ),
    },
    {
      label: "CucumberCraft",
      href: "#",
      icon: (
        <>
          <FileCode2 className="text-neutral-700 dark:text-neutral-200 h-5 w-4 flex-shrink-0" />
        </>
      ),
    },
    {
      label: "WebTrekker",
      href: "#",
      icon: (
        <>
          <SearchCode className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        </>
      ),
    },
    {
      label: "DomDetective",
      href: "#",
      icon: (
        <>
          <Info className="text-neutral-700 dark:text-neutral-200 size-5 flex-shrink-0" />
        </>
      ),
    },
    {
      label: "AutoScribe",
      href: "#",
      icon: (
        <>
          <Code className="text-neutral-700 dark:text-neutral-200 h-4 w-5 flex-shrink-0" />
        </>
      ),
    },
  ];

  const linkComponents = [
    {
      label: "IdeaForge",
      component: <TestIdea />,
    },
    {
      label: "CucumberCraft",
      component: <GenerateBDD />,
    },
    {
      label: "DomDetective",
      component: <IdentifyEl />,
    },
    {
      label: "AutoScribe",
      component: <AutomateCode />,
    },
    {
      label: "WebTrekker",
      component: <AgentExplorer />,
    },
  ];

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-200 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" // for your use case, use h-screen instead of h-[60vh]
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2 justify-start items-start">
              {links.map((link, idx) => (
                <Button
                  key={idx}
                  onClick={() => handleLinkClick(link.label)}
                  className="bg-transparent shadow-none border-none flex-shrink-0 p-0"
                  variant="outline"
                >
                  <SidebarLink link={link} className="" />
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Avatar className="size-6">
                <AvatarImage src={user.image ?? ""} />
                <AvatarFallback>{user.name ?? "US"}</AvatarFallback>
              </Avatar>
              {open && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-neutral-700 dark:text-neutral-200"
                >
                  {user.name}
                </motion.span>
              )}
            </div>
            <Button
              onClick={handleSignout}
              className="bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700 shadow-none border-none flex items-center justify-center gap-2 p-2 w-full"
              variant="outline"
            >
              <LogOut className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
              {open && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-neutral-700 dark:text-neutral-200"
                >
                  Sign out
                </motion.span>
              )}
            </Button>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-blue-200 to-blue-100 overflow-y-auto">
        {linkComponents.find((link) => link.label === activeLink)?.component}
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20 min-h-10 w-full justify-start"
    >
      <Image src="/logo.png" width={24} height={24} alt="" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre text-[16px] pt-2"
      >
        WaiGenie
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20 min-h-10"
    >
      {/* <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" /> */}
      <Image src="/logo.png" alt="" width={24} height={24} />
    </Link>
  );
};
