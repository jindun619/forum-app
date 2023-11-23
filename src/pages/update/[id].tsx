import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { useSession } from "next-auth/react";

import axios from "axios";

import { signIn } from "next-auth/react";

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

  const [loading, setLoading] = useState<boolean>(false);

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
    if (inputForm.title.replace(/\s/g, "").length === 0) {
      alert("제목을 입력해 주세요.");
      return false;
    }
    if (inputForm.content.replace(/\s/g, "").length === 0) {
      alert("내용을 입력해 주세요.");
      return false;
    }

    if (!loading) {
      setLoading(true);
      axios
        .patch(`/api/posts/${post?.id}`, {
          title: inputForm.title,
          content: inputForm.content,
        })
        .then((res) => {
          console.log(res);
          router.back();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (!post) {
    <h1>Loading..</h1>;
  } else if (status === "unauthenticated") {
    signIn("kakao");
  } else if (post.userId !== session?.user.sub) {
    alert("당신의 게시글이 아닙니다.");
    router.push("/");
  } else {
    return (
      <div className="mt-10 max-w-md mx-auto">
        <input
          type="text"
          value={inputForm.title}
          placeholder="Title"
          name="title"
          onChange={handleChange}
          className="block input border-2 border-neutral w-full"
        />
        <textarea
          value={inputForm.content}
          placeholder="Content"
          name="content"
          onChange={handleChange}
          className="mt-3 block textarea border-2 border-neutral w-full h-96"
        />
        <input
          type="submit"
          onClick={handleClick}
          className="mt-3 btn btn-neutral text-xl"
        />
      </div>
    );
  }
}
