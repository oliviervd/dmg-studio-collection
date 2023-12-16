import Masonry from "react-masonry-component";

export function ImageMasonry({ objects, loading, query }) {
  // masonry options
  const masonryOptions = {
    gutter: 20,
    disableImagesLoaded: true,
  };

  const styles = {
    margin: "10px 0", // Adds 10px of space on the top and bottom of each element
  };

  return (
    <Masonry
      className="catalogue__gallery"
      options={masonryOptions}
      disableImagesLoaded={false}
    >
      {objects.map((o, index) => (
        <div style={styles}>
          {query && (
            <a href={`/object/${o.item.source.objectNumber}`}>
              {o.item.source.iiif_image_uris[0] && (
                <img
                  src={o.item.source.iiif_image_uris[0].replace(
                    "/full/0/default.jpg",
                    "/500,/0/default.jpg",
                  )}
                  alt={`photograph of ${o.item.title} from the collection of Design Museum Gent`}
                />
              )}
            </a>
          )}
          {!query && (
            <a href={`/object/${o.source.objectNumber}`}>
              {o.source.pattern && (
                <img
                  src={o.source.pattern.replace(
                    "/full/0/default.jpg",
                    "/500,/0/default.jpg",
                  )}
                  alt={`photograph of from the collection of Design Museum Gent`}
                />
              )}
            </a>
          )}
        </div>
      ))}
    </Masonry>
  );
}
