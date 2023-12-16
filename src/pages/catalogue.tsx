import { Header } from "../components/Header";
import { useEffect, useState } from "preact/hooks";
import { fetchAllObjects, wildCard } from "../utils/hooks/filter/queries";
import { ImageMasonry } from "../components/Masonry";
import { Pagination } from "../components/Pagination";

export function Catalogue() {
  // limit and paginatio

  let currentObjects = [];
  let _results = [];
  let _objects = fetchAllObjects();

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [objectsPerPage, setObjectsPerPage] = useState(30);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let searchParam = urlParams.get("search");

  if (_objects && _objects.length > 1) {
    console.log(_objects);
    if (searchParam != "none") {
      _results = wildCard(searchParam, _objects, 0.3);
    } else {
      _results = wildCard(searchParam, _objects, 1.0);
      console.log(_results);
    }

    if (_results.length < objectsPerPage) {
      setObjectsPerPage(_results.length);
    }
  }

  const indexOfLastPost = currentPage * objectsPerPage;
  const indexOfFirstPost = indexOfLastPost - objectsPerPage;
  if (_results.length > 1) {
    currentObjects = _results.slice(indexOfFirstPost, indexOfLastPost);
    setLoading(false);
  }

  // change objects (pagination)
  const paginate = (pageNumber) => {
    setCurrentPage((prevPage) => pageNumber);
    /*
    const existingParams = new URLSearchParams(window.location.search);
    window.history.pushState(
      {},
      "",
      `?${existingParams.toString()}?page=${pageNumber}`,
    );
    */
  };

  return (
    <div className={"catalogue__container"}>
      <Header />
      {!loading && (
        <section>
          <div className="catalogue__results-information">
            <p>
              showing {objectsPerPage} of {_results.length} search results for{" "}
              <span style={{ color: "pink", fontWeight: 900 }}>
                {searchParam}
              </span>
            </p>
            <Pagination
              objectsPerPage={objectsPerPage}
              totalObjects={_results.length}
              paginate={paginate}
            />
          </div>
          <ImageMasonry objects={currentObjects} query={true} />
        </section>
      )}
      {loading && <div className="catalogue__loading">loading..</div>}
    </div>
  );
}
