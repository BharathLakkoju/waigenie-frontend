import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/middleware";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect(DEFAULT_LOGIN_REDIRECT);
  }

  return (
    <div className="h-screen flex items-center justify-center">
      {children}
    </div>
  );
} 