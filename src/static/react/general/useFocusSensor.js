import React from "react";

import { checkOptionalValues } from "@static/functions";

/**
 * Hook to detect focus on an element that doesn't natively support focus.
 *
 * ### **Use this as state too**:
 * If you must control some "opened" state with the focus, you may as well just use the
 * `focused` state provided by this hook as the "opened" state itself. Check the example.
 * @param {React.MutableRefObject} elementRef The React's Ref of the element which focus shall be detected.
 * @param {Object} config Behavior configuration.
 * @param {boolean} config.focusedByDefault If `true`, the element is focused by default.
 * @param {boolean} config.unfocusOnEscape If `true`, the element will unfocus on Escape key.
 */
function useFocusSensor(elementRef, config = {}) {
  checkOptionalValues([
    { config, onlyFields: ["focusedByDefault", "unfocusOnEscape"] },
  ]);
  const { focusedByDefault, unfocusOnEscape } = config;
  checkOptionalValues([
    [{ focusedByDefault, unfocusOnEscape }, "boolean", "boolean"],
  ]);

  const [focused, setFocused] = React.useState(focusedByDefault);

  React.useEffect(() => {
    const onMouseDown = (e) => {
      const isFocused = elementRef.current.contains(e.target);

      setFocused((wasFocused) => {
        if (isFocused !== wasFocused) return isFocused;
        return wasFocused;
      });
    };
    window.addEventListener("mousedown", onMouseDown);

    if (unfocusOnEscape) {
      var onKeyDown = (e) => e.key === "Escape" && setFocused(false);
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      if (unfocusOnEscape) window.removeEventListener("keydown", onKeyDown);
    };
  }, [elementRef.current]);

  return { focused, setFocused };
}

export default useFocusSensor;
