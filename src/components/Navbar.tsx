import Link from "next/link";

import { useSession } from "next-auth/react";

import Login from "@/components/Login";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="navbar-start">
        <Link className="btn btn-ghost text-xl" href="/">
          조성민 연구 포럼
        </Link>
      </div>
      <div className="navbar-end">
        {session ? (
          <div className="flex pr-1">
            <div className="w-8 h-8 mr-1">
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
