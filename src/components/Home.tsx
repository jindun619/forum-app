import HandleUsers from "./HandleUsers";
import HandlePosts from "./HandlePosts";
import HandleComments from "./HandleComments";
import Login from "./Login";

export default function HomePage() {
  return (
    <>
      <HandleUsers />
      <HandlePosts />
      <HandleComments />
      <Login />
    </>
  );
}
