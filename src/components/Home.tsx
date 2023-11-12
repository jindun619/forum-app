import { useEffect } from "react";

import axios from "axios";

import HandleUsers from "./HandleUsers";
import HandlePosts from "./HandlePosts";
import HandleComments from "./HandleComments";
import Login from "./Login";

export default function HomePage() {
  useEffect(() => {
    axios
      .get("/api/posts")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {/* <HandleUsers />
      <HandlePosts />
      <HandleComments /> */}
      <Login />
    </>
  );
}
