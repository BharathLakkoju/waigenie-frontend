//@ts-nocheck
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    // async signIn({ user, account }) {
    //   // Allow OAuth without email verification
    //   if (account?.provider !== "credentials") return true;
    //   const existingUser = await getUserById(user.id);
    //   // Prevent sign in without email verification
    //   if (!existingUser || !existingUser.emailVerified) return false;
    //   return true;
    // },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
