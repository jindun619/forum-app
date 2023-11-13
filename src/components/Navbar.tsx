import Link from "next/link";

import { useSession } from "next-auth/react";

import Login from "@/components/Login";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="navbar bg-primary">
      <div className="navbar-start">
        <Link className="btn btn-ghost text-xl" href="/">
          홈
        </Link>
      </div>
      <div className="navbar-end">
        <Link className="btn btn-ghost text-xl" href="/write">
          작성
        </Link>
        {session ? (
          <div className="flex">
            <div className="h-10">
              <img
                className="w-full h-full rounded-full"
                src={session.user.image}
              />
            </div>
            <p className="my-auto text-md">{session.user.name}</p>
          </div>
        ) : (
          ""
        )}

        <Login />
      </div>
    </div>
  );
}
