import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    console.log(session.user);
    return (
      <>
        <button className="btn btn-ghost text-xl" onClick={() => signOut()}>
          로그아웃
        </button>
      </>
    );
  }
  return (
    <>
      <button className="btn btn-ghost text-xl" onClick={() => signIn("naver")}>
        로그인
      </button>
    </>
  );
}
