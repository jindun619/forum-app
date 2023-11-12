import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();
  const { status: status } = useSession();
  console.log(status);
  if (session) {
    console.log(session);
    return (
      <>
        Welcome, {session.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("naver")}>Sign in</button>
    </>
  );
}
