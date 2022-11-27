// Each-function examples to both debug one or remembering how to use it.
// To try a function, import the example of the same name from here into the root 'index.js'.
import { random } from "lodash";

//This is the wait function but renamed so it doesn't conflict with it's example.
import { wait as importedWait } from "@static/functions";

// Array functions examples.

export function checkItems() {
  import("../arrays/checkItems").then(({ default: checkItems }) => {
    console.log("\n====== Example/s of checkItems");

    /*Example 1.
    Check if a suspects list contains two guilty persons.*/

    const SUSPECTS_LIST = [
      { name: "Guilbert", innocent: false },
      { name: "Andrew", innocent: true },
      { name: "Sasha", innocent: false },
      { name: "Andrea", innocent: true },
    ];

    console.log(
      `We ${
        checkItems(SUSPECTS_LIST, 2, (p) => !p.innocent)
          ? "found"
          : "didn't find"
      } the required 2 guilty persons in the suspect list`
    );
  });
}

export function forRandom() {
  import("../arrays/forRandom").then(({ default: forRandom }) => {
    console.log("\n====== Example/s of forRandom");

    /*Example 1.
    Randomly display an array of ordered letters and their indexes.*/

    const ORDERED_LETTERS = ["a", "b", "c", "d", "e", "f", "g"];

    forRandom(ORDERED_LETTERS, (randLetter, i) => console.log(randLetter, i));
  });
}

export function pickFurtherItem() {
  import("../arrays/pickFurtherItem").then(({ default: pickFurtherItem }) => {
    console.log("\n====== Example/s of pickFurtherItem");

    /*Example 1.
    Log 3 steps further items taking as reference the 3rd and 5th items from a 6-items array.*/

    const MEALS_LIST = [
      { name: "Sangüi", price: 150, calories: "a lot" },
      { name: "Ensalada", price: 135, calories: "not so much" },
      { name: "Cafe con leche", price: 120, calories: "average" },
      { name: "Pizza", price: 200, calories: "a lot" },
      { name: "Alto guiso", price: 90, calories: "a lot" },
      { name: "Pastelitos", price: 180, calories: "a lot" },
    ];

    console.log("From 3rd item", pickFurtherItem(MEALS_LIST, MEALS_LIST[2], 3));
    console.log("From 5th item", pickFurtherItem(MEALS_LIST, MEALS_LIST[4], 3));
  });
}

export function pickRandomItem() {
  import("../arrays/pickRandomItem").then(({ default: pickRandomItem }) => {
    console.log("\n====== Example/s of pickRandomItem");

    /*Example 1.
    Pick a random letter, remove it from the list and display it.*/

    const ORDERED_LETTERS = ["a", "b", "c", "d", "e", "f", "g"];

    console.log(pickRandomItem(ORDERED_LETTERS, true));
  });
}

export function sumItems() {
  import("../arrays/sumItems").then(({ default: sumItems }) => {
    console.log("\n====== Example/s of sumItems");

    /*Example 1.
    Sum a list of numbers mixed with words and objects.*/

    const MESS = [
      5,
      ["woow", "nice"],
      10,
      10,
      [22],
      { 15: "fifteen" },
      25,
      "thirty",
    ];

    console.log(sumItems(MESS)); //Should display 50
  });
}

export function countItems() {
  import("../arrays/countItems").then(async ({ default: countItems }) => {
    console.log("\n====== Example/s of countItems");

    const A = [
      5,
      "ten",
      "It's a nice day",
      8,
      -29,
      [10],
      "Good stuff",
      { object: 15 },
      6,
      { anotherObject: "nice" },
      "That's nice",
      [-20, 8, 0],
      -2,
      0,
    ];

    /*Example 1.
    Count the numeric items higher than 5.*/
    console.log("== EXAMPLE 1");

    console.log(countItems(A, (item) => typeof item === "number" && item > 5));

    await importedWait(2000);
    /*Example 2.
    Count the strings that contain the word "nice", the objects or arrays, and the positive numbers.*/
    console.log("\n\n== EXAMPLE 2");

    console.log(
      countItems(A, {
        nice: (item) => typeof item === "string" && item.includes("nice"),
        objects: (item) => typeof item === "object",
        positive: (item) => typeof item === "number" && item > 0,
      })
    );
  });
}

export function countRepeatedItems() {
  import("../arrays/countRepeatedItems").then(
    async ({ default: countRepeatedItems }) => {
      console.log("\n====== Example/s of countRepeatedItems");

      /*Example 1.
      Count the repeated numbers and strings.*/
      console.log("\n\n== EXAMPLE 1");

      const ARRAY = [
        ...[1, 2, "one", "two", 1, 1, 5],
        ...["three", 4, "one", 2, 5, 8, "three"],
      ];

      console.log(countRepeatedItems(ARRAY));

      await importedWait(2000);
      /*Example 2.
      Count the repeated numbers, strings, objects and functions.*/
      console.log("\n\n== EXAMPLE 2");

      const ARRAY2 = [
        ...[
          { name: "August", age: 15 },
          { name: "Christina", age: 25 },
          { name: "August", age: 15, hair: "black" },
          { name: "Christina", age: 25, hair: "blonde" },
          { name: "Mathias", age: 15 },
          { name: "August", age: 15 },
        ],
        ...[
          function foo() {},
          function faa() {},
          function fee() {},
          function foo() {},
        ],
      ];

      console.log(countRepeatedItems([...ARRAY, ...ARRAY2]));

      await importedWait(2000);
      /*Example 3.
      Count the persons with the same name, even if they contain different fields.*/
      console.log("\n\n== EXAMPLE 3");

      console.log(
        countRepeatedItems([...ARRAY, ...ARRAY2], (person) => {
          return { name: person.name };
        })
      );
    }
  );
}

