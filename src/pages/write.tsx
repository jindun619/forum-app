import { useState, useEffect } from "react";

import { useSession, signIn } from "next-auth/react";

import axios from "axios";

export default function WritePage() {
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
    if (session) {
      axios
        .post("/api/posts", {
          title: inputForm.title,
          content: inputForm.content,
          userId: session?.user?.sub,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
            className="mt-3 block textarea border-2 border-neutral w-full"
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
