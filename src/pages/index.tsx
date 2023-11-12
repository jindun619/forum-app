import { useState, useEffect } from "react";

import Link from "next/link";

import axios from "axios";

import Login from "@/components/Login";

export default function IndexPage() {
  const [posts, setPosts] = useState<any>();
  useEffect(() => {
    axios
      .get("/api/posts")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Login />
      <div>
        <Link href="/write">Go To Write.tsx</Link>
      </div>
      <div>
        {posts
          ? posts.map((v: any, i: any) => (
              <div key={i}>
                <h1>{v.title}</h1>
                <h3>{v.content}</h3>
                <p>{`author: ${v.userId}`}</p>
              </div>
            ))
          : ""}
      </div>
    </>
  );
}
