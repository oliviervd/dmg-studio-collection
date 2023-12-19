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
    return result;
  }
}

export function fetchObjectWithID(data, ID) {
  //function that fetches object in cached data based on a given objectNumber
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

export function checkIfKoepel(objectNumber) {
  let tree;

  // check if there is an underscore
  if (objectNumber.split("_")) {
    // check if there is a hyphen after the split
    let _split1 = objectNumber.split("_")[1];

    if (_split1 && _split1.split("-")) {
      let _split2 = _split1.split("-")[0];
      // check if 0, 00 or 000
      if (
        _split2.toString() === "0" ||
        _split2.toString() === "00" ||
        _split2.toString() === "000"
      ) {
        let _children = fetchTree(objectNumber, "down");
        return [true, _children, objectNumber];
        // return array with child records?
      } else {
        let _parent = fetchTree(objectNumber, "up");
        return [false, _parent, objectNumber];
      }
    } else {
      return [true, "", objectNumber];
    }
  } else {
    return [true, "", objectNumber];
  }

  // check if there is a line after the underscore
}

export function fetchTree(objectNumber, direction) {
  let _base = objectNumber.split("_")[0];
  let _eval = objectNumber.split("_")[1];
  let _position = _eval.split("-")[0];
  let _total = _eval.split("-")[1];

  // if up (fetch parent)
  if (direction == "up") {
    // set _position to zero
    // check length - reconstruct parent record.
    let _parent = _base + "_" + "0".repeat(_position.length) + "-" + _total;
    return [_base, _position, _total, _parent];
  }

  // if down (fetch all children)
  if (direction == "down") {
    let _children = [];
    for (let i = 0; i < _total; i++) {
      let _child = _base + "_" + i + "-" + _total;
      _children.push(_child);
    }

    return [_base, _position, _total, _children];
  }
}
