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
  const [commentInput, setCommentInput] = useState<string>("");

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
  } else if (post && userData) {
    const date = new Date(post.date).toISOString().substring(0, 10);
    return (
      <div>
        <p className="mt-10 text-5xl font-bold mb-10">{post.title}</p>
        <p className="text-slate-600 font-bold">{`${userData.name} · ${date}`}</p>
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
          <div className="mt-5 relative border-2 input border-neutral">
            <div className="w-96">
              <input
                type="text"
                placeholder="댓글 작성"
                className="blocks w-full my-auto"
                onChange={handleCommentChange}
              />
            </div>
            <button
              className="absolute top-0 right-0 btn btn-md btn-neutral text-neutral-content text-lgs"
              onClick={handleCommentClick}>
              작성
            </button>
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
