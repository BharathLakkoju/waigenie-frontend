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
import { auth } from "@/auth";

interface UserDetails {
  id: string;
  name: string;
  email: string;
  image: string | null;
  userType: string;
  credits: number;
  maxCredits: number;
  creditRefreshInterval: number;
  subscriptionEndDate: Date | null;
}

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
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAndResetCredits = async (email: string) => {
    try {
      const response = await fetch('/api/credits/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Credits were reset, update the UI
          setUserDetails(prev => prev ? { ...prev, credits: data.credits } : prev);
        }
      }
    } catch (error) {
      console.error("Error checking credit reset:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/user/details', {
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
        setUserDetails(data);
        // Check if credits need to be reset
        await checkAndResetCredits(user.email);
      } else {
        console.error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user.email]);

  const handleUpgradeSuccess = async (newUserType: string) => {
    console.log("Upgrade successful, new user type:", newUserType);
    await fetchUserData(); // Refresh user data after upgrade
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
    <div className={cn(
      "rounded-md flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
      "h-screen"
    )}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="p-1">
              {open ? <Logo /> : <LogoIcon />}
            </div>
            <div className="mt-8 flex flex-col gap-2 justify-start items-start">

              {links.map((link, idx) => (
                <Button
                  key={idx}
                  onClick={() => handleLinkClick(link.label)}
                  className="bg-transparent border-0 shadow-none rounded-lg flex-shrink-0 p-1"
                  variant="outline"
                >
                  <SidebarLink
                    link={link}
                    className=""
                    activeLink={activeLink}
                  />
                </Button>
              ))}
              {/* Credits Display */}
              <div className="">
                <div className="w-full p-1 h-5">
                  <div className="flex items-center gap-5">
                    <div className="p-1">
                      <Coins className={`h-5 w-5 ${open ? `text-indigo-600 dark:text-indigo-400`: `text-black`}`}/>
                    </div>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col transition-all duration-500"
                      >
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          Credits
                        </span>
                        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                          {isLoading ? "..." : userDetails?.credits || 0}
                          
                        </span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="border-t pt-4 border-gray-200 dark:border-neutral-700">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-1 rounded-lg dark:bg-neutral-800/50">
                  <Avatar className="h-8 w-8 border-2 border-white dark:border-neutral-800">
                    <AvatarImage src={userDetails?.image ?? ""} />
                    <AvatarFallback className="bg-indigo-600 text-white">
                      {userDetails?.name.split(" ")[0]?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col"
                    >
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {userDetails?.name}
                      </span>
                      {!isLoading && userDetails && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {userDetails.userType === "freeTierUser" ? "Free Plan" : 
                           userDetails.userType === "proTierUser" ? "Pro Plan" : "Enterprise Plan"}
                        </span>
                      )}
                    </motion.div>
                  )}
                </div>

                  {/* Only show upgrade button for freeTierUser */}
                  {open && !isLoading && userDetails?.userType === "freeTierUser" && (
                    <Button
                      onClick={() => handleUpgradeClick("pro")}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-md border-none"
                      variant="default"
                    >
                      {open ? (
                        <span className="flex items-center gap-2">
                          <span className="text-lg">⭐</span>
                          Upgrade to Pro
                        </span>
                      ) : (
                        <span className="text-lg">⭐</span>
                      )}
                    </Button>
                  )}

                <Button
                  onClick={handleSignout}
                  className="w-full justify-start gap-2 bg-transparent hover:bg-gray-100 dark:hover:bg-neutral-800/50"
                  variant="ghost"
                >
                  <LogOut className="h-4 w-4" />
                  {open && <span>Sign out</span>}
                </Button>
              </div>
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800 overflow-y-auto rounded-tl-[30px] rounded-bl-[30px]">
        {children}
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