import React from "react";

import { ValidityNotification } from "@common/index";

function CuteCheckboxExample() {
  const [coffeeGood, setCoffeeGood] = React.useState(true);

  return (
    <>
      <div className="flex justify-center mt-16 px-8 md:px-32 lg:px-64 xl:px-96">
        <ValidityNotification
          type={coffeeGood ? "fine" : "error"}
          position={coffeeGood ? "left" : "right"}
          title={coffeeGood ? "Coffee safe" : "Coffee wasted"}
          body={
            coffeeGood
              ? "The coffee is hot and tasty"
              : "The fuck is wrong with you bro"
          }
          size="larger"
        />
      </div>
      <button
        className="ml-4 mt-8 border-gray-500 border-1 px-4 py-2"
        onClick={() => setCoffeeGood(!coffeeGood)}
      >
        {coffeeGood ? "Drop the Coffee" : "Brew new coffeee"}
      </button>
    </>
  );
}

export default CuteCheckboxExample;
