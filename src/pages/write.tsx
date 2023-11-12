import { useState, useEffect } from "react";

import { useSession } from "next-auth/react";

import axios from "axios";

import Login from "@/components/Login";

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

  useEffect(() => {
    console.log(inputForm);
  }, [inputForm]);

  if (status === "unauthenticated") {
    return (
      <>
        <h1>please log in</h1>
        <Login />
      </>
    );
  } else {
    return (
      <>
        <h1>write page</h1>
        <h1>authenticated, hello {session?.user?.name}</h1>
        <Login />
        {/* INPUTS */}
        <div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
            style={{ display: "block" }}
          />
          <textarea
            placeholder="Content"
            name="content"
            onChange={handleChange}
            style={{ display: "block" }}
          />
          <input
            type="submit"
            onClick={handleClick}
            style={{ display: "block" }}
          />
        </div>
      </>
    );
  }
}
