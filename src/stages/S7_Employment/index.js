import React from "react";
import { mapValues } from "lodash";
import { RiEditCircleFill, RiArrowGoBackFill } from "react-icons/ri";
import { BsQuestionCircle } from "react-icons/bs";
import { BiMinus, BiPlus } from "react-icons/bi";
import { GiWheat, GiClayBrick } from "react-icons/gi";

import {
  StageMainScreen,
  ContinueButton,
  CuteActionNotice,
  CuteButton,
  SummaryRow,
} from "@common/index";
import { useIndicatedStyles } from "@static/tailwind";
import { useGeneralStateReader, useGeneralStateUpdator } from "@state/hooks";
import { useObjectState } from "@static/react";

import { MIK } from "@static/contexts/miscellaneous";
import { resourcesOps, REK } from "@static/contexts/resources";
import { POPULATION, populationOps, PPK } from "@static/contexts/population";
import { BDK } from "@static/contexts/buildings";

const OCK = PPK.OCCS;

function EmploymentStage() {
  //prettier-ignore
  const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES);
  const updateGS = useGeneralStateUpdator("population", "miscellaneous");
  const gs = useGeneralStateReader(
    "population",
    `buildings.${BDK.NAMES.FARMS}`,
    `buildings.${BDK.NAMES.MINES}`
  );

  const tempState = useObjectState({
    [OCK.FREE]: 0,
    [OCK.REASSIGNED]: 0,
    [OCK.FARMER]: 0,
    [OCK.MINER]: 0,
  });

  function setInitialValues() {
    tempState.replace((prev) =>
      mapValues(prev, (_, occ) => gs.population.count[occ])
    );
  }

  React.useEffect(() => {
    setInitialValues();
  }, []);

  function endStage() {
    //Save the changes.
    for (let occ in tempState.get)
      updateGS.population.setOccupationPeople(occ, tempState.get[occ]);

    updateGS.miscellaneous.stageForward();
  }

  //Adds or removes 1 from a temp state.
  function changeTemp(job, sign) {
    tempState.replace((prev) => {
      if (sign == "add" && prev[OCK.FREE] > 0) {
        prev[job] += 1;
        prev[OCK.FREE] -= 1;
      } else if (sign == "substract" && prev[job] > 0) {
        prev[job] -= 1;
        prev[OCK.REASSIGNED] += 1;
      }
      return prev;
    });
  }

  const summary = React.useMemo(() => {
    const newProduction = {
      food: resourcesOps.production(
        REK.NAMES.FOOD,
        gs.buildings[BDK.NAMES.FARMS].level,
        tempState.get[OCK.FARMER]
      ),
      materials: resourcesOps.production(
        REK.NAMES.MATERIALS,
        gs.buildings[BDK.NAMES.MINES].level,
        tempState.get[OCK.MINER]
      ),
    };

    var newMantainment = 0;
    const occupations = [
      ...Object.keys(POPULATION.WORKER_OCCS),
      PPK.OCCS.FREE,
      PPK.OCCS.REASSIGNED,
    ];

    for (let occ of occupations)
      newMantainment += populationOps.civiliansMantainment(
        occ,
        tempState.get[occ]
      );

    return { newProduction, newMantainment };
  }, [tempState.get]);

  const styles = getActiveStyles(tempState.get);

  return (
    <StageMainScreen onUndo={setInitialValues} stageKey={MIK.STAGES.EMPLOYMENT}>
      <p className={styles.stageName}>Employment Stage</p>

      <div className={styles.row}>
        <p className={styles.free}>
          <RiEditCircleFill className={styles.freeIcon} /> Free People:{" "}
          <span className={styles.freeAmount}>{tempState.get[OCK.FREE]}</span>
        </p>
        <p className={styles.reassigned}>
          <RiEditCircleFill className={styles.reassignedIcon} /> Reassigned:{" "}
          <span className={styles.reassignedAmount}>
            {tempState.get[OCK.REASSIGNED]}
          </span>
        </p>
      </div>

      <div className={styles.row + styles.resourcesRow}>
        <div className={styles.resourceBox + styles.food}>
          <div className={styles.resourceInfo}>
            <p className={styles.resourceTop}>
              <GiWheat className={styles.resourceIcon + styles.food} />
              Farmers:{" "}
              <span className={styles.resourceWorkers}>
                {tempState.get[OCK.FARMER]}
              </span>
            </p>
            <p className={styles.resourceBottom}>
              <span className={styles.resourceProduction}>
                +{summary.newProduction.food.toFixed(1)}
              </span>{" "}
              food /tempo
            </p>
          </div>
          <div className={styles.resourceButtons}>
            <BiPlus
              onClick={() => changeTemp(PPK.OCCS.FARMER, "add")}
              className={styles.resourceAdd}
            />
            <BiMinus
              onClick={() => changeTemp(PPK.OCCS.FARMER, "substract")}
              className={styles.resourceSubstractFood}
            />
          </div>
        </div>
        <div className={styles.resourceBox + styles.materials}>
          <div className={styles.resourceInfo}>
            <p className={styles.resourceTop}>
              <GiClayBrick className={styles.resourceIcon + styles.materials} />
              Miners:{" "}
              <span className={styles.resourceWorkers}>
                {tempState.get[OCK.MINER]}
              </span>
            </p>
            <p className={styles.resourceBottom}>
              <span className={styles.resourceProduction}>
                +{summary.newProduction.materials.toFixed(1)}
              </span>{" "}
              mat /tempo
            </p>
          </div>
          <div className={styles.resourceButtons}>
            <BiPlus
              onClick={() => changeTemp(PPK.OCCS.MINER, "add")}
              className={styles.resourceAdd}
            />
            <BiMinus
              onClick={() => changeTemp(PPK.OCCS.MINER, "substract")}
              className={styles.resourceSubstractMinerals}
            />
          </div>
        </div>
      </div>

      {/* <div className={styles.row}>
        <CuteButton
          onClick={setInitialValues}
          Icon={RiArrowGoBackFill}
          size="smaller"
          color="indigo"
        >
          Undo All Changes
        </CuteButton>
      </div> */}

      <div className={styles.summaries}>
        <SummaryRow
          Icon={RiEditCircleFill}
          label="Civilian Mantainment"
          amount={summary.newMantainment}
          text="New <L> will be <A>."
          size="smaller"
          color="blue"
        />
      </div>

      <ContinueButton onClick={endStage} />
    </StageMainScreen>
  );
}

