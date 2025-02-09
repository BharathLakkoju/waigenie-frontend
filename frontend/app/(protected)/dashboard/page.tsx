import { auth } from "@/auth";
import DashboardPage from "@/components/dashboard-page";
import React from "react";
import { User } from "@prisma/client/edge";

export default async function page() {
  return <DashboardPage />;
}
