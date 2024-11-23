// components/session-provider.tsx
import { auth } from "@/auth";
import Navbar from "@/components/navbar-page";
import Footer from "@/components/footer-page";
import { DashboardNavbar } from "@/components/dashboard-navbar";
import { User } from "@prisma/client";

export default async function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user as User;

  if (session?.user?.email) {
    return <DashboardNavbar user={user}>{children}</DashboardNavbar>;
  } else {
    return (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    );
  }
}
