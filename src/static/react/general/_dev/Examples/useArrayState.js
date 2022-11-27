import React from "react";

import { useArrayState } from "@static/react";

function UseArrayStateExample() {
  const numbers = useArrayState(NORMAL);

  function allFours() {
    numbers.wholeArray.replace((prevArray) => prevArray.map(() => "four"));
  }

  function restore() {
    numbers.wholeArray.replace(NORMAL);
  }

  function addFour() {
    numbers.perItem.push("four");
  }

  function remove4th() {
    if (numbers.get.length >= 4) numbers.perItem.remove(3);
  }

  return (
    <div className="mt-4 text-center">
      <p className="text-xl">Numbers: {numbers.get.join(", ")}</p>

      <button
        className="border-2 border-yellow-500 py-1 px-2 rounded-md text-lg m-8 text-yellow-800"
        onClick={allFours}
      >
        All fours
      </button>
      <button
        className="border-2 border-yellow-500 py-1 px-2 rounded-md text-lg m-8 text-yellow-800"
        onClick={restore}
      >
        Back to normal
      </button>
      <button
        className="border-2 border-yellow-500 py-1 px-2 rounded-md text-lg m-8 text-yellow-800"
        onClick={addFour}
      >
        Add a four
      </button>
      <button
        className="border-2 border-yellow-500 py-1 px-2 rounded-md text-lg m-8 text-yellow-800"
        onClick={remove4th}
      >
        Remove the fourth.
      </button>
    </div>
  );
}

const NORMAL = ["one", "two", "three", "four", "five"];

//Try all of this with a regular useState.

export default UseArrayStateExample;
