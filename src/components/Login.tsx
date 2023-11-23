import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <button className="btn btn-ghost text-xls" onClick={() => signOut()}>
          로그아웃
        </button>
      </>
    );
  }
  return (
    <>
      <button
        className="btn btn-ghost text-xls"
        onClick={() => signIn("kakao")}>
        로그인
      </button>
    </>
  );
}
