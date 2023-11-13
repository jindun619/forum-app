import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { useSession } from "next-auth/react";

import axios from "axios";

import Login from "@/components/Login";

export default function UpdatePage() {
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

  const [inputForm, setInputForm] = useState({
    title: "",
    content: "",
  });

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
    if (post) {
      setInputForm({
        title: post.title,
        content: post.content,
      });
    }
  }, [post]);

  const handleChange = (e: any) => {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    axios
      .patch(`/api/posts/${post?.id}`, {
        title: inputForm.title,
        content: inputForm.content,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!post) {
    <h1>Loading..</h1>;
  } else if (status === "unauthenticated") {
    return (
      <>
        <h1>Please Log In!</h1>
        <Login />
      </>
    );
  } else if (post.userId !== session?.user.sub) {
    return (
      <>
        <h1>This is not your post!</h1>
        <Login />
      </>
    );
  } else {
    return (
      <>
        <Login />
        <input
          type="text"
          value={inputForm.title}
          name="title"
          onChange={handleChange}
          style={{ display: "block" }}
        />
        <textarea
          value={inputForm.content}
          name="content"
          onChange={handleChange}
          style={{ display: "block" }}
        />
        <input type="submit" onClick={handleClick} />
      </>
    );
  }
}
