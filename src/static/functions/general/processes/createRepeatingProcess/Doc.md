# **Quickly set an async repeating process.**

One often needs a process to asynchronously execute a certain amount of times with a certain delay between executions, customizing it with some other configurations. Setting an interval on the spot is stressful and time-consuming. This can be standarized.

### **Example.**

We will use the following objective as example throughout the documentation:

_Print the execution number in the console, 6 times every 500ms, but starting at execution number 2._

---

## **1. Define the repeating configuration and the process.**

First of all, define the process that will be repeatedly called, and the repeating configuration.

```
function logProcessIndex(currentExecutionIndex){
  console.log(currentExecutionIndex);
}

const repeatConfig = {
  startIndex: 1,
  endIndex: 6,
  msRepeat: 500
};
```

Each execution/repetition has a zero-based index that iterates from `startIndex` to `endIndex`, **both inclusive**.

In general, the 4 available configurations are:

- `startIndex [number]` — Index of the first repetition.
- `endIndex [number]` — Index of the last repetition.
- `msRepeat [number]` — Miliseconds before each repetition (before the first one too).
- `firstImmediate [boolean]` - If `true`, the first execution will happen immediately (without the first delay).

---

## **2. Create and start.**

Call the `createRepeatingProcess` passing it the defined process and configuration.

```
const repeatingLog = createRepeatingProcess(
  repeatConfig,
  logProcessIndex
)
```

It returns an object with two functions `start` and `cancel` that start and cancel the async repeating, respectively. They might be imperatively called at any moment.

```
repeatingLog.start();
```

If I want to force a stop of the repeating before it's natural end, use the `cancel` function. For example, in a `setTimeout`.

```
//Will cancel the repeating after 1500 miliseconds.

setTimeout(() => repeatingLog.cancel(), 1500);
```

---

### **Extra.**

- The `process` itself receives the current process-execution index as parameter, so it can be used in each repetition.

- The process-execution index will naturally iterate upwards if `startIndex` is **lower** than `endIndex`, and downwards if viceversa.

- The `start` function returns the amount of executions, which would be the absolute of `(borderIndex - startIndex + 1)`.
