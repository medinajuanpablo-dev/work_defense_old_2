import { MIK } from "@static/contexts/miscellaneous";

import DawnStage from "./S1_Dawn";
import ProductionStage from "./S2_Production";
import MantainmentStage from "./S3_Mantainment";
import OccupationsStage from "./S4_Occupations";
import ImmigrationStage from "./S5_Immigration";
import ConstructionsEndStage from "./S6_ConstructionsEnd";
import EmploymentStage from "./S7_Employment";
import BuildStage from "./S8_Build";
import ResearchStage from "./S9_Research";
import EnlistmentStage from "./S10_Enlistment";
import EquipmentStage from "./S11_Equipment";
import FabricationStage from "./S12_Fabrication";
import RecruitmentStage from "./S13_Recruitment";
import SightingStage from "./S14_Sighting";
import ScoutingStage from "./S15_Scouting";
import ReassignationStage from "./S16_Reassignation";
import OffensiveStage from "./S17_Offensive";
import AlarmStage from "./S18_Alarm";
import DefenseStage from "./S19_Defense";
import LiberationStage from "./S20_Liberation";
import DefenseResultsStage from "./S21_DefenseResults";
import LiberationResultsStage from "./S22_LiberationResults";
import LearningStage from "./S23_Learning";

export default {
  [MIK.STAGES.DAWN]: DawnStage,
  [MIK.STAGES.PRODUCTION]: ProductionStage,
  [MIK.STAGES.MANTAINMENT]: MantainmentStage,
  [MIK.STAGES.OCCUPATIONS]: OccupationsStage,
  [MIK.STAGES.IMMIGRATION]: ImmigrationStage,
  [MIK.STAGES.CONSTRUCTIONS_END]: ConstructionsEndStage,
  [MIK.STAGES.EMPLOYMENT]: EmploymentStage,
  [MIK.STAGES.BUILD]: BuildStage,
  [MIK.STAGES.RESEARCH]: ResearchStage,
  [MIK.STAGES.ENLISTMENT]: EnlistmentStage,
  [MIK.STAGES.EQUIPMENT]: EquipmentStage,
  [MIK.STAGES.FABRICATION]: FabricationStage,
  [MIK.STAGES.RECRUITMENT]: RecruitmentStage,
  [MIK.STAGES.SIGHTING]: SightingStage,
  [MIK.STAGES.SCOUTING]: ScoutingStage,
  [MIK.STAGES.REASSIGNATION]: ReassignationStage,
  [MIK.STAGES.OFFENSIVE]: OffensiveStage,
  [MIK.STAGES.ALARM]: AlarmStage,
  [MIK.STAGES.DEFENSE]: DefenseStage,
  [MIK.STAGES.LIBERATION]: LiberationStage,
  [MIK.STAGES.DEFENSE_RESULTS]: DefenseResultsStage,
  [MIK.STAGES.LIBERATION_RESULTS]: LiberationResultsStage,
  [MIK.STAGES.LEARNING]: LearningStage,
};
