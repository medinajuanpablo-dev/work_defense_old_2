import React from "react";
import { chunk as chunkify } from "lodash";

import { useArrayState } from "@static/react";
import { checkOptionalValues } from "@static/functions";

//For the sake of understanding the comments here, render == mount.
//I should've named it all "mount" but got a bit outta the way; just follow my lead.

/** Asynchronously mounts all children elements after a specified amount of miliseconds, or asynchronously mounts
 * a specific secuence of elements separated by the specified amount of miliseconds each.
 *
 * @param {Object} props
 * @param {Array<JSX.Element>} props.renderSecuence A list of elements to render sequentially. Incompatible with `children`.
 * @param {number} props.elementsPerChunk If specifed, the `renderSecuence` will be divided into chunks of this length. Tweak this along with `mountDelay` until the mounting is fluent and not abrupt.
 * @param {(indexOfElementRendering: number) => void} props.onMount Callback to execute whenever an element is mounted. Receives the index of the element currently being mounted.
 * @param {() => void} props.onFinish Callback to execute when all elements have been successfully mounted.
 * @param {number} props.mountDelay Amount of _miliseconds_ between each async mount. The heavier each element or chunk, the higher this should be. Tweak this along with `elementsPerChunk` until the mounting is fluent and not abrupt. Is `10` by default.
 */
//prettier-ignore
function AsyncMounter({ children, renderSecuence: rawRenderSecuence, elementsPerChunk, onMount, onFinish, mountDelay = DEFAULT_MOUNT_DELAY }) {
  const renderSecuence = React.useMemo(() => {
    checkOptionalValues([
      { rawRenderSecuence, type: "array", itemsType: "object" },
      [{ elementsPerChunk, mountDelay }, "n", "n"]
    ]);

    if (!children && !rawRenderSecuence)
      throw Error("No children nor secuence was passed to AsyncMounter. Either pass it something to render or remove it.");
    if ((children && rawRenderSecuence) || (children && elementsPerChunk))
      throw Error("In AsyncMounter, children is incompatible with secuence elements and it's related props. Use one or another.");
    if (elementsPerChunk <= 1)
      throw Error(`The specified 'elementsPerChunk' can't be negative, zero nor one as it doesn't make any sense.`);
    
    if (children) return [children];
  
    else if (elementsPerChunk)
      return chunkify(rawRenderSecuence, elementsPerChunk).map((aChunk, index) =>
        <React.Fragment key={index}>{aChunk}</React.Fragment>
      );
    
    else return rawRenderSecuence;

  }, [children, rawRenderSecuence, elementsPerChunk])

  const mountedElements = useArrayState(() => renderSecuence.map(() => false)); //All elements start unmounted.

  const mountElement = React.useCallback((index) => {
    mountedElements.perItem.set(index, true);
    if (onMount) onMount(index);
    
    if (onFinish && index == renderSecuence.length - 1) onFinish(); //Last element is mounted, all of them are. Finish.
  }, [onMount, onFinish])

  React.useEffect(() => {
    const timeOuts = renderSecuence.map((el, index) =>
      setTimeout(() => mountElement(index), mountDelay * (1 + index)) //Many timeouts needed separated by the same amount of ms.
    ); 
    return () => timeOuts.forEach(to => clearTimeout(to)); //Cleanup
  }, []);

  //Memoized rendering secuence to use after initial mount process.
  const renderingElements = React.useMemo(
    () => renderSecuence.filter((el, index) => mountedElements.get[index]),
    [mountedElements.get]
  ); 

  return renderingElements.length > 0 ? renderingElements : null; //If no elements mounted yet, render null;
}

const DEFAULT_MOUNT_DELAY = 10; //The amount of miliseconds for the children to mount since the AsyncMounter was mounted itself.

export default AsyncMounter;