export function sliceByIndexes() {
  import("../arrays/sliceByIndexes").then(({ default: sliceByIndexes }) => {
    console.log("\n====== Example/s of sliceByIndexes");

    /*Example 1.
    Extract the items at specific positions from an array.*/

    const NUMBERS = [
      ...["one", "two", "three", "four", "five"],
      ...["six", "seven", "eight", "nine"],
    ];

    console.log(sliceByIndexes(NUMBERS, [4, 1, 7, 8]));
  });
}

export function divide() {
  import("../arrays/divide").then(({ default: divide }) => {
    console.log("\n====== Example/s of divide");

    /*Example 1.
    Divide the numeric array in sorted groups.*/

    const CALIFICATIONS = Array(2)
      .fill(0)
      .map(() => random(1, 10));

    console.log(CALIFICATIONS);

    console.log(
      divide(
        CALIFICATIONS.sort((a, b) => b - a),
        1
      )
    );
  });
}

// Control functions examples.

export function checkValues() {
  import("../control/checkValues").then(
    ({ checkOptionalValues, checkRequiredValues, mustBe }) => {
      console.log("\n====== Example/s of checkValues.");

      const id = 221;
      const phone = "3816522973";
      const name = "Juampi";
      const address = {
        city: "Big City",
        number: 221,
        street: "Long Street",
        country: "La La Land",
      };
      const car = "Samsung(?)";
      const meals = ["Hamburger", []];
      const favMusic = "Rock";
      const isCute = true;
      const unknown = undefined;

      checkRequiredValues([
        [{ id, phone, name }, "n", "s", "s"],
        [{ favMusic }, mustBe(["Rock"], { x: "Pop" }, ["Reggae"])],
        [{ unknown }, "?"],
        { car, type: "string" },
        { meals, itemsType: ["object", "number"], exclusiveTypes: true },
        {
          address,
          reqFields: ["street", "number"],
          fieldsType: ["object", "number"],
        },
      ]);
    }
  );
}

export function exists() {
  import("../control/exists").then(({ default: exists }) => {
    console.log("\n====== Example/s of exists");

    //General.
    const logExistance = (something) =>
      console.log(`That ${exists(something) ? "exists" : "doesn't exist"}.`);

    /*Example 1.
    Check the existance of a declared var.*/
    console.log("=== EXAMPLE 1.");

    var variable;
    logExistance(variable);

    /*Example 2.
    Check the existance of an assigned var.*/
    console.log("=== EXAMPLE 2.");

    variable = { a: "Hello" };
    logExistance(variable);

    /*Example 3.
    Check the existance of a expression.*/
    console.log("=== EXAMPLE 3.");

    logExistance(true ? "true" : "false");
  });
}

// Object functions examples.

export function clean() {
  import("../objects/clean").then(({ default: clean }) => {
    console.log("\n====== Example/s of clean");

    /*Example 1.
    Clean an object.*/

    const LOL = {
      rating: 0,
      capacity: undefined,
      name: "League of Legends",
      description: "",
      price: 9999,
    };

    // clean([LOL], ["zero", "emptyString"]);
    clean([LOL]);

    console.log(LOL);
  });
}

export function joinProperties() {
  import("../objects/joinProperties").then(({ default: joinProperties }) => {
    console.log("\n====== Example/s of joinProperties");

    /*Example 1.
    Join names and phones of a persons list into one-string list.*/

    const OBJECTS = [
      { name: "Harold", phone: "29919231", id: "1dwadwoa23590a2" },
      { name: "Andrew", phone: "64919823", id: "2dwiawi2i3020aw" },
      { name: "Andrea", phone: "76189121", id: "3e2i1gaw22w3211" },
      { name: "Mathew", phone: "98418231", id: "4jdnau2325a9gaw" },
    ];

    console.log("DEFAULT CONFIG", joinProperties(OBJECTS));

    console.log(
      "SPECIFIC FIELDS AND SEPARATOR",
      joinProperties(OBJECTS, {
        separatorStr: "——",
        joiningFields: ["name", "phone", "invalidField"],
      })
    );

    console.log(
      "USING CUSTOM MERGE PROCESS",
      joinProperties(OBJECTS, {
        mergeProcess: (acc, next) => acc + "XD" + next,
      })
    );
  });
}

