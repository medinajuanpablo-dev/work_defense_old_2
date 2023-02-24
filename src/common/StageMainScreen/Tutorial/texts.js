import { MIK } from "@static/contexts/miscellaneous";

export default {
  [MIK.STAGES.IMMIGRATION]: [
    {
      title: "Basics",
      body: "In this Stage you receive new people, essential for the growth of the Outpost. All accepted newcomers are incorporated as Free people. Upgrade the Immigration Post to improve the amount of immigrants each tempo.",
    },
    {
      title: "Needs",
      body: "Newcomers need a place to live and if not available they will just be rejected. They also need food mantainment. Upgrade the Houses to accept them and the Farms to feed them.",
    },
  ],
  [MIK.STAGES.CONSTRUCTIONS_END]: [
    {
      title: "Basics",
      body: "In this Stage you get reports of your Construction Foreman about buildings upgrading orders. If everything went fine and the upgrade was completed, the new level effect will immediately impact.",
    },
    {
      title: "Setbacks",
      body: "Multiple setbacks can ocurr in the upgrading process of a building, posponing it's completion until the next Constructions End Stage (if there's not another setback). Most happen because of bad choices and are therefore controllable, but some are just random. You'll get hints about this throughout the Stages.",
    },
  ],
  [MIK.STAGES.EMPLOYMENT]: [
    {
      title: "Basics",
      body: "In this Stage you may assign Free people to a job: Farmer (food) or Miner (materials). People can also be taken out of a job, turning them into Reassigned. Workers consume considerably more food than Free people.",
    },
    {
      title: "Reassigning",
      body: 'Moving people between jobs is not a quick process. Taking a person from a job turns him/her into a "Reassigned", which do nothing until the next Immigration Stage where it turns back into a Free person. ',
    },
    {
      title: "Reassigned are costly",
      body: "Reassigned people consume less food than workers but more than Free people, and they produce nothing. You can assign him/her to the new job only in the next Employment Stage.",
    },
  ],
  [MIK.STAGES.BUILD]: [
    {
      title: "Basics",
      body: "In this Stage you may order buildings upgrades. The resources needed for the project are instantly dispatched when ordering. If everything goes without setbacks, the upgrade should be completed by the next Constructions End Stage.",
    },
    {
      title: "Multiple orders and Load",
      body: "You can order all the upgrades wanted, but watch the Load meter. The closer it is to the limit, the more likely there will be a setback in the process.",
    },
    {
      title: "Overload",
      body: "If the limit is passed the builders will be Overloaded, and is likely that an accident will happen. ",
    },
    {
      title: "Upgrade Load capacity",
      body: "Each order finished improves the builders experience and automatically upgrades the load capacity. There's no direct way of improving it, just keep building.",
    },
    {
      title: "Virtual Level",
      body: "Given the necessity you can virtually limit the level of any building to any desired one lower than it's actual level.",
    },
  ],
  [MIK.STAGES.RESEARCH]: [
    {
      title: "Basics",
      body: "In this Stage you may research permanent upgrades for the whole Outpost. The effect applies immediately after finishing the stage. There are 4 columns and each tech in the same column requires the previous one to be researched first.",
    },
    {
      title: "Getting Research Points",
      body: "Each upgrade of the Command Center automatically confers 1 Research Point, which can be stacked and saved for as long as wanted. A point spent can't be recovered and the Command Center is an expensive building to upgrade, so choose wisely.",
    },
  ],
  [MIK.STAGES.ENLISTMENT]: [
    {
      title: "Basics",
      body: "In this Stage the recruits ordered in the last Recruitment Stage turn into soldiers of the ordered CE levels.",
    },
    {
      title: "Resting and Unequiped",
      body: "Fresh soldiers are automatically sent to rest, where they have minimal mantainment. Also they have no gear on them. You can equip soldiers in the Equipment Stage and move them between zones in the Reassignation Stage.",
    },
  ],
};
