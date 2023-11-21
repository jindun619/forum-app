import { useState, useEffect } from "react";

import { GetServerSideProps } from "next";

import Link from "next/link";

import axios from "axios";

import prisma from "@/lib/db";

import { getUserNameByUserId } from "@/utils/prisma";

import PostCard from "@/components/PostCard";

export default function IndexPage({ data }: any) {
  console.log("data: ", data);
  // const [posts, setPosts] = useState<any>();
  // const [names, setNames] = useState<any>([]);

  // useEffect(() => {
  //   axios
  //     .get("/api/posts")
  //     .then((res) => {
  //       console.log(res.data);
  //       setPosts(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // useEffect(() => {
  //   if (posts && names.length < posts.length) {
  //     posts.map((v: any) => {
  //       axios
  //         .get(`/api/users/${v.userId}`)
  //         .then((res) => {
  //           setNames([...names, res.data.userData.name]);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     });
  //   }
  // }, [posts, names]);

  return (
    <>
      <div className="mt-10">
        <Link
          className="mb-3 btn btn-neutral text-neutral-content text-xl"
          href="/write">
          작성
        </Link>
        <p className="pl-5 text-base text-slate-500">
          {/* 총 {data ? data.length : 0}개의 게시물 */}
        </p>
        {/* {data
          ? data.map((v: any, i: any) => (
              <PostCard key={i} data={v} userName={v.userId} />
            ))
          : ""} */}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // const posts = await prisma.post.findMany();

  // const newPosts1 = posts.map((post) => (
  //   {
  //   ...post,
  //   date: post.date.toISOString(),
  // }));

  // const newPosts2 = await newPosts1.map((v, i) => {
  //   const userName = prisma.user.findUnique({
  //     where: {
  //       id: v.userId
  //     }
  //   })

  // })
  const userName = await getUserNameByUserId("clorqup4i0000ftfpk9t35weh");

  return {
    props: {
      data: userName,
    },
  };
};
