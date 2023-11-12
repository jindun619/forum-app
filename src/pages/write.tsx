import { useSession } from "next-auth/react";

import Login from "@/components/Login";

export default function WritePage() {
  const { data: session, status } = useSession();

  return (
    <>
      <h1>write page</h1>
      <h1>
        {status === "authenticated"
          ? `authenticated, hello ${session.user?.name}`
          : "please log in"}
      </h1>
      <Login />
    </>
  );
}
