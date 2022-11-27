import { BREAKPOINTS as BPK } from "@static/values/keys";

import { useBreakpoint } from "@static/react";

function UseBreakpointExample() {
  const currentBP = useBreakpoint();

  return (
    <>
      <p className="text-center text-3xl text-gray-700 border-2 rounded-xl border-green-600 mt-8 mx-2">
        I am{" "}
        {currentBP.isWiderThan(BPK.VERTICAL_TABLET) ? (
          <span className="text-red-600">not</span>
        ) : (
          ""
        )}{" "}
        mobile
      </p>
      <p className="text-center text-xl text-blue-500 mt-8">{currentBP.name}</p>{" "}
    </>
  );
}

export default UseBreakpointExample;
