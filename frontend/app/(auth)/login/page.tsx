"use client";
import { LoginForm } from "@/components/login-page";
import React from "react";

export default function page() {
  return (
    <>
      <div className="flex justify-center items-start pt-32">
        <LoginForm />
      </div>
    </>
  );
}
