import { Header } from "../components/Header";
import { fetchAllObjects } from "../utils/hooks/filter/queries";
import { ImageMasonry } from "../components/Masonry";

export function Patterns() {
  let objects = fetchAllObjects();
  let patterns = [];

  if (objects) {
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].source.pattern !== null) {
        patterns.push(objects[i]);
      }
    }
    console.log(patterns);
  }

  console.log(objects);

  return (
    <div style={{ margin: "30px" }}>
      <Header />
      <ImageMasonry objects={patterns} query={false} />
    </div>
  );
}
