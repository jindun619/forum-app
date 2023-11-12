import { useEffect } from "react";

import { GetServerSideProps } from "next";

import axios from "axios";

import HandleUsers from "./HandleUsers";
import HandlePosts from "./HandlePosts";
import HandleComments from "./HandleComments";
import Login from "./Login";

export default function HomePage({ data }: { data: any }) {
  console.log(data);
  return (
    <>
      {/* <HandleUsers />
      <HandlePosts />
      <HandleComments /> */}
      <Login />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get("/api/posts");
  const data = res.data;
  return {
    props: {
      data,
    },
  };
};
