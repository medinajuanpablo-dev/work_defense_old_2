import React from "react";
import { mapValues } from "lodash";
import {
  BsArrowRight,
  BsCheck2,
  BsExclamationTriangle,
  BsExclamationTriangleFill,
  BsExclamationCircleFill,
} from "react-icons/bs";
import { RiEditCircleFill } from "react-icons/ri";
import { GiBroadsword, GiChestArmor } from "react-icons/gi";

import { LineTitle, CuteActionNotice, SummaryRow } from "@common/index";
import { useGeneralStateReader } from "@state/hooks";
import { useIndicatedStyles } from "@static/tailwind";
import { sumProperties } from "@static/functions";

import { INTERFACE, ITK, interfaceOps } from "@static/contexts/interface";
import { EQK, EQUIPMENT, equipmentOps } from "@static/contexts/equipment";
import { BDK } from "@static/contexts/buildings";

function CapacitySection() {
  const gs = useGeneralStateReader(
    "equipment",
    `buildings.${BDK.NAMES.ARSENAL}`
  );

  const status = React.useMemo(() => {
    const currently = mapValues(EQUIPMENT.TYPES_NAMES, (_, eqKey) =>
      sumProperties(gs.equipment.stored[eqKey])
    );

    const afterOrdersTotal = sumProperties(
      mapValues(
        EQUIPMENT.TYPES_NAMES,
        (_, eqKey) =>
          sumProperties(gs.equipment.orders[eqKey]) + currently[eqKey]
      )
    );

    const capacity = equipmentOps.storageCapacity(
      gs.buildings[BDK.NAMES.ARSENAL].level
    );

    const capacityStatus = interfaceOps.capacityStatus(
      sumProperties(currently),
      capacity
    );

    //Determine the capacity status after orders are finished.
    const afterCapacityStatus = interfaceOps.afterCapacityStatus(
      afterOrdersTotal,
      capacity
    );

    return {
      currently,
      afterOrdersTotal,
      capacity,
      capacityStatus,
      afterCapacityStatus,
    };
  }, [gs]);

  const notif = FINISHED_ORDERS_NOTIFICATIONS[status.afterCapacityStatus];

  return (
    <>
      <LineTitle margin="t-large">Capacity</LineTitle>

      <Total {...status} />

      {status.afterOrdersTotal > 0 && (
        <SummaryRow
          customDirSty={STYLES.afterFinished}
          Icon={RiEditCircleFill}
          color={notif.color}
          label="finishing orders"
          size="smaller"
          amount={`${status.afterOrdersTotal} / ${status.capacity}`}
          text="After <L> of weapons and armor (next tempo): <A>"
          notificationsConfig={[notif]}
        />
      )}
    </>
  );
}

const STYLES = {
  afterFinished: { ct: "mt-6" },
};

function Total({ capacity, capacityStatus, currently }) {
  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(INTERFACE.CAPACITY_INDICATORS, TOTAL_DIRSTY);

  const styles = getActiveStyles({ status: capacityStatus });

  const { Icon, message } = CAPACITY_NOTIFICATIONS[capacityStatus];

  return (
    <div className={styles.ct}>
      <div className={styles.eqAmount}>
        {currently[EQK.TYPES.WEAPON]}{" "}
        <GiBroadsword className={styles.eqAmountIcon} />
      </div>
      +
      <div className={styles.eqAmount}>
        {currently[EQK.TYPES.ARMOR]}{" "}
        <GiChestArmor className={styles.eqAmountIcon} />
      </div>
      <BsArrowRight className={styles.arrow} />
      <p className={styles.result}>
        {sumProperties(currently)} / {capacity}
      </p>
      <CuteActionNotice
        customDirSty={WARNING_DIRSTY}
        extraIndicators={INTERFACE.CAPACITY_INDICATORS}
        extraIndParams={{ status: capacityStatus }}
        ButtonIcon={Icon}
        body={message}
      />
    </div>
  );
}

const TOTAL_DIRSTY = {
  ct: "mt-4 border-emerald-500 border-1 border-dotted flex items-center text-slate-700 text-light text-lg justify-center w-10/12 mx-auto py-2 || nmx<border-yellow-600> amx<border-orange-600> mx<border-red-600> ",
  eqAmount: "flex items-center justify-center mx-2",
  eqAmountIcon: "ml-1 mb-2px",
  arrow:
    "ml-2 text-emerald-600 text-xl || nmx<text-yellow-600> amx<text-orange-600> mx<text-red-600>",
  result:
    "ml-4 text-lg text-emerald-600 || nmx<text-yellow-600> amx<text-orange-600> mx<text-red-600>",
};

const WARNING_DIRSTY = {
  buttonCt:
    "text-emerald-500 ml-3 mb-2px || nmx<text-yellow-600> amx<text-orange-600> mx<text-red-600>",
  noticeCt:
    "border-emerald-500 || nmx<border-yellow-600> amx<border-orange-600> mx<border-red-600>",
  noticeTumor:
    "border-emerald-500 ||  nmx<border-yellow-600> amx<border-orange-600> mx<border-red-600>",
};

const CAPACITY_NOTIFICATIONS = {
  [ITK.CAPACITY_STATUS.FINE]: {
    Icon: BsCheck2,
    message: "We have no storage problems right now.",
  },
  [ITK.CAPACITY_STATUS.NEAR_MAX]: {
    Icon: BsExclamationTriangle,
    message: "We are getting close to our equipment storage limit.",
  },
  [ITK.CAPACITY_STATUS.ALMOST_MAXED]: {
    Icon: BsExclamationTriangleFill,
    message: "We are at almost our max arsenal capacity!",
  },
  [ITK.CAPACITY_STATUS.MAXED]: {
    Icon: BsExclamationCircleFill,
    message: "We can't store any more equipment!",
  },
};

const FINISHED_ORDERS_NOTIFICATIONS = {
  [ITK.AFTER_CAPACITY_STATUS.SAFELY_STORABLE]: {
    color: "green",
    ButtonIcon: BsCheck2,
    body: "We can store all the finished orders with a safe margin.",
    type: ITK.NOTIFICATION_TYPES.FINE,
  },
  [ITK.AFTER_CAPACITY_STATUS.BARELY_STORABLE]: {
    color: "yellow",
    ButtonIcon: BsExclamationTriangle,
    body: "We can store all the finished orders, but we'll be full or almost full.",
    type: ITK.NOTIFICATION_TYPES.WARNING,
  },
  [ITK.AFTER_CAPACITY_STATUS.MOST_STORABLE]: {
    color: "orange",
    ButtonIcon: BsExclamationTriangleFill,
    body: "We can't store some of the finished orders! The lowest rank equipment will be automatically discarded in the next Production Stage.",
    type: ITK.NOTIFICATION_TYPES.DANGER,
  },
  [ITK.AFTER_CAPACITY_STATUS.NOT_STORABLE]: {
    color: "red",
    ButtonIcon: BsExclamationCircleFill,
    body: "We won't be able to store a big portion of the finished orders! The lowest rank equipment will be automatically discarded in the next Production Stage.",
    type: ITK.NOTIFICATION_TYPES.EMERGENCY,
  },
};

export default CapacitySection;
