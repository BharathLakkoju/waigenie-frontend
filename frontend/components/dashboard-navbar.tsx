"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar"; // Assuming SidebarLink is imported here
import { useRouter, usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { User } from "@prisma/client/edge";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { signout } from "@/actions/auth";
import {
  Code,
  FileCode2,
  Info,
  Lightbulb,
  LogOut,
  Coins,
} from "lucide-react";
import PaymentModal from "./payment-modal";
import { getUserByEmail, getUserType } from "@/data/user";

export function DashboardNavbar({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"pro" | "enterprise">("pro");
  const [userType, setUserType] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [credits, setCredits] = useState<number>(0);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const userT = await getUserType(user.email);
      setUserType(userT || "freeTierUser");

      // Fetch user credits
      const response = await fetch('/api/credits/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCredits(data.credits);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserType("freeTierUser");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user.email]);

  const handleUpgradeSuccess = (newUserType: string) => {
    console.log("Upgrade successful, new user type:", newUserType);
    setUserType(newUserType);
  };

  useEffect(() => {
    const currentLink = links.find(link => link.href === pathname);
    if (currentLink) {
      setActiveLink(currentLink.label);
    }
  }, [pathname]);

  const planDetails = {
    pro: {
      name: "Pro",
      price: 15,
      features: [
        "1000 credits per day",
        "Priority support",
        "Advanced features",
        "API access",
      ],
    },
    enterprise: {
      name: "Enterprise",
      price: 100,
      features: [
        "Unlimited credits",
        "24/7 priority support",
        "Custom solutions",
        "Dedicated account manager",
        "On-premise deployment",
      ],
    },
  };

  const handleUpgradeClick = (plan: "pro" | "enterprise") => {
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
  };

  const handleSignout = async () => {
    await signout();
    router.push("/");
  };

  const links = [
    {
      label: "IdeaForge",
      href: "/dashboard/IdeaForge",
      icon: (
        <>
          <Lightbulb className="size-10 flex-shrink-0" />
        </>
      ),
    },
    {
      label: "CucumberCraft",
      href: "/dashboard/cucumbercraft",
      icon: (
        <>
          <FileCode2 className="h-5 w-4 flex-shrink-0" />
        </>
      ),
    },
    // {
    //   label: "WebTrekker",
    //   href: "#",
    //   icon: (
    //     <>
    //       <SearchCode className="h-5 w-5 flex-shrink-0" />
    //     </>
    //   ),
    // },
    {
      label: "DomDetective",
      href: "/dashboard/domdetective",
      icon: (
        <>
          <Info className="size-5 flex-shrink-0" />
        </>
      ),
    },
    {
      label: "AutoScribe",
      href: "/dashboard/autoscribe",
      icon: (
        <>
          <Code className="h-4 w-5 flex-shrink-0" />
        </>
      ),
    },
  ];

  const [activeLink, setActiveLink] = useState("");
  const [open, setOpen] = useState(false);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" // for your use case, use h-screen instead of h-[60vh]
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2 justify-start items-start">
              {/* Credits Display */}

              {links.map((link, idx) => (
                <Button
                  key={idx}
                  onClick={() => handleLinkClick(link.label)}
                  className="bg-transparent shadow-none border-none flex-shrink-0 p-0"
                  variant="outline"
                >
                  <SidebarLink
                    link={link}
                    className=""
                    activeLink={activeLink}
                  />
                </Button>
              ))}
            </div>
              <div className="w-full px-2 py-3 mb-4 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-lg   ">
                <div className="flex items-center gap-2">
                  <Coins className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  {open && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col"
                    >
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Credits Available
                      </span>
                      <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                        {isLoading ? "..." : credits}
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Avatar className="size-6">
                <AvatarImage src={user.image ?? ""} />
                <AvatarFallback className="bg-black text-white">
                  {`${user.name.split(" ")[0]?.charAt(0)}`}
                </AvatarFallback>
              </Avatar>
              {open && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-neutral-700 dark:text-neutral-200"
                >
                  {user.name}
                  {!isLoading && (
                    <span className="ml-2 text-xs opacity-60">
                      ({userType === "freeTierUser" ? "Free" : userType === "proTierUser" ? "Pro" : "Enterprise"})
                    </span>
                  )}
                </motion.span>
              )}
            </div>
            {!isLoading && userType === "freeTierUser" && (
              <Button
                onClick={() => handleUpgradeClick("pro")}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg border-none flex items-center justify-center gap-2 p-2 w-full"
                variant="outline"
              >
                <span className="flex items-center gap-1">
                  {open ? 'Upgrade to Pro' : '⭐'}
                </span>
              </Button>
            )}
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
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-blue-200 to-blue-100 overflow-y-auto rounded-tl-[30px] rounded-bl-[30px]">
        {/* {linkComponents.find((link) => link.label === activeLink)?.component} */}{children}
      </div>
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        plan={selectedPlan}
        planDetails={planDetails[selectedPlan]}
        onSuccess={handleUpgradeSuccess}
      />
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
      <Image src="/logotext.svg" width={75} height={24} alt="" />
      {/* <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre text-[16px] pt-2"
      >
        WaiGenie
      </motion.span> */}
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