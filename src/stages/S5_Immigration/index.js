import React from "react";
import {
  BsArrowRight,
  BsCheck2,
  BsExclamationTriangle,
  BsExclamationTriangleFill,
  BsExclamationCircleFill,
} from "react-icons/bs";
import { IoPeople } from "react-icons/io5";

import {
  StageMainScreen,
  CuteActionNotice,
  ContinueButton,
} from "@common/index";
import { useIndicatedStyles } from "@static/tailwind";
import { useGeneralStateReader, useGeneralStateUpdator } from "@state/hooks";

import { populationOps, PPK } from "@static/contexts/population";
import { BDK } from "@static/contexts/buildings";
import { MIK } from "@static/contexts/miscellaneous";
import { INTERFACE, interfaceOps, ITK } from "@static/contexts/interface";

const ACK = ITK.AFTER_CAPACITY_STATUS;

function ImmigrationStage() {
  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(INTERFACE.AFTER_CAPACITY_INDICATORS, DIRECTED_STYLES);
  const gs = useGeneralStateReader(
    "population",
    `buildings.${BDK.NAMES.IMMIGRATION_POST}`,
    `buildings.${BDK.NAMES.HOUSES}`
  );
  const updateGS = useGeneralStateUpdator("population", "miscellaneous");

  const status = React.useMemo(() => {
    //Calculate base values.
    const currentPopl = gs.population.count.total;

    const immigrants = populationOps.immigrants(
      gs.buildings[BDK.NAMES.IMMIGRATION_POST].level
    );
    const capacity = populationOps.housingCapacity(
      gs.buildings[BDK.NAMES.HOUSES].level
    );

    //Calculate and save the values as cv.
    const rejected = immigrants + currentPopl - capacity;
    const accepted = rejected > 0 ? immigrants - rejected : immigrants;
    const capacityStatus = interfaceOps.afterCapacityStatus(
      currentPopl + immigrants,
      capacity
    );

    const isNegativeStatus =
      capacityStatus == ACK.NOT_STORABLE || capacityStatus == ACK.MOST_STORABLE;

    //prettier-ignore
    return { immigrants, currentPopl, capacity, rejected, accepted, capacityStatus, isNegativeStatus };
  }, []);

  function endStage() {
    //Save the accepted people.
    updateGS.population.addOccupationPeople(PPK.OCCS.FREE, status.accepted);
    updateGS.miscellaneous.stageForward();
  }

  const styles = getActiveStyles({ status: status.capacityStatus });

  const warning = CAPACITY_NOTIFICATIONS[status.capacityStatus];

  return (
    <StageMainScreen stageKey={MIK.STAGES.IMMIGRATION}>
      <p className={styles.stageName}>Immigration Stage</p>

      <p className={styles.title}>{TITLE[status.capacityStatus]}</p>

      <div className={styles.box}>
        <div className={styles.boxTop}>
          <p className={styles.newPeople}>
            + {status.immigrants} <IoPeople className={styles.peopleIcon} />
          </p>
          <BsArrowRight className={styles.arrow} />
          <p className={styles.capacity}>
            {status.immigrants + status.currentPopl} / {status.capacity}
          </p>

          <div className={styles.warning}>
            <CuteActionNotice
              customDirSty={WARNING_DIRSTY}
              extraIndicators={INTERFACE.AFTER_CAPACITY_INDICATORS}
              extraIndParams={{ status: status.capacityStatus }}
              ButtonIcon={warning.Icon}
              body={warning.message}
            />
          </div>
        </div>

        {status.isNegativeStatus && (
          <p className={styles.boxBottom}>
            We will reject{" "}
            <span className={styles.rejected}>{status.rejected}</span> people
            and accept only{" "}
            <span className={styles.accepted}>{status.accepted}</span>.
          </p>
        )}
      </div>

      <ContinueButton
        subMessage={
          status.accepted > 0 ? (
            <>
              The{" "}
              {status.isNegativeStatus
                ? `${status.accepted} accepted persons`
                : "new people"}{" "}
              will be shown the way to their new houses and then'll be available
              for work.
            </>
          ) : (
            "We can't accomodate none of the immigrants."
          )
        }
        onClick={endStage}
      />
    </StageMainScreen>
  );
}

//prettier-ignore
const DIRECTED_STYLES = {
  stageName: "text-center text-xl text-slate-700 text-light pb-1 border-slate-400 border-b-1 w-9/12 mx-auto",
  title: "mt-8 text-lg text-light text-center text-emerald-700 || bs<text-yellow-600> ms<text-orange-600> ns<text-red-600>",

  box: "relative flex flex-col items-center justify-center border-1 py-4 mt-6 text-slate-600 text-light border-slate-300 pr-4",
  boxTop: "flex items-center",
  newPeople: "flex items-center text-2xl",
  peopleIcon: "text-3xl text-slate-500 ml-2",
  arrow: "mx-5 text-2xl text-slate-500",
  capacity: "text-2xl text-emerald-600 || bs<text-yellow-600> ms<text-orange-600> ns<text-red-600>",
  boxBottom: "mt-2 text-center text-sm text-slate-600",
  rejected: "text-base text-default || ms<text-orange-600> ns<text-red-600>",
  accepted: "text-base text-default text-emerald-600",
  warning: "absolute right-6",

};

const WARNING_DIRSTY = {
  buttonCt:
    "text-emerald-600 ml-6 mb-2px || bs<text-yellow-600> ms<text-orange-600> ns<text-red-600>",
  noticeCt:
    "border-emerald-600 || bs<border-yellow-600> ms<border-orange-600> ns<border-red-600>",
  noticeTumor:
    "border-emerald-600 ||  bs<border-yellow-600> ms<border-orange-600> ns<border-red-600>",
};

const TITLE = {
  [ACK.SAFELY_STORABLE]: "Welcome to the new people!",
  [ACK.BARELY_STORABLE]: "Welcome to the new people!",
  [ACK.MOST_STORABLE]: "We are sorry for the rejected.",
  [ACK.NOT_STORABLE]: "We had to reject too much people!",
};

const CAPACITY_NOTIFICATIONS = {
  [ACK.SAFELY_STORABLE]: {
    Icon: BsCheck2,
    message: "We can accommodate the new people with no problems.",
  },
  [ACK.BARELY_STORABLE]: {
    Icon: BsExclamationTriangle,
    message:
      "We can accomodate the new people, but we are now at our housing limits. Upgrade the Houses to receive the next tempo immigrants.",
  },
  [ACK.MOST_STORABLE]: {
    Icon: BsExclamationTriangleFill,
    message:
      "There isn't place for everyone! Some people will be rejected. We should upgrade the Houses quickly!",
  },
  [ACK.NOT_STORABLE]: {
    Icon: BsExclamationCircleFill,
    message:
      "We have very little space for this people! A lot of them will be rejected. We must upgrade the Houses ASAP to avoid this again the next tempo!",
  },
};

export default ImmigrationStage;
