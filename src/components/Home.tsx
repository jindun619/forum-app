import HandleUsers from "./HandleUsers";
import HandlePosts from "./HandlePosts";

export default function HomePage() {
  return (
    <>
      <HandleUsers />
      <HandlePosts />
    </>
  );
}
