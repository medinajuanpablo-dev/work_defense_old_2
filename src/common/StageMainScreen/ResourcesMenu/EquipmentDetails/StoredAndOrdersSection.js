import React from "react";
import { BsStarFill, BsTrashFill } from "react-icons/bs";
import { RiEditCircleFill } from "react-icons/ri";
import { GiSwordsEmblem, GiAnvil, GiShatteredSword } from "react-icons/gi";
import { FiLock, FiUnlock } from "react-icons/fi";

import { CuteButton, displayBottomNotif, LineTitle } from "@common/index";
import { useGeneralStateReader, useGeneralStateUpdator } from "@state/hooks";

import { EQUIPMENT } from "@static/contexts/equipment";

function StoredAndOrdersSection({ type }) {
  const gs = useGeneralStateReader("equipment");
  const updateGS = useGeneralStateUpdator("equipment");

  const [sortBy, setSortBy] = React.useState("rank-ascending");
  const [deletion, setDeletion] = React.useState(false);

  const name = EQUIPMENT.TYPES_NAMES[type];

  function changeSortBy(newCriteria) {
    const [criteria, order] = sortBy.split("-");

    //Same criteria, change order.
    if (criteria == newCriteria)
      setSortBy(
        `${criteria}-${order == "descending" ? "ascending" : "descending"}`
      );
    else setSortBy(`${criteria == "rank" ? "amount" : "rank"}-${order}`);
  }

  function onDelete(pile, rank) {
    if (pile == "stored") updateGS.equipment.removeFromStorage(type, rank, 1);
    else updateGS.equipment.cancelOrder(type, rank, 1);

    displayBottomNotif({
      Icon: pile == "stored" ? GiShatteredSword : GiAnvil,
      type: rank > 5 ? "critical-change" : "serious-change",
      body: `Discarded 1 ${
        pile == "stored" ? `stored ${name.SINGULAR}` : `${name.SINGULAR} order`
      } of Rank ${rank}`,
      onUndo: () => {
        if (pile == "stored") updateGS.equipment.addToStorage(type, rank, 1);
        else updateGS.equipment.addOrder(type, rank, 1);
      },
    });
  }

  const stored = getDisplayEquipmentSet(gs.equipment.stored[type], sortBy);
  const orders = getDisplayEquipmentSet(gs.equipment.orders[type], sortBy);

  return (
    <>
      <LineTitle margin="t-large">{`Stored/Ordered ${name.PLURAL}`}</LineTitle>

      <div className={STYLES.sortersRow}>
        <CuteButton
          onClick={() => changeSortBy("rank")}
          stylesBehavior={
            sortBy.includes("rank") ? "always-filled" : "outline-and-filled"
          }
          colorStrength="stronger"
          color="yellow"
          size="smaller"
          Icon={BsStarFill}
          customDirSty={STYLES.sortByRank}
        >
          Sort by Rank
        </CuteButton>
        <CuteButton
          stylesBehavior={
            sortBy.includes("amount") ? "always-filled" : "outline-and-filled"
          }
          onClick={() => changeSortBy("amount")}
          customDirSty={STYLES.sortByAmount}
          color="indigo"
          Icon={GiSwordsEmblem}
          size="smaller"
        >
          Sort by Amount
        </CuteButton>
      </div>

      <div className={STYLES.columnsCt}>
        <div className={STYLES.storedColumn}>
          <div className={STYLES.columnTitle}>
            <RiEditCircleFill className={STYLES.columnTitleIcon} />
            Stored
          </div>

          <div className={STYLES.list}>
            {stored.length == 0 ? (
              <p className={STYLES.emptyList}>No stored {name.PLURAL}</p>
            ) : (
              stored.map(({ rank, amount }) => (
                <Row
                  onDelete={() => onDelete("stored", rank)}
                  {...{ rank, amount, deletion }}
                  key={rank}
                />
              ))
            )}
          </div>
        </div>
        <div className={STYLES.ordersColumn}>
          <div className={STYLES.columnTitle}>
            <RiEditCircleFill className={STYLES.columnTitleIcon} />
            Orders
          </div>

          <div className={STYLES.list}>
            {orders.length == 0 ? (
              <p className={STYLES.emptyList}>No orders</p>
            ) : (
              orders.map(({ rank, amount }) => (
                <Row
                  onDelete={() => onDelete("ordered", rank)}
                  key={rank}
                  {...{ rank, amount, deletion }}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <CuteButton
        color="red"
        stylesBehavior={deletion ? "always-filled" : "outline-and-filled"}
        Icon={deletion ? FiUnlock : FiLock}
        customDirSty={STYLES.unlockDeletion}
        onClick={() => setDeletion((prev) => !prev)}
        transitionSpeed="instant"
        size="smaller"
      >
        {deletion ? "Deletion unlocked - Click to discard" : "Deletion locked"}
      </CuteButton>
    </>
  );
}

function Row({ rank, amount, deletion, onDelete }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <p
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={STYLES.row + (deletion ? STYLES.deletableRow : "")}
      onClick={() => deletion && onDelete()}
    >
      <span className={STYLES.rowRank}>Rank {rank}</span>
      {deletion && hovered && <BsTrashFill className={STYLES.rowDeleteIcon} />}
      <span className={STYLES.rowUnits}>
        {amount} {amount > 1 ? "units" : "unit"}
      </span>
    </p>
  );
}

const STYLES = {
  sortersRow: "flex justify-around mt-4",
  sortByRank: { button: "flex-1 sm<px-2'mr-2>", icon: "mb-2px" },
  sortByAmount: { button: "flex-1 sm<px-2'ml-2>" },

  columnsCt: "flex mt-6",
  columnTitle:
    "flex justify-center items-center text-light text-slate-600 text-xl",
  columnTitleIcon: "mr-2",

  storedColumn: "flex-1 text-center border-r-1 border-slate-400 pr-2",
  ordersColumn: "flex-1 text-center pl-2",

  emptyList: "mt-4 text-light text-slate-500",

  list: "mt-2",
  row: "flex justify-between items-center px-2 py-1 text-slate-400 text-light text-left border-b-1 border-slate-300",
  rowRank: "text-yellow-700",
  rowUnits: "text-indigo-500",
  deletableRow: " cursor-pointer hover:bg-slate-200",
  rowDeleteIcon: "text-red-400",

  unlockDeletion: { button: "mt-4" },
};

/**Turns an EquipmentSet into an array, filters the ranks with 0 units, and sorts it. */
function getDisplayEquipmentSet(set, sortBy) {
  const filteredSet = Object.keys(set)
    .map((rank) => ({ rank, amount: set[rank] }))
    .filter(({ amount }) => amount > 0);

  const [criteria, order] = sortBy.split("-");

  return filteredSet.sort((r1, r2) => {
    if (criteria == "rank")
      return order == "descending" ? r2.rank - r1.rank : r1.rank - r2.rank;
    else
      return order == "descending"
        ? r2.amount - r1.amount
        : r1.amount - r2.amount;
  });
}

export default StoredAndOrdersSection;
