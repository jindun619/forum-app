import { useState, useEffect } from "react";

import Link from "next/link";

import axios from "axios";

import PostCard from "@/components/PostCard";

export default function IndexPage() {
  const [posts, setPosts] = useState<any>();
  const [names, setNames] = useState<any>([]);

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

  useEffect(() => {
    if (posts && names.length < posts.length) {
      posts.map((v: any) => {
        axios
          .get(`/api/users/${v.userId}`)
          .then((res) => {
            setNames([...names, res.data.userData.name]);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }, [posts, names]);

  return (
    <>
      <div className="mt-10">
        <Link
          className="mb-3 btn btn-neutral text-neutral-content text-xl"
          href="/write">
          작성
        </Link>
        <p className="pl-5 text-base text-slate-500">
          총 {posts ? posts.length : 0}개의 게시물
        </p>
        {posts
          ? posts.map((v: any, i: any) => (
              <PostCard key={i} data={v} userName={names[i]} />
            ))
          : ""}
      </div>
    </>
  );
}
