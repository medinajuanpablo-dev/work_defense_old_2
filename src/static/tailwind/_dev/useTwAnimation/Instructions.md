## **A hook for quick animations with tailwind: useTwAnimation.**

This hook permits the easy use of animations the tailwind and React way, right on the component,
imperatively choosing where to start them (which can't be done with CSS). Can be done forward and
in reverse.

---

### **When this and when pure CSS with keyframes.**

This is more versatile and intuitive, but CSS is always more efficient. This is just a way to animate
the React-tailwind way. Works the best in:

- **Animations triggered by events not detectable with CSS**: like state updates, controls, and events
  in other elements (e.g.: the focus of an input triggering a message in another place).
- **Simple transition-chains**: that happen on non-periodic events (like user interactions, etc.) and
  are just too easy to make an entire animation for them.

> Example: A button click triggers an animation on an input right over it; certain words in an input
> makes it's border blink; etc.

---

### **Use CSS animations especially in two cases:**

- **Long animations**: `useTwAnimation` would keep a JS thread running permanently. Worse on: updating a state.
- **Quick-changes animations**: For complex quick-change animations, the hook is not the way. State updates are very expensive and slow.

> While it could work anyway, the warning gets stronger if both cases apply, and a lot more if the cases apply for several elements at the same time. Just use CSS, it's also more accurate and customizable.

---

## **Setting up.**

An `animationsDefinitions` object specifying the durations and styles applied throughout the transition must be passed with the following structure:

```
const animationsDefinitions = {
  animationKey: {
    msTrans: Number,
    stylesChain: Array<string>,
    commonStyles: string,
    finishedByDefault: boolean,
    transitionType: string,
  },
}
```

- `animationKey`: (Required) A key for the animation. One for each animation.
- `msTrans`: (Required) The duration of one step of the transition, in miliseconds.
- `stylesChain`: (Required) The tailwind classes to be applied in each step of the chain.
- `commonStyles`: Styles to be applied in all steps of the chain.
- `finishedByDefault`: If `true`, the last style will be applied by default.
- `transitionType`: The transition progress function. Is "ease-linear" by default.

---

**Example**: This is an object defined in the component that's gonna use the hook.

```
const ANIM_DEFS = {
  first: {
    msTrans: 1000,
    stylesChain: ["opacity-0", "opacity-100"],
    finishedByDefault: false,
  },
  second: {
    msTrans: 500,
    commonStyles: "transform",
    stylesChain: ["opacity-0 -translate-x-4", "opacity-100 translate-x-0"],
    finishedByDefault: false,
  },
  third: {
    msTrans: 500,
    stylesChain: ["opacity-0", "opacity-100"],
  },
};
```

---

## **Using it.**

The hook returns an **object** (not an array) with 5 properties:

```
{
  transStyles: object,
  startAnimations: function,
  restoreAnimations: function,
  cancelAnimations: function,
  isOngoing: function
}
```

- `transStyles`: An `object` which keys are the `animationKey`s specified in the definition, and which values are the currently transitioning styles. These should be applied to the animating element/s (see the example).

- `startAnimations`: An async `function` that receives the keys of the animations that may begin at the moment of the call. _See the function doc for more._

- `restoreAnimations`: An async `function` that applies the default style (first, or last one if `finishedByDefault=true`) of the specified animation key. _See the function doc for more._

- `cancelAnimations`: An async `function` that cancels the transition chain of the specified animations. Useful to call on a `useEffect` cleanup function.

- `isOngoing`: A `function` that tells if the specified animation is currently transitioning.

---

### **Allowed styles.**

Every tailwind class is allowed, default or custom.

---

### **Examples.**

See the `Example.js` component.
