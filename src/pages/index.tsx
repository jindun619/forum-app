import { useState, useEffect } from "react";

import { GetServerSideProps } from "next";

import Link from "next/link";

import axios from "axios";

import prisma from "@/lib/db";

import PostCard from "@/components/PostCard";

export default function IndexPage({ posts }: any) {
  const [userNames, setUserNames] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      for (const post of posts) {
        await axios
          .get(`/api/users/${post.userId}`)
          .then((res) => {
            setUserNames((prev) => [...prev, res.data.userData.name]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })();
  }, []);

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
              <PostCard
                key={i}
                data={v}
                userName={userNames[i] || "userName"}
              />
            ))
          : ""}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await prisma.post.findMany();

  const newPosts = posts.map((post) => {
    return {
      ...post,
      date: post.date.toISOString(),
    };
  });

  return {
    props: {
      posts: newPosts,
    },
  };
};
