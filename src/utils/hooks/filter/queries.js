import Fuse from "fuse.js";
import useObjectsQuery from "../useObjectQuery";

export function fetchAllObjects() {
  try {
    return useObjectsQuery().data;
  } catch (e) {
    console.error(e);
  }
}

export function wildCard(prompt, data, threshold) {
  const options = {
    includeScore: true,
    threshold: threshold,
    shouldSort: true,
    isCaseSensitive: false,
    keys: [
      {
        name: "title",
        weight: 1.0,
      },
      {
        name: "description",
        weight: 0.7,
      },
    ],
  };

  if (data.length > 1) {
    const fuse = new Fuse(data, options);
    const result = fuse.search(prompt);
    console.log(result); // Add this line
    return result;
  }
}

export function fetchObjectWithID(data, ID) {
  //function that fetches object in cached data based on a given objectNumber
  console.log(ID);
  return data.find((obj) => obj.source.objectNumber === ID);
}

export function fetchTitle(object) {
  return object["LDES_raw"]["object"][
    "http://www.cidoc-crm.org/cidoc-crm/P102_has_title"
  ]["@value"];
}

export function fetchDescription(object) {
  return object["LDES_raw"]["object"][
    "http://www.cidoc-crm.org/cidoc-crm/P3_has_note"
  ]["@value"];
}
