import React from "react";

import { mergeStyles } from "@static/tailwind";

/* Objective:

mergeStyles(
  "text-xl text-strong py-4 text-blue-500 bg-red-300 transform -translate-x-6 sm:text-blue-800 mt-4",
  "text-2xl p-4 bg-red-200 translate-x-0 text-green-800 mx-auto",
  "bg-gray-500 text-lg text-gray-700"
) 
=> "text-lg text-strong py-4 text-gray-700 bg-gray-500 transform sm:text-blue-800 translate-x-0 mt-4 p-4 mx-auto"

*/

function Example() {
  const styles = React.useMemo(() => {
    const result = mergeStyles(
      "text-xl text-strong py-4 text-blue-500 bg-red-300 transform -translate-x-6 sm:text-blue-800 mt-4",
      "text-2xl p-4 bg-red-200 translate-x-0 text-green-800 mx-auto",
      "bg-gray-500 text-lg text-gray-700"
    );

    console.log(result);

    return result;
  });

  return (
    <div className="mt-8 text-center px-8 md:px-32 lg:px-64 xl:px-96">
      <p className={styles}>mergeStyles example</p>
    </div>
  );
}

export default Example;
