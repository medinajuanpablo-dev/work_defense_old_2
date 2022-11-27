import { useBordersVisibility } from "@static/react";

function UseBreakpointExample() {
  const visible = useBordersVisibility();

  return (
    <>
      <p className="fixed w-full p-2 text-center bg-white">
        {visible.top
          ? "You are seeing the top! (of the entire page)"
          : visible.bottom
          ? "You are seeing the bottom! (of the entire page)"
          : "You are not seeing the top nor the bottom... (of the entire page)"}
      </p>
      <div className="h-screen w-full bg-gray-200" />
      <div className="h-screen w-full bg-gray-200" />
    </>
  );
}

export default UseBreakpointExample;
