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
      body: "Multiple setbacks can ocurr in the upgrading process of a building, posponing it's completion until the next Constructions End Stage (if there's not another setback). Most happen because of bad choices and are therefore controllable, but some are just random.",
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
};
