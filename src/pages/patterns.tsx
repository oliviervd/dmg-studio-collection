import { Header } from "../components/Header";
import { fetchAllObjects } from "../utils/hooks/filter/queries";
import { ImageMasonry } from "../components/Masonry";
import { shuffle } from "../utils/utils";
import { useState, useEffect } from "preact/hooks";
import { Pagination } from "../components/Pagination";

export function Patterns() {
  let currentObjects = [];
  let objects = fetchAllObjects();
  let patterns = [];

  const [imageWidth, setImageWidth] = useState(200);
  const [currentPage, setCurrentPage] = useState(1);
  const [objectsPerPage, setObjectsPerPage] = useState(30);

  if (objects) {
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].source.pattern !== null) {
        patterns.push(objects[i]);
      }
    }
  }
  const indexOfLastPost = currentPage * objectsPerPage;
  const indexOfFirstPost = indexOfLastPost - objectsPerPage;
  if (patterns.length > 1) {
    currentObjects = patterns.slice(indexOfFirstPost, indexOfLastPost);
  }

  // change objects (pagination)
  const paginate = (pageNumber) => {
    setCurrentPage((prevPage) => pageNumber);
  };

  const handleSliderChange = (event) => {
    setImageWidth(event.target.value);
  };

  return (
    <div>
      <Header />
      <section>
        <div className="catalogue__results-information">
          {" "}
          <div className={"catalogue__results-slider"}>
            <input
              class={"slider"}
              type="range"
              step={"50"}
              min="200"
              max="500"
              id="widthRange"
              onChange={handleSliderChange}
            />
          </div>
          <Pagination
            objectsPerPage={objectsPerPage}
            totalObjects={patterns.length}
            paginate={paginate}
          />
        </div>
        <ImageMasonry
          objects={currentObjects}
          query={false}
          width={imageWidth}
        />
      </section>
    </div>
  );
}
