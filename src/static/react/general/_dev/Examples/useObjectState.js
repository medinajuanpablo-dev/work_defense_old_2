import React from "react";

import { useObjectState } from "@static/react";

function UseObjectStateExample() {
  //By default, it's "Hello, World".
  const objectState = useObjectState({ ...DEFAULT });

  //The button updates the "world" property only, and merges to say "Hello, Jupiter".
  //With a regular useState, it would display just ", Jupiter". Such behavior can be done here too by using "replace" instead of "merge".
  const handleButton = () => objectState.merge({ world: ", Jupiter" });

  //Does the same but in a longer way. With a regular useState, this doesn't react.
  const handleButton2 = () =>
    objectState.rawSet((prev) => {
      prev.world = ", Jupiter";
      return prev;
    });

  return (
    <div className="mt-4">
      <p className="text-2xl text-blue-600">
        {objectState.get.hello}
        {objectState.get.world}
      </p>

      <button
        className="border-2 border-yellow-500 py-2 px-4 rounded-md text-xl mt-8 mr-4 text-yellow-800"
        onClick={handleButton2}
      >
        Hello Jupiter?
      </button>

      <button
        onClick={() => objectState.replace(DEFAULT)}
        className="border-2 border-yellow-500 py-2 px-4 rounded-md text-xl mt-8 mr-4 text-yellow-800"
      >
        Hello World
      </button>
    </div>
  );
}

const DEFAULT = { hello: "Hello", world: ", World" };

//Try all of this with a regular useState.

export default UseObjectStateExample;
