import React from "react";
import { mapValues } from "lodash";

import { CuteSlidingList, useSlidingListState } from "@common/index";
import { sumItems } from "@static/functions";

const BILLS = [10, 20, 50, 100, 200, 500, 1000];

function CuteSlidingListExample() {
  const bills = useSlidingListState({});

  const listItems = mapValues(bills.get, (b, key) => (
    <button
      onClick={() => bills.remove(key)}
      className="mx-1 my-1 w-24 text-center py-1 border-1 border-green-500 text-green-500 text-lg hover:bg-green-500 hover:text-slate-100"
    >
      $ {b}
    </button>
  ));

  return (
    <>
      <div className="text-center mt-16">
        <div className="flex flex-col md:flex-row justify-around">
          {BILLS.map((b) => (
            <button
              key={b}
              onClick={() => bills.add(b)}
              className="mt-8 mb-8 mx-1 px-4 py-1 rounded-md border-1 text-slate-700 border-orange-500 hover:bg-orange-500 hover:text-gray-100"
            >
              Add ${b} bill
            </button>
          ))}
        </div>
      </div>

      <div className="relative px-8 pt-6 pb-4 border-1 border-orange-700 rounded-lg">
        <p className="text-lg absolute -top-3 left-4 text-orange-700 bg-white px-4">
          Wallet
        </p>
        <CuteSlidingList
          customDirSty={{ ct: "h-12 flex items-center" }}
          offset={110}
          items={listItems}
        />
        <div className="flex mt-2 justify-between items-center">
          <p className="text-lg text-light text-slate-700">
            Total: ${" "}
            {sumItems(Object.values(bills.get)).toLocaleString("es-AR", {
              style: "decimal",
              currency: "ARS",
              maximumFractionDigits: 2,
            })}
          </p>
          <button
            onClick={() => bills.replace({})}
            className="border-1 px-4 py-2 border-slate-700 text-slate-700 rounded-md hover:bg-slate-700 hover:text-slate-100"
          >
            Empty wallet
          </button>
        </div>
      </div>
    </>
  );
}

export default CuteSlidingListExample;
