import { useState, useEffect } from "react";

import { GetServerSideProps } from "next";

import Link from "next/link";

import axios from "axios";

import prisma from "@/lib/db";

import { getUserNameByUserId } from "@/utils/prisma";

import PostCard from "@/components/PostCard";

export default function IndexPage({ posts }: any) {
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
              <PostCard key={i} data={v} userName={v.userName} />
            ))
          : ""}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await prisma.post.findMany();

  const newPosts = await Promise.all(
    //GPT가 알려줬는데 무슨 원리인지는 모르겠음..
    posts.map(async (post) => {
      return {
        ...post,
        date: post.date.toISOString(),
        userName: await getUserNameByUserId(post.userId),
      };
    })
  );

  return {
    props: {
      posts: newPosts,
    },
  };
};
