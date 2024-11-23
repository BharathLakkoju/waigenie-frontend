"use client";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function GithubLogin() {
  const onClick = (provider: "github") => {
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
        onClick={() => onClick("github")}
        variant="outline"
        type="submit"
        className="flex gap-x-2"
      >
        <GitHubLogoIcon /> GitHub
      </Button>
    </div>
  );
}
