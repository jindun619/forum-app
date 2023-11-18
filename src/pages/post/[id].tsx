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

  type UserDataType = {
    name: string;
    image: string;
  };

  const [post, setPost] = useState<PostType>();
  const [userData, setUserData] = useState<UserDataType>();

  useEffect(() => {
    if (router.query.id) {
      axios
        .get(`/api/posts/${router.query.id}`)
        .then((res) => {
          setPost(res.data.post);
          console.log(res.data.post);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router.query.id]);

  useEffect(() => {
    if (post) {
      axios
        .get(`/api/users/${post.userId}`)
        .then((res) => {
          setUserData(res.data.userData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [post]);

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
  } else if (post && userData) {
    const date = new Date(post.date).toISOString().substring(0, 10);
    return (
      <div>
        <p className="mt-10 text-5xl font-bold mb-10">{post.title}</p>
        <p className="text-slate-600 font-bold">{`${userData.name} · ${date}`}</p>
        <p className="text-xl leading-10">{post.content}</p>
        {status === "authenticated" ? (
          <button
            className="mt-5 btn btn-neutral text-neutral-content text-xl"
            onClick={handleClick}>
            삭제
          </button>
        ) : (
          ""
        )}
        <h4>postId: {post.id}</h4>
      </div>
    );
  } else {
    return <h1>Loading..</h1>;
  }
}
