import { Header } from "../components/Header";
import { fetchAllObjects } from "../utils/hooks/filter/queries";
import { ImageMasonry } from "../components/Masonry";
import { shuffle } from "../utils/utils";
import { useState } from "preact/hooks";
import { Pagination } from "../components/Pagination";

export function Patterns() {
  let currentObjects = [];
  let objects = fetchAllObjects();
  let patterns = [];
  const [currentPage, setCurrentPage] = useState(1);
  const [objectsPerPage, setObjectsPerPage] = useState(30);

  if (objects) {
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].source.pattern !== null) {
        patterns.push(objects[i]);
      }
      patterns = shuffle(patterns);
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

  return (
    <div>
      <Header />
      <Pagination
        objectsPerPage={objectsPerPage}
        totalObjects={patterns.length}
        paginate={paginate}
      />
      <ImageMasonry objects={currentObjects} query={false} />
    </div>
  );
}
