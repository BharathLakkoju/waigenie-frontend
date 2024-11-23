import React from "react";
import localFont from "next/font/local";
import Image from "next/image";

const porterSans = localFont({
  src: "../app/fonts/porter-sans-inline-block-webfont.woff",
  variable: "--font-porter",
  weight: "100 900",
});

export default function notFound() {
  return (
    <>
      <div className="flex flex-col justify-center h-screen items-center bg-gradient-to-b from-[#E3F3F2]/0 to-[#E0DDFF]/70">
        <div className={`${porterSans.className} mt-32 text-[10rem]`}>404</div>
        <div className="flex flex-col justify-center items-center">
          <span className="font-bold text-2xl">Page not Found</span>
          {/* add a background radial gradient to the below div tag */}
          <div className="">
            <Image
              src="/404_graphic.png"
              alt="404 Graphic"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    </>
  );
}
