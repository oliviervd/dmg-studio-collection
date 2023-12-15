import { Header } from "../components/Header";
import {
  fetchAllObjects,
  fetchObjectWithID,
} from "../utils/hooks/filter/queries";

export function ObjectPage() {
  let _object;
  let _objects = fetchAllObjects();
  console.log(_objects);
  let _id = window.location.href.split("/")[4];
  if (_objects) {
    _object = fetchObjectWithID(_objects, _id);
    console.log(_object);
  }

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
            <img src={_object.source.iiif_image_uris[0]} />
            <div className={"objectpage__hero-title"}>
              <p className={"id"}>{_id}</p>
              <h1>{_object.title}</h1>
            </div>
            {_object.source.iiif_image_uris[1] && (
              <img
                className="image__float-left-1"
                src={_object.source.iiif_image_uris[1]}
              />
            )}
            {_object.source.iiif_image_uris[2] && (
              <img
                className="image__float-right-1"
                src={_object.source.iiif_image_uris[2]}
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
        </section>
      )}
    </div>
  );
}
