import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import Link from "next/link";

import { GetServerSideProps } from "next";

import { useSession } from "next-auth/react";

import axios from "axios";

import prisma from "@/lib/db";

import { signIn } from "next-auth/react";

import { getDateByString } from "@/utils/utils";

import LoadingModal from "@/components/LoadingModal";

export default function PostPage({ post /*, comments*/ }: any) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [comments, setComments] = useState<any[]>([]);

  const [commentInput, setCommentInput] = useState<string>("");

  //hydration오류를 피하기 위한.. 더러운 코드ㅠ
  const [postDateTime, setPostDateTime] = useState<string>("");
  const [commentDateTime, setCommentDateTime] = useState<string[]>([]);

  const [userData, setUserData] = useState({
    name: "",
    image: "",
  });

  //Comment를 입력했을 때 새로고침 되기 전까지 modal loading창을 보여줌
  const [commentLoading, setCommentLoading] = useState<boolean>(false);

  useEffect(() => {
    //삭제 후 홈으로 가는 속도 향상
    router.prefetch("/");

    const { date, time } = getDateByString(post.date);
    setPostDateTime(`${date} ${time}`);

    (async () => {
      axios
        .get(`/api/users/${post.userId}`)
        .then((res) => {
          setUserData({
            name: res.data.userData.name,
            image: res.data.userData.image,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  useEffect(() => {
    if (router.query.id) {
      axios
        .get(`/api/comments/${router.query.id}`)
        .then((res) => {
          console.log(res);
          res.data.map((v: any) => {
            axios
              .get(`/api/users/${v.userId}`)
              .then((res) => {
                const newComment = {
                  ...v,
                  userName: res.data.userData.name,
                  userImage: res.data.userData.image,
                };
                setComments((prev) => [...prev, newComment]);
              })
              .catch((err) => {
                console.log(err);
              });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router.query.id]);

  useEffect(() => {
    console.log(comments);
    comments.map(async (v: any, i: any) => {
      const { date, time } = getDateByString(v.date);
      setCommentDateTime((prev) => [...prev, `${date} ${time}`]);
    });
  }, [comments]);

  useEffect(() => {
    if (commentLoading) {
      window.document.getElementById("commentLoading")!.style.opacity = "1";
    } else {
      window.document.getElementById("commentLoading")!.style.opacity = "0";
    }
  }, [commentLoading]);

  const handlePostDelete = () => {
    const userConfirm = confirm("게시글을 삭제하시겠습니까?");
    if (userConfirm) {
      axios
        .delete(`/api/posts/${router.query.id}`)
        .then((res) => {
          console.log(res);
          router.push("/");
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
    if (status === "unauthenticated") {
      alert("로그인이 필요합니다.");
      signIn("kakao");
    }

    if (commentInput.replace(/\s/g, "").length === 0) {
      alert("내용을 입력해 주세요.");
      return false;
    }

    const body = {
      content: commentInput,
      userId: session?.user.sub,
      postId: router.query.id,
    };

    if (!commentLoading) {
      setCommentLoading(true);
      axios
        .post("/api/comments", body)
        .then((res) => {
          console.log(res);
          setCommentLoading(false);
          router.replace(router.asPath);
          setCommentInput("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const deleteComment = (comment: any) => {
    const userConfirm = confirm("댓글을 삭제하시겠습니까?");
    if (userConfirm) {
      axios
        .delete(`/api/comments/${comment.id}`)
        .then((res) => {
          console.log(res);
          router.replace(router.asPath);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (post === null) {
    return <h1>{"Post doesn't exist!"}</h1>;
  } else if (post) {
    return (
      <div>
        <p className="mt-10 text-5xl font-bold mb-10">{post.title}</p>
        <div className="flex">
          <div className="h-10">
            <img src={userData.image} className="h-full" />
          </div>
          <p className="pl-1 text-slate-600 font-bold">{`${userData.name} · ${postDateTime}`}</p>
        </div>
        <p className="mb-14 text-xl leading-10">{post.content}</p>
        {post.userId === session?.user.sub ? (
          <>
            <Link href={`/update/${router.query.id}`}>
              <button className="mr-3 btn btn-warning text-warning-content text-xl">
                편집
              </button>
            </Link>
            <button
              className="btn btn-error text-error-content text-xl"
              onClick={handlePostDelete}>
              삭제
            </button>
          </>
        ) : (
          ""
        )}
        {/* COMMENTS */}
        <div className="my-5 pt-5 border-t-2">
          <textarea
            placeholder={
              status === "authenticated" ? "댓글 작성" : "로그인이 필요합니다."
            }
            value={commentInput}
            className="textarea border-2 border-neutral w-full text-lg"
            onChange={handleCommentChange}
          />
          <button
            className="btn btn-neutral text-neutral-content text-xl"
            onClick={handleCommentClick}>
            작성
          </button>
        </div>
        {comments?.map((v: any, i: any) => {
          return (
            <div key={i} className="p-2 border-t-2">
              <div className="flex justify-between">
                <div>
                  <div className="flex">
                    <div className="h-10">
                      <img src={v.userImage} className="h-full" />
                    </div>
                    <p className="pl-1 font-bold">{v.userName}</p>
                  </div>
                  <p className="text-lg">{v.content}</p>
                  <p className="text-sm text-slate-600 font-bold">
                    {commentDateTime[i] ? commentDateTime[i] : ""}
                  </p>
                </div>
                {v.userId === session?.user.sub ? (
                  <div>
                    <button
                      className="btn btn-sm btn-square btn-error"
                      onClick={() => {
                        deleteComment(v);
                      }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
        <LoadingModal idName="commentLoading" />
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

    if (post) {
      const newPost = {
        ...post,
        date: post.date.toISOString(),
      };

      return {
        props: {
          post: newPost,
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
