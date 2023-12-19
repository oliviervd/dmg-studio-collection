import { Header } from "../components/Header";
import {
  fetchAllObjects,
  fetchObjectWithID,
  checkIfKoepel,
} from "../utils/hooks/filter/queries";
import { useState, useRef } from "preact/hooks";

export function ObjectPage() {
  const [imageModal, setImageModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  let _object;
  let _objects = fetchAllObjects();
  const ref = useRef(null);

  let _id = window.location.href.split("/")[4];
  if (_objects) {
    _object = fetchObjectWithID(_objects, _id);
    console.log(_object);
  }

  function openImageModal(src) {
    setImageModal(true); // open image modal
    setCurrentImage(src); // set current image;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const handleScroll = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={"container"}>
      <Header />

      {window.history && (
        <div
          className={"objectpage__back-button"}
          onClick={() => window.history.back()}
        >
          <a>← back to search results</a>
        </div>
      )}
      {_object && (
        <section className={"objectpage__main-container"}>
          <div className={"objectpage__hero"}>
            <img
              onClick={() => openImageModal(_object.source.iiif_image_uris[0])}
              src={_object.source.iiif_image_uris[0].replace(
                "/full/0/default.jpg",
                "/1000,/0/default.jpg",
              )}
            />
            <div className={"objectpage__hero-title"}>
              <p className={"id"}>{_id}</p>
              <h1>{_object.title}</h1>
            </div>
            {_object.source.iiif_image_uris[1] && (
              <img
                onClick={() =>
                  openImageModal(_object.source.iiif_image_uris[1])
                }
                className="image__float-left-1"
                src={_object.source.iiif_image_uris[1].replace(
                  "/full/0/default.jpg",
                  "/1000,/0/default.jpg",
                )}
              />
            )}
            {_object.source.iiif_image_uris[2] && (
              <img
                onClick={() =>
                  openImageModal(_object.source.iiif_image_uris[2])
                }
                className="image__float-right-1"
                src={_object.source.iiif_image_uris[2].replace(
                  "/full/0/default.jpg",
                  "/1000,/0/default.jpg",
                )}
              />
            )}
            {/*
            {_object.source.iiif_image_uris[3] && (
              <img
                className="image__float-left-2"
                src={_object.source.iiif_image_uris[3]}
              />
            )}
            */}
          </div>
          <div>
            <p className={"objectpage__description"}>{_object.description}</p>
          </div>
          <div
            id="image-gallery__modal"
            className="objectpage__image-modal"
            style={{ display: imageModal ? "block" : "none" }}
          >
            {" "}
            <div className="image-gallery__modal-box">
              <img id="img01" src={currentImage} />
            </div>
            <div
              id="close"
              className="image-gallery__modal-close"
              onClick={() => {
                setImageModal(false);
                document
                  .getElementById("image-gallery")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              X
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
