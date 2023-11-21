import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { GetServerSideProps } from "next";

import { useSession } from "next-auth/react";

import axios from "axios";

import prisma from "@/lib/db";

import { getUserNameByUserId } from "@/utils/prisma";

export default function PostPage({ post, comments }: any) {
  console.log(comments);

  const router = useRouter();
  const { data: session, status } = useSession();

  const [commentInput, setCommentInput] = useState<string>("");

  const handleClick1 = (e: any) => {
    if (session?.user.sub !== post?.userId) {
      alert("This is not your post!");
    } else {
      router.push(`/update/${router.query.id}`);
    }
  };

  const handleClick2 = (e: any) => {
    if (session?.user.sub !== post?.userId) {
      alert("This is not your post!");
    } else {
      axios
        .delete(`/api/posts/${router.query.id}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCommentChange = (e: any) => {
    setCommentInput(e.target.value);
  };

  const handleCommentClick = () => {
    const body = {
      content: commentInput,
      userId: session?.user.sub,
      postId: router.query.id,
    };
    axios
      .post("/api/comments", body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (post === null) {
    return <h1>{"Post doesn't exist!"}</h1>;
  } else if (post) {
    return (
      <div>
        <p className="mt-10 text-5xl font-bold mb-10">{post.title}</p>
        <p className="text-slate-600 font-bold">{`${post.userName} · ${post.date}`}</p>
        <p className="text-xl leading-10">{post.content}</p>
        {status === "authenticated" ? (
          <>
            <button
              className="mt-5 mr-3 btn btn-neutral text-neutral-content text-xl"
              onClick={handleClick1}>
              편집
            </button>
            <button
              className="mt-5 btn btn-neutral text-neutral-content text-xl"
              onClick={handleClick2}>
              삭제
            </button>
          </>
        ) : (
          ""
        )}
        {/* COMMENTS */}
        {status === "authenticated" ? (
          <div>
            <div className="mt-5 pt-5 border-t-2">
              <textarea
                placeholder="댓글 작성"
                className="textarea border-2 border-neutral w-full text-lg"
                onChange={handleCommentChange}
              />
              <button
                className="btn btn-neutral text-neutral-content text-xl"
                onClick={handleCommentClick}>
                작성
              </button>
            </div>
            {comments.map((v: any, i: any) => (
              <div>
                <p key={i}>
                  {v.content}
                  {v.userName}
                  {v.date}
                </p>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  } else {
    return <h1>Loading..</h1>;
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  if (query.id) {
    const post = await prisma.post.findUnique({
      where: {
        id: +query.id,
      },
    });
    const comments = await prisma.comment.findMany({
      where: {
        postId: +query.id,
      },
    });

    if (post) {
      const userName = await getUserNameByUserId(post.userId);

      const newPost = {
        ...post,
        date: post.date.toISOString(),
        userName: userName,
      };

      const newComments = await Promise.all(
        comments.map(async (comment) => {
          const userName = await getUserNameByUserId(comment.userId);

          return {
            ...comment,
            date: comment.date.toISOString(),
            userName: userName,
          };
        })
      );

      return {
        props: {
          post: newPost,
          comments: newComments,
        },
      };
    } else {
      return {
        props: {
          error: "no post data",
        },
      };
    }
  } else {
    return {
      props: {
        error: "no query.id",
      },
    };
  }
};
