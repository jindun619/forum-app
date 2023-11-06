import { useEffect } from "react";

import HomePage from "@/components/Home";

import axios from "axios";

export default function IndexPage() {
  // useEffect(() => {
  //   axios
  //     .post("/api/users/haha", {data1: "haha", data2: "hoho"})
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return <HomePage />;
}
