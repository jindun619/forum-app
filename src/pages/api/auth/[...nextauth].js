import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import NaverProvider from "next-auth/providers/naver"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_DEV_ID,
      clientSecret: process.env.GITHUB_DEV_SECRET,
    }),
    NaverProvider({
      clientId: process.env.NAVER_DEV_ID,
      clientSecret: process.env.NAVER_DEV_SECRET
    })
  ],
};
export default NextAuth(authOptions);
