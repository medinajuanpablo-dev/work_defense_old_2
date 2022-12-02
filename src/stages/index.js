import { MIK } from "@static/contexts/miscellaneous";

import ImmigrationStage from "./S5_Immigration";
import ConstructionsEndStage from "./S6_ConstructionsEnd";
import EmploymentStage from "./S7_Employment";
import BuildStage from "./S8_Build";

export default {
  [MIK.STAGES.IMMIGRATION]: ImmigrationStage,
  [MIK.STAGES.CONSTRUCTIONS_END]: ConstructionsEndStage,
  [MIK.STAGES.EMPLOYMENT]: EmploymentStage,
  [MIK.STAGES.BUILD]: BuildStage,
};
