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
      body: "In this Stage the recruits assigned in the last Recruitment Stage turn into soldiers of the ordered CE levels.",
    },
    {
      title: "Resting and Unequiped",
      body: "Fresh soldiers are automatically sent to rest, where they have minimal mantainment. Also they have no gear on them. You can equip soldiers in the Equipment Stage and move them between zones in the Reassignation Stage.",
    },
  ],
  [MIK.STAGES.EQUIPMENT]: [
    {
      title: "Basics",
      body: "Assign equipment to all needed soldiers in this Stage: resting ones, defending ones and those in liberation units if any. Check before continuing; this is the only stage where soldiers can be equipped. Unused equipment is automatically stored back.",
    },
    {
      title: "No Level Requirements",
      body: "You can equip any rank of weapon or armor to any soldier; there's no level requirement.",
    },
    {
      title: "About soldiers Gear",
      body: "Gear improves the limits of a soldier's combat ability, but doesn't grant it. A soldier with better gear has the capacity to fight better, but not necessarily will. This works with the soldier's CE Level (read next stage fundamentals).",
    },
    {
      title: "More specifically",
      body: "The Weapon determines the maximum amount of damage a soldier can deal in an attack. Armor determines the maximum amount of defense a soldier can put when receiving an attack. ",
    },
  ],
  [MIK.STAGES.FABRICATION]: [
    {
      title: "Basics",
      body: "Order new weapons and armor from the Weaponsmith and Armorsmith. Ordered equipment will be finished by the next Production Stage.",
    },
    {
      title: "Crafting Capacity (CC)",
      body: "Each type of equipment, weapon or armor, is crafted by a different artisan: weaponsmith or armorsmith. Each has a certain Crafting Capacity (adressed as 'CC') that limits the amount and quality of equipment that can be ordered to craft each tempo. The CC is improved by upgrading the artisans buildings.",
    },
    {
      title: "Ranks",
      body: "Equipment quality is divided in Ranks. Higher ranks are simply better equipment, but also cost more and take more CC to be made. All ranks can be ordered since tempo 1; there are no requirements.",
    },
  ],
  [MIK.STAGES.RECRUITMENT]: [
    {
      title: "Basics",
      body: "Send free people to training to turn them into recruits, which will turn into soldiers by the next Enlistment Stage.",
    },
    {
      title: "Recruits",
      body: "Similar to Reassigned people, recruits do nothing and consume a bit more than free people but less than workers.",
    },
    {
      title: "Combat Experience (CE)",
      body: "Soldiers gain experience when thriving (and surviving) in battles. The level of CE is extremely important: a higher CE level soldier will simply fight better, although better skill serves for nothing without quality gear to keep up with it.",
    },
    {
      title: "Ordering higher initial CE levels",
      body: "Initially, all soldiers graduate with CE level 1. You may order soldiers that will graduate with a higher CE level by upgrading the Academy. This costs more resources per soldier though, but all soldiers are trained in 1 tempo no matter the ordered level.",
    },
    {
      title: "More specifically",
      body: "The CE level determines both the minimum amount of damage the soldier can deal in an attack and the minimum defense the soldier can put when receiving an attack. However, this minimum can NOT be higher that the maximum provided by the soldier's gear.",
    },
  ],
  [MIK.STAGES.SIGHTING]: [
    {
      title: "Basics",
      body: "This Stage you receive intel reporting the risk of each zone to be attacked by an invasion force in the following Defense Stage. It's just a review stage; no actions to be performed.",
    },
    {
      title: "Enemy force and power",
      body: "You can't know the enemy force composition by any means, but your intel always reports the aproximated total Power of all invasion forces combined.",
    },
    {
      title: "Multiple attacks",
      body: "Invaders will make between 1 and 3 attacks to different zones, which need to be defended separatedly. In case of multiple attacks, the invaders will split their forces.",
    },
    {
      title: "Risk of attack",
      body: "Your quick intel agents can't tell for sure which zones will be attacked. They only report the risk of each zone of being attacked, which is a probability.",
    },
    {
      title: "Scouting",
      body: "To get more precise reports about which zones will be attacked and the power of the force of each attack, you must send Scouting Expeditions (see Scouting Stage).",
    },
  ],
};
