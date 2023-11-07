import HandleUsers from "./HandleUsers";
import HandlePosts from "./HandlePosts";
import HandleComments from "./HandleComments";

export default function HomePage() {
  return (
    <>
      <HandleUsers />
      <HandlePosts />
      <HandleComments />
    </>
  );
}
