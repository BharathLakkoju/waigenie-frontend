"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { FaGoogle } from "react-icons/fa";

export default function GoogleLogin() {
  const onClick = (provider: "google") => {
    try {
      signIn(provider, {
        callbackUrl: DEFAULT_LOGIN_REDIRECT,
      });
    } catch (error) {
      return { error: "Something went wrong!" };
    } finally {
      return Response.redirect(DEFAULT_LOGIN_REDIRECT);
    }
  };
  return (
    <div className="">
      <Button
        onClick={() => onClick("google")}
        variant="outline"
        type="submit"
        className=" flex gap-x-2 "
      >
        <FaGoogle /> Google
      </Button>
    </div>
  );
}
