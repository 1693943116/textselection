import { useState, Fragment } from "react";
import ActionPanel from "./components/ActionPanel";
import "./App.css";

const splitter = "";

// const text = `
//   Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, omnis eveniet quisquam iure, repellendus dicta eos consequatur id minima, reprehenderit tempore ipsa neque quidem quia unde. Corrupti doloremque molestias minima nesciunt eum. Cum quae tenetur est minima ut! Eveniet, iste asperiores delectus quam minus in blanditiis corrupti quas quasi neque officiis qui quidem sapiente. In sed, eligendi repudiandae soluta molestias beatae eum nisi quas ipsum, vel aperiam itaque tempore quis consequatur mollitia, natus placeat dolore obcaecati eaque quasi similique. Ducimus quisquam ut veritatis laudantium veniam, itaque eaque amet libero pariatur unde. Modi aliquam tenetur ipsam voluptatibus rem laborum mollitia assumenda?
// `;

const text = `
  《兰亭集序》，又称作《兰亭序》、《兰亭叙》、《兰亭帖》、《禊序》、《禊帖》、《临河序》、《兰亭宴集序》。书法家王羲之所作，有“天下第一行书”之称，是晋代书法成就的代表。《兰亭集序》共计324字，凡是重复的字都各不相同，其中20个“之”字，各具风韵，皆无雷同。王羲之酒醒之后，过几天又把原文重写了好多本，但终究没有在兰亭集会时所写的好。[1]
`;

function App() {
  const [content] = useState(
    text.split(splitter).filter((word) => word.length > 0)
  );
  const [startCursorIndex, setStartCursorIndex] = useState(0);
  const [endCursorIndex, setEndCursorIndex] = useState(content.length - 1);

  return (
    <>
      <div className="p-10">
        <h3>段落</h3>
        <hr className="my-2" />
        <p className="mb-2">
          {content.map((word, idx) => {
            if (idx === startCursorIndex) {
              return (
                <Fragment key={idx}>
                  <span className="border-r-4 border-r-red-500 pr-1">🙉</span>
                </Fragment>
              );
            }
            if (idx === endCursorIndex) {
              return (
                <Fragment key={idx}>
                  {word}{" "}
                  <span className="border-l-4 border-l-red-500 pl-1">🙈</span>
                </Fragment>
              );
            }
            return <Fragment key={idx}>{word} </Fragment>;
          })}
        </p>
        <h3>选中段落</h3> <hr className="my-2" />
        <p className="mb-2">
          {content.map((word, idx) => {
            if (idx <= startCursorIndex) return;
            if (idx > endCursorIndex) return;
            return <Fragment key={idx}>{word} </Fragment>;
          })}
        </p>
        <hr className="my-2" />
        {/* debug info */}
        <div className="border mb-2 p-2">
          <div>
            <span>Start Cursor Index: {startCursorIndex}</span>
          </div>
          <div>
            <span>End Cursor Index: {endCursorIndex}</span>
          </div>
          <div>
            <span>Word Count: {content.length}</span>
          </div>
          <div>
            <span>Range Count: {endCursorIndex - startCursorIndex + 1}</span>
          </div>
        </div>
        {/* action */}
        <ActionPanel
          onClick={(type, isAdd) => {
            if (type === "start") {
              setStartCursorIndex((prev) => (prev + 1) % content.length);
            }
            if (type === "end") {
              setEndCursorIndex(
                (prev) => (prev - 1 + content.length) % content.length
              );
            }
          }}
        />
      </div>
    </>
  );
}

export default App;
