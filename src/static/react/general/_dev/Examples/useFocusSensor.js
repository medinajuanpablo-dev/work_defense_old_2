import React from "react";

import { useFocusSensor } from "@static/react";

function UseFocusSensorExample() {
  const ref = React.useRef();
  const focus = useFocusSensor(ref, { unfocusOnEscape: true });

  return (
    <div className="text-center">
      <div
        ref={ref}
        className="relative text-light text-gray-700 py-2 px-4 w-10/12 m-auto mt-8 z-10"
      >
        <p>I'm using the same 'focused' state for the button and the focus.</p>
        <div
          className={`absolute top-0 left-0 w-full h-full bg-gray-500 z-50 translate-y-0 transition duration-500 || ${
            focus.focused ? "-translate-y-30" : ""
          }`}
        />
      </div>

      <button
        disabled={focus.focused}
        onClick={() => focus.setFocused(true)}
        className="mt-8 border-1 border-indigo-700 text-gray-700 hover:bg-indigo-700 hover:text-gray-100 px-8 py-2 text-lg rounded-md "
      >
        {focus.focused ? "Hide" : "Show"}
      </button>
    </div>
  );
}

export default UseFocusSensorExample;
