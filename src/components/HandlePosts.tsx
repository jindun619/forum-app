import { useState, useEffect } from "react";

import axios from "axios";

export default function HandlePosts() {
  const [createFormData, setCreateFormData] = useState({
    authorId: "",
    title: "",
    content: "",
  });
  const [updateFormData, setUpdateFormData] = useState({
    id: "",
    authorId: "",
    title: "",
    content: "",
  });
  const [deleteFormData, setDeleteFormData] = useState({
    id: "",
  })

  const handleCreateChange = (e: any) => {
    setCreateFormData({
      ...createFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateSubmit = () => {
    axios
      .post("/api/posts", createFormData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReadSubmit = () => {
    axios
      .get("/api/posts")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateChange = (e: any) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = () => {
    axios
      .patch(`/api/posts/${updateFormData.id}`, updateFormData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteChange = (e: any) => {
    setDeleteFormData({
      id: e.target.value,
    });
  };

  const handleDeleteSubmit = () => {
    axios
      .delete(`/api/posts/${deleteFormData.id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1>POSTS</h1>
      {/* CREATE */}
      <div>
        <input
          type="text"
          name="authorId"
          placeholder="Author Id"
          onChange={handleCreateChange}
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleCreateChange}
        />
        <input
          type="text"
          name="content"
          placeholder="Content"
          onChange={handleCreateChange}
        />
        <button onClick={handleCreateSubmit}>포스트 생성</button>
      </div>
      {/* READ */}
      <div>
        <button onClick={handleReadSubmit}>포스트 불러오기</button>
      </div>
      {/* UPDATE */}
      <div>
        <input
          type="text"
          name="id"
          placeholder="id"
          onChange={handleUpdateChange}
        />
        <input
          type="text"
          name="authorId"
          placeholder="Author Id"
          onChange={handleUpdateChange}
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleUpdateChange}
        />
        <input
          type="text"
          name="content"
          placeholder="Content"
          onChange={handleUpdateChange}
        />
        <button onClick={handleUpdateSubmit}>포스트 업데이트</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Post Id"
          onChange={handleDeleteChange}
        />
        <button onClick={handleDeleteSubmit}>포스트 제거</button>
      </div>
    </>
  );
}
