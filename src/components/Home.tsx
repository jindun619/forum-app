import { useState, useEffect } from "react"

import axios from "axios"

export default function HomePage() {
  const [createFormData, setCreateFormData] = useState({name: ''})
  const [users, setUsers] = useState([])
  const [updateFormData, setUpdateFormData] = useState({})

  const handleCreateChange = (e) => {
    setCreateFormData({
      name: e.target.value
    })
  }

  const handleCreateSubmit = () => {
    axios
      .post("/api/users", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleReadSubmit = () => {
    axios
      .get("/api/users")
      .then((res) => {
        setUsers(res.data)
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleUpdateChange = (e) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdateSubmit = () => {
    axios
      .patch(`/api/users/${updateFormData.id}`, updateFormData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {/* CREATE */}
      <div>
        <input type="text" placeholder="User Name" onChange={handleCreateChange} />
        <button onClick={handleCreateSubmit}>유저 생성</button>
      </div>
      {/* READ */}
      <div>
        <button onClick={handleReadSubmit}>유저 불러오기</button>
        {
          users ? users.map((v, i) => (
            <div key={i}>
              <p>{`id: ${v.id}, name:${v.name}`}</p>
            </div>
          )) : ""
        }
      </div>
      {/* UPDATE */}
      <div>
        <input type="text" name="id" placeholder="User Id" onChange={handleUpdateChange} />
        <input type="text" name="name" placeholder="User Name" onChange={handleUpdateChange} />
        <button onClick={handleUpdateSubmit}>유저 업데이트</button>
      </div>
    </>
    );
}
