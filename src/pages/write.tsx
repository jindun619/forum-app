import { useState, useEffect } from "react";

import { useSession, signIn } from "next-auth/react";

import axios from "axios";

import { useRouter } from "next/router";

export default function WritePage() {
  const router = useRouter()

  const { data: session, status } = useSession();

  const [inputForm, setInputForm] = useState({
    title: "",
    content: "",
  });

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
    axios
      .post("/api/posts", {
        title: inputForm.title,
        content: inputForm.content,
        userId: session?.user?.sub,
      })
      .then((res) => {
        console.log(res);
        router.push("/")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (status === "unauthenticated") {
    signIn("naver");
    return (
      <>
        <h1>please log in</h1>
      </>
    );
  } else {
    return (
      <>
        {/* INPUTS */}
        <div className="mt-10 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
            className="block input border-2 border-neutral w-full"
          />
          <textarea
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
      </>
    );
  }
}