//prettier-ignore
const DIRECTED_STYLES = {
  stageName: "text-center text-xl text-slate-700 text-light pb-1 border-slate-400 border-b-1 w-9/12 mx-auto",

  row: "relative mt-6 flex justify-center items-center",
  resourcesRow: "-mx-1",

  free: "flex items-center mr-1 text-sm justify-center text-light text-slate-600 w-11/24 border-1 py-2 border-sky-300 rounded-md",
  freeIcon: "mr-1 text-xl",
  freeAmount: "ml-2 text-base text-default text-sky-600 || nfr<text-slate-500>",

  reassigned: "flex items-center text-sm ml-1 justify-center text-light text-slate-600 w-11/24 border-1 py-2 border-orange-300 rounded-md",
  reassignedIcon: "mr-1 text-xl",
  reassignedAmount: "ml-2 text-base text-default text-yellow-600 || nr<text-slate-500>",

  resourceBox: "w-6/12 mx-1 border-1 border-opacity-50 rounded-md py-4 px-2 flex",
  resourceInfo: "mr-1 grow",
  resourceTop: "flex text-sm items-center text-slate-700 text-light",
  resourceWorkers: "ml-2 text-lg",
  resourceIcon: "mr-1 text-xl",
  resourceBottom: "mt-2 text-xs text-slate-700 text-light",
  resourceProduction: "text-sm text-default",
  resourceButtons: "w-2/12 flex flex-col items-center justify-between",
  resourceAdd: "w-6 h-6 text-opacity-70 text-indigo-700 rounded-sm border-1 border-opacity-50 border-indigo-500 || nfr<text-slate-400'border-slate-400>",
  resourceSubstractFood: "w-6 h-6 text-opacity-70 text-indigo-700 rounded-sm border-1 border-opacity-50 border-indigo-500 || nf<text-slate-400'border-slate-400> ",
  resourceSubstractMinerals: "w-6 h-6 text-opacity-70 text-indigo-700 rounded-sm border-1 border-opacity-50 border-indigo-500 || nm<text-slate-400'border-slate-400>",

  food: " border-emerald-500 text-emerald-700",
  materials: " border-slate-500 text-slate-700",

  summaries: "mt-6"
};

//prettier-ignore
const INDICATORS = [
  { key: "noFree", directive: "nfr", condition: p => p[OCK.FREE] == 0 },
  { key: "noneReassigned", directive: "nr", condition: p => p[OCK.REASSIGNED] == 0 },  
  { key: "noFarmers", directive: "nf", condition: p => p[OCK.FARMER] == 0 },    
  { key: "noMiners", directive: "nm", condition: p => p[OCK.MINER] == 0 },  
];

const INFO_STYLES = {
  buttonCt: "text-slate-500 | xs:w-5 xs:h-5",
};

export default EmploymentStage;
