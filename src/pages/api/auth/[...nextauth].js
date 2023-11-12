import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import NaverProvider from "next-auth/providers/naver";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_DEV_ID || "",
      clientSecret: process.env.GITHUB_DEV_SECRET || "",
    }),
    NaverProvider({
      clientId: process.env.NAVER_DEV_ID || "",
      clientSecret: process.env.NAVER_DEV_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      session.user.sub = token.sub;

      return session;
    },
  },
};
export default NextAuth(authOptions);
