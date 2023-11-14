import { useEffect } from "react";

import Navbar from "./Navbar";

export default function Layout(props: { children: React.ReactNode }) {
  useEffect(() => {
    document.querySelector("body")?.setAttribute("data-theme", "retro");
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto">{props.children}</div>
    </div>
  );
}
