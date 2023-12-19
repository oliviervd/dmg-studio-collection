import { Header } from "../components/Header";
import { useEffect, useState, useRef } from "preact/hooks";
import { fetchAllObjects, wildCard } from "../utils/hooks/filter/queries";
import { ImageMasonry } from "../components/Masonry";
import { Pagination } from "../components/Pagination";
import { checkIfKoepel } from "../utils/hooks/filter/queries";

export function Catalogue() {
  // limit and paginatio

  let currentObjects = [];
  let _results = [];
  let _objects = fetchAllObjects();
  const ref = useRef(null);

  const [imageWidth, setImageWidth] = useState(200);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [objectsPerPage, setObjectsPerPage] = useState(50);
  const [parentsOnly, setParentsOnly] = useState(true);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let searchParam = urlParams.get("search");

  if (_objects && _objects.length > 1) {
    console.log(_objects);
    if (searchParam != "none") {
      _results = wildCard(searchParam, _objects, 0.3);
    } else {
      _results = wildCard(searchParam, _objects, 1.0);
    }
    if (_results.length < objectsPerPage) {
      setObjectsPerPage(_results.length);
    }
  }

  // check if koepelrecord only
  if (parentsOnly) {
    let _parents = [];
    for (let i = 0; i < _results.length; i++) {
      let on = _results[i].item.source.objectNumber;
      if (checkIfKoepel(on)[0]) {
        console.log(checkIfKoepel(on));
        _parents.push(_results[i]);
      }
    }
    _results = _parents;
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
  };

  const handleSliderChange = (event) => {
    setImageWidth(event.target.value);
  };

  const handleScroll = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
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
            <div className={"toggle_switch"}>
              <input
                type="checkbox"
                onChange={() => setParentsOnly(!parentsOnly)}
              />
              <span class="slider round"></span>
            </div>
            <Pagination
              objectsPerPage={objectsPerPage}
              totalObjects={_results.length}
              paginate={paginate}
            />
          </div>
          <ImageMasonry
            objects={currentObjects}
            query={true}
            width={imageWidth}
            parentsOnly={parentsOnly}
          />
        </section>
      )}
      {loading && <div className="catalogue__loading">loading..</div>}
    </div>
  );
}
