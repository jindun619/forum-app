import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    console.log(session.user);
    return (
      <>
        <button className="btn btn-ghost text-xl" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <button className="btn btn-ghost text-xl" onClick={() => signIn("naver")}>
        Sign in
      </button>
    </>
  );
}
