import { useState } from "react";

import axios from "axios";

export default function HandleUsers() {
  const [createFormData, setCreateFormData] = useState({ name: "" });
  const [users, setUsers] = useState([]);
  const [updateFormData, setUpdateFormData] = useState({ id: "", name: "" });
  const [deleteFormData, setDeleteFormData] = useState({ id: "" });

  const handleCreateChange = (e: any) => {
    setCreateFormData({
      name: e.target.value,
    });
  };

  const handleCreateSubmit = () => {
    axios
      .post("/api/users", createFormData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReadSubmit = () => {
    axios
      .get("/api/users")
      .then((res) => {
        setUsers(res.data);
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
      .patch(`/api/users/${updateFormData.id}`, updateFormData)
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
      .delete(`/api/users/${deleteFormData.id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {/* CREATE */}
      <div>
        <input
          type="text"
          placeholder="User Name"
          onChange={handleCreateChange}
        />
        <button onClick={handleCreateSubmit}>유저 생성</button>
      </div>
      {/* READ */}
      <div>
        <button onClick={handleReadSubmit}>유저 불러오기</button>
      </div>
      {/* UPDATE */}
      <div>
        <input
          type="text"
          name="id"
          placeholder="User Id"
          onChange={handleUpdateChange}
        />
        <input
          type="text"
          name="name"
          placeholder="User Name"
          onChange={handleUpdateChange}
        />
        <button onClick={handleUpdateSubmit}>유저 업데이트</button>
      </div>
      {/* DELETE */}
      <div>
        <input
          type="text"
          placeholder="User Id"
          onChange={handleDeleteChange}
        />
        <button onClick={handleDeleteSubmit}>유저 삭제</button>
      </div>
    </>
  );
}
