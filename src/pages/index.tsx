import { useState, useEffect } from "react";

import Link from "next/link";

import axios from "axios";

import Login from "@/components/Login";
import PostCard from "@/components/PostCard";

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
      <div>
        {posts
          ? posts.map((v: any, i: any) => (
              <PostCard key={i} data={v} />
            ))
          : ""}
      </div>
    </>
  );
}
