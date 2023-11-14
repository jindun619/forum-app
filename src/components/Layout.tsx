import Navbar from "./Navbar";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div data-theme="retro">
      <Navbar />
      <div className="container mx-auto">{props.children}</div>
    </div>
  );
}
