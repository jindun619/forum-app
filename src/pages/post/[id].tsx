import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { useSession } from "next-auth/react";

import axios from "axios";

export default function PostPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  type PostType = {
    content: string;
    date: string;
    id: number;
    title: string;
    userId: string;
  };

  const [post, setPost] = useState<PostType>();

  useEffect(() => {
    if (router.query.id) {
      axios
        .get(`/api/posts/${router.query.id}`)
        .then((res) => {
          console.log(res.data.post);
          setPost(res.data.post);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router.query.id]);

  useEffect(() => {
    if (session) {
      console.log(session.user.sub);
    }
  }, [session]);

  const handleClick = (e: any) => {
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

  if (post === null) {
    return <h1>{"Post doesn't exist!"}</h1>;
  } else if (post) {
    const date = new Date(post.date).toISOString().substring(0, 10);
    return (
      <>
        <h4>postId: {post.id}</h4>
        <p className="text-5xl font-bold mb-10">{post.title}</p>
        <p className="text-slate-600 font-bold">{`${post.userId} · ${date}`}</p>
        <p className="text-2xl leading-10">{post.content}</p>
        {status === "authenticated" ? (
          <button className="btn btn-secondary" onClick={handleClick}>
            삭제
          </button>
        ) : (
          ""
        )}
      </>
    );
  } else {
    return <h1>Loading..</h1>;
  }
}
