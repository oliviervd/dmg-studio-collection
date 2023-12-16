import { useLocation } from "preact-iso";

export function Header() {
  const { url } = useLocation();

  return (
    <header>
      <a href="/">
        <h1>studio collection</h1>
      </a>{" "}
      <nav>
        <a href="">
          <h2>about</h2>
        </a>
      </nav>
    </header>
  );
}