export function stringsToKeys() {
  import("../objects/stringsToKeys").then(({ default: stringsToKeys }) => {
    console.log("\n====== Example/s of stringsToKeys");

    /*Example 1.
    Convert an array of persons into an object.*/

    const PERSONS = ["JUAN", "Martín", "Alf Onso", "Ignacio"];

    const PERSONS_OBJ = {
      xd: "JUAN",
      xd2: "Martín",
      xd3: "Alf Onso",
      xd4: "Ignacio",
    };

    console.log("Delightful object:", stringsToKeys(PERSONS_OBJ));
  });
}

export function sumProperties() {
  import("../objects/sumProperties").then(({ default: sumProperties }) => {
    console.log("\n====== Example/s of sumProperties");

    /*Example 1.
    Sum mixed and no necessarily present or numeric fields of multiple objects. Also sum the objects themselves. */

    const FAMILY_SPENDING = [
      { name: "Father", transport: 400, others: 100 },
      { groseries: 500, name: "Mom", others: 200 },
      { transport: 150, others: 600, groseries: "none", name: "Daughter" },
    ];

    console.log(
      "Specifying Fields",
      sumProperties(FAMILY_SPENDING, ["groseries", "transport", "others"])
    );

    console.log("Using first object fields", sumProperties(FAMILY_SPENDING));

    console.log("Each object sum.");
    for (let person of FAMILY_SPENDING)
      console.log(person.name, sumProperties(person));
  });
}

// Others functions examples.

export function capped() {
  import("../others/capped").then(({ default: capped }) => {
    console.log("\n====== Example/s of capped");

    /*Example 1.
    Get a two random numbers from 1 to 100, one capped at 50, the other capped between 25 and 75 .*/

    const RAW_DEF = random(1, 100);
    const RAW_DMG = random(1, 100);

    console.log("Final Damage", capped(RAW_DMG, { min: 25, max: 75 }));
    console.log("Final Defense", capped(RAW_DEF, { max: 50 }));
  });
}

export function typeOf() {
  import("../others/typeOf").then(({ default: typeOf }) => {
    console.log("\n====== Example/s of typeOf");

    /*Example 1.
    .*/

    const value = "xd";

    console.log(typeOf(value));
    console.log(typeOf(value, "array"));
  });
}

// Processes functions examples.

export function createRepeatingProcess() {
  import("../processes/createRepeatingProcess").then(
    async ({ default: createRepeatingProcess }) => {
      console.log("\n====== Example/s of createRepeatingProcess");

      /*Example 1.
      Repeat process every 500ms, 3 times from numbers 2 to 5.*/
      console.log("\n\n== EXAMPLE 1 START.");

      const repeatingLog1 = createRepeatingProcess(
        { startIndex: 2, endIndex: 5, msRepeat: 500 },
        (currentIndex) => console.log(currentIndex)
      );
      await repeatingLog1.start();

      /*Example 2.
      Repeat process every 500ms, 5 times from numbers 4 to 9, and start the first process immediately .*/

      await importedWait(2000);
      console.log("\n\n== EXAMPLE 2 START.");

      const repeatingLog2 = createRepeatingProcess(
        { startIndex: 4, endIndex: 9, msRepeat: 500, firstImmediate: true },
        (currentIndex) => console.log(currentIndex)
      );
      await repeatingLog2.start();

      /*Example 3.
      Config process to repeat every 500ms for 6 times (3s total) but cancel it after 2 seconds. */

      await importedWait(2000);
      console.log("\n\n== EXAMPLE 3 START.");

      const repeatingLog3 = createRepeatingProcess(
        { endIndex: 5, msRepeat: 500 },
        (currentIndex) => console.log(currentIndex)
      );
      repeatingLog3.start();
      setTimeout(() => repeatingLog3.cancel(), 2100);
    }
  );
}

//wait is already imported in this file, but let's import it again anyway to keep the order.
export function wait() {
  import("../processes/wait").then(async ({ default: wait }) => {
    console.log("\n====== Example/s of wait");

    /*Example 1.
    Print, wait 2 seconds and then print again.*/

    console.log("Hello");
    await wait(2000);
    console.log("world, you are late");
  });
}

// String functions examples.

export function splitAndFilter() {
  import("../strings/splitAndFilter").then(({ default: splitAndFilter }) => {
    console.log("\n====== Example/s of splitAndFilter");

    /*Example 1.
    Split the long name of a person and show those with an 'a'*/

    const LONG_NAME =
      "Adolph Blaine Charles David Earl Frederick Gerald Hubert Irvin John Kenneth";

    console.log(splitAndFilter(LONG_NAME, " ", "a").passed);
  });
}

export function includesGroup() {
  import("../strings/includesGroup").then(({ default: includesGroup }) => {
    console.log("\n====== Example/s of includesGroup");

    /*Example 1.*/

    console.log(
      includesGroup(
        "Una nueva noche fría en el barrio",
        ["noa", "onche", "af"],
        "any"
      )
    );
  });
}

// export function forRandom() {
//   import("../").then(({ default: f }) => {
//     console.log("\n====== Example/s of forRandom");

//     /*Example 1.
//     .*/
//   });
// }
