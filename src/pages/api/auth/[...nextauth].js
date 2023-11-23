import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import NaverProvider from "next-auth/providers/naver";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_DEV_ID || "",
    //   clientSecret: process.env.GITHUB_DEV_SECRET || "",
    // }),
    // NaverProvider({
    //   // clientId: process.env.NAVER_DEV_ID || "",
    //   // clientSecret: process.env.NAVER_DEV_SECRET || "",
    //   clientId: process.env.NAVER_ID || "",
    //   clientSecret: process.env.NAVER_SECRET || "",
    // }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
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
