"use client";
import React from "react";
import localFont from "next/font/local";

const porterSans = localFont({
  src: "../app/fonts/porter-sans-inline-block-webfont.woff",
  variable: "--font-porter",
  weight: "100 900",
});

export default function ErrorPage() {
  return (
    <>
      <div className={`${porterSans.variable}`}>
        <div></div>
      </div>
    </>
  );
}
