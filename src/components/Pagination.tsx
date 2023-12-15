import { useState } from "preact/hooks";
export function Pagination({ objectsPerPage, totalObjects, paginate }) {
  // paginate pagination
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);

  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalObjects / objectsPerPage); i++) {
    pageNumbers.push(i);
  }

  function moveLeft() {
    if (startIndex >= 5) {
      setStartIndex(startIndex - 5);
      setEndIndex(endIndex - 5);
    }
  }

  function moveRight() {
    setStartIndex(startIndex + 5);
    setEndIndex(endIndex + 5);
  }

  return (
    <nav>
      <ul className={"pagination"}>
        <li key={"previous"}>
          <a href="#" onClick={() => moveLeft()}>
            {" "}
            prev{" "}
          </a>
        </li>
        {pageNumbers.slice(startIndex, endIndex).map((page) => {
          return (
            <li key={page} className="">
              <a onClick={() => paginate(page)} href="#">
                {page}
              </a>
            </li>
          );
        })}
        <li key={"next"}>
          <a href="#" onClick={() => moveRight()}>
            {" "}
            next{" "}
          </a>{" "}
        </li>
      </ul>
    </nav>
  );
}
