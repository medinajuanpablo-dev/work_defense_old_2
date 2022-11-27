import React from "react";

import { useGeneralStateReader, useGeneralStateUpdator } from "@state/hooks";

import { MONEY_STATE } from "@static/values/keys";

function ReduxExample() {
  const updateGS = useGeneralStateUpdator("money", "lives");
  const gs = useGeneralStateReader("money", "lives");

  const isFrozen = gs.money.state === MONEY_STATE.FROZEN;
  const isWatched = gs.money.state === MONEY_STATE.WATCHED;

  return (
    <>
      <p className="title text-indigo-500 text-2xl text-center">
        Redux Example Page
      </p>
      <div className="px-16 text-center flex justify-around">
        <div className="flex-1">
          <div className="mt-12">
            <span
              //prettier-ignore
              className={
                "title px-8 py-3 border-gray-500 border-2 rounded-lg text-2xl text-gray-600 " +
                (isFrozen ? "border-blue-500" : isWatched ? "border-yellow-500" : "")
              }
            >
              Currency: ${gs.money.current}
            </span>
          </div>

          <div className="mt-12">
            <button
              onClick={() => !isFrozen && updateGS.money.deposit(1)}
              className="mr-2 px-6 py-2 border-1 rounded-lg bg-green-400 text-gray-100 text-xl title hover:bg-green-500"
            >
              Deposit $1
            </button>
            <button
              onClick={() =>
                !isFrozen && gs.money.current > 0 && updateGS.money.withdraw(1)
              }
              className="mr-2 px-6 py-2 border-1 rounded-lg bg-red-400 text-gray-100 text-xl title hover:bg-red-500"
            >
              Withdraw $1
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={() => updateGS.money.emptyMoney()}
              className="mr-2 px-6 py-2 border-1 rounded-lg bg-gray-500 text-gray-100 text-xl title hover:bg-gray-400"
            >
              Empty
            </button>
            <button
              onClick={() =>
                isFrozen ? updateGS.money.activate() : updateGS.money.freeze()
              }
              className="mr-2 px-6 py-2 border-1 rounded-lg bg-blue-500 text-gray-100 text-xl title hover:bg-blue-400"
            >
              {isFrozen ? "Unfreeze" : "Freeze"}
            </button>
            <button
              onClick={() =>
                isWatched ? updateGS.money.activate() : updateGS.money.watch()
              }
              className="mr-2 px-6 py-2 border-1 rounded-lg bg-yellow-500 text-gray-100 text-xl title hover:bg-yellow-600"
            >
              {isWatched ? "Unwatch" : "Watch"}
            </button>
          </div>
        </div>

        <div className="flex-1">
          <div className="mt-12">
            <button
              onClick={() => updateGS.lives.die(1)}
              className="mr-2 px-6 py-2 border-1 rounded-lg bg-red-400 text-gray-100 text-xl title hover:bg-red-500"
            >
              Kill 1
            </button>
            <button
              onClick={() => updateGS.lives.live(1)}
              className="mr-2 px-6 py-2 border-1 rounded-lg bg-green-400 text-gray-100 text-xl title hover:bg-green-500"
            >
              Vivir 1
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReduxExample;
