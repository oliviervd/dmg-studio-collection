import { useLocation } from "preact-iso";

export function Header() {
  const { url } = useLocation();

  return (
    <header>
      <a href="/">
        <h1>studio collection</h1>
      </a>
    </header>
  );
}
