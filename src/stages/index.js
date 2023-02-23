import { MIK } from "@static/contexts/miscellaneous";

import ImmigrationStage from "./S5_Immigration";
import ConstructionsEndStage from "./S6_ConstructionsEnd";
import EmploymentStage from "./S7_Employment";
import BuildStage from "./S8_Build";
import ResearchStage from "./S9_Research";
import EnlistmentStage from "./S10_Enlistment";
import EquipmentStage from "./S11_Equipment";
import FabricationStage from "./S12_Fabrication";
import RecruitmentStage from "./S13_Recruitment";

export default {
  [MIK.STAGES.IMMIGRATION]: ImmigrationStage,
  [MIK.STAGES.CONSTRUCTIONS_END]: ConstructionsEndStage,
  [MIK.STAGES.EMPLOYMENT]: EmploymentStage,
  [MIK.STAGES.BUILD]: BuildStage,
  [MIK.STAGES.RESEARCH]: ResearchStage,
  [MIK.STAGES.ENLISTMENT]: EnlistmentStage,
  [MIK.STAGES.EQUIPMENT]: EquipmentStage,
  [MIK.STAGES.FABRICATION]: FabricationStage,
  [MIK.STAGES.RECRUITMENT]: RecruitmentStage,
};
