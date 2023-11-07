import { useState, useEffect } from "react";

import axios from "axios";

export default function HandleComments() {
  const [createFormData, setCreateFormData] = useState({});
  const [updateFormData, setUpdateFormData] = useState({
    id: "",
    authorId: "",
    postId: ""
  });
  const [deleteFormData, setDeleteFormData] = useState({
    id: "",
  });

  const handleCreateChange = (e: any) => {
    setCreateFormData({
      ...createFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateSubmit = () => {
    axios
      .post("/api/comments", createFormData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReadSubmit = () => {
    axios
      .get("/api/comments")
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
      .patch(`/api/comments/${updateFormData.id}`, updateFormData)
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
      .delete(`/api/comments/${deleteFormData.id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1>COMMENTS</h1>
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
          name="postId"
          placeholder="Post Id"
          onChange={handleCreateChange}
        />
        <input
          type="text"
          name="content"
          placeholder="Content"
          onChange={handleCreateChange}
        />
        <button onClick={handleCreateSubmit}>커멘트 생성</button>
      </div>
      {/* READ */}
      <div>
        <button onClick={handleReadSubmit}>커멘트 불러오기</button>
      </div>
      {/* UPDATE */}
      <div>
        <input
          type="text"
          name="id"
          placeholder="comment id"
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
          name="postId"
          placeholder="Post Id"
          onChange={handleUpdateChange}
        />
        <input
          type="text"
          name="content"
          placeholder="Content"
          onChange={handleUpdateChange}
        />
        <button onClick={handleUpdateSubmit}>커멘트 업데이트</button>
      </div>
      {/* DELETE */}
      <div>
        <input
          type="text"
          placeholder="Comment Id"
          onChange={handleDeleteChange}
        />
        <button onClick={handleDeleteSubmit}>커멘트 제거</button>
      </div>
    </>
  );
}
