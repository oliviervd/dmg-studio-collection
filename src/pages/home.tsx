import { useEffect, useRef } from "preact/hooks";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import useObjectsQuery from "../utils/hooks/useObjectQuery";

export function Home() {
  let url = window.location.href;
  let params = new URLSearchParams(url.search);
  const ref = useRef(null);

  // listen to query and write away as queryparam in URL
  useEffect(() => {
    let search_interface = document.getElementById("search-collection");
    // wait for input to change (press enter)
    search_interface.addEventListener("change", updateValue);

    function updateValue(e) {
      let prompt = e.target.value;
      params.set("search", prompt); // set params
      window.location.href = `catalogue?${params.toString()}`;
    }
  }, []);

  // fetch data
  let _objects;
  try {
    _objects = useObjectsQuery().data;
    console.log(_objects);
  } catch (e) {
    console.error(e);
  }

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home__container">
      <Header />
      <section className="home__search-container">
        <h1>explore our collection</h1>
        <div className="home__search-bar">
          <input
            id="search-collection"
            placeholder={"search by artist, object or maker.."}
          ></input>
          <p>
            {" "}
            <a href="/catalogue?search=none">or browse the full catalogue</a>
          </p>
        </div>
        <div
          onClick={() => {
            handleScrollTo("home__hero-patterns");
          }}
          className="scroll-to"
        ></div>
      </section>
      <section className="home__hero-image" id="home__hero-patterns">
        <div className={"container"}>
          <h1>
            whether printed, woven or glazed; patterns play an important role in
            design. Explore parts of the collection spanning ceramics, textiles
            and sivlerware.
          </h1>
          <div className={"link-box"}>
            <a href="/patterns">start exploring</a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
