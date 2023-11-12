import { useRouter } from "next/router";

export default function PostPage() {
  const router = useRouter();
  return (
    <>
      <h1>Post Page!</h1>
      <h2>postId: {router.query.id}</h2>
    </>
  );
}
