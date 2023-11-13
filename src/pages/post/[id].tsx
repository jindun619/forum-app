import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { useSession } from "next-auth/react";

import axios from "axios";

import Login from "@/components/Login";

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
    const date = new Date(post.date).toString();
    return (
      <>
        <Login />
        <h4>postId: {post.id}</h4>
        <h1>{post.title}</h1>
        <h3>{post.content}</h3>
        <h3>{date}</h3>
        <h4>userId: {post.userId}</h4>
        {status === "authenticated" ? (
          <input type="submit" value="삭제" onClick={handleClick} />
        ) : (
          ""
        )}
      </>
    );
  } else {
    return <h1>Loading..</h1>;
  }
}
