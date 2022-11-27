# **Indicated Styles tailwind enhancer.**

## **What we want to be able to do.**

Let's say I would like a custom `Input` component to have different styles when it's _focused_ or _valued_, and let's call such situation "active". I also want to specify these _when-active_ styles directly on `className` using some kind of "ac" directive, like:

```
<Input className="text-gray-400 border-2 border-gray-500 ac<border-blue-500'text-black>" />
//The ' is separating "ac" styles.
```

> The content of the example's `className` is called a **Directed Style**.

### **Unlimited Power.**

Alright, nice! Now I want **more** situations like this "active" one. Maybe a "maxed" situation when the input's value is longer than a permitted maximum, or maybe a "done" situation when the input is not focused but it does hold a value. Even validation-styles (like red border when wrong input, or green when correct) can be specified this way.

The amount of "situations" is unlimited. We call them **Indicators**.

---

## **Features.**

The previous example is just the core functionality: Directed Styles. This utility enhances the declarative nature of Tailwind in multiple ways:

- **Directed Styles**: Keep _all_ styles in one separated place, handling them with minimal and clean JS. Include all conditional and static styles within a single `string` with the use of **custom directives** defined by you in **Indicators**.

- **Reactive**: Dynamic/directed styles will react to changes and applied if appropiate. They can be combined with static ones.

- **Group Reaction**: Every element in a component can react to changes as a group, specifying styles that should be applied for each element.

- **Declarative Priority**: Easily set styles priorities when defining your **Indicators**, so more important styles have precedence over any other styles that change the same CSS properties.

---

## **Build an Indicated Component, or make a Component indicated.**

We'll just continue with the same `Input` example component shown above.

## **1. Define your Indicators.**

This is the indicators definition for our custom `Input` component:

```
const INDICATORS = [
    {
        directive: "ac",
        condition: p => p.focused || p.value.length > 0,
        key: "active",
    },
    {
        directive: "do",
        condition: p => !p.focused && p.value.length > 0,
        key: "done",
    },
]
```

_For each Indicator's definition, these fields must be specified._

- `key [string-optional]`: An _optional_ string to name and identify the indicator.
- `directive [string]`: The small-word used in `className` to _indicate_ which styles should be applied when that indicator is active.
- `condition [function]`: A function that determines whether the indicator is currently **active** or not. It receives an `object` with the needed params to make that decision. (See below).

### **Indicators Declarative Priority.**

Styles of the **last**-defined Indicators will have precedence over any other Indicator's styles that change the same CSS properties. Use this to build Indicators priorities.

> In the example, "done" styles will have precedence over "active" styles.

## **2. Define your Directed Styles.**

Let's say our `Input` component renders two elements: an **input** and some kind of **label**.

```
const DIRECTED_STYLES = {
    input: "text-gray-400 border-2 border-gray-500 ac<border-blue-500'text-black>",
    label: "text-gray-400 ac<text-black>",
}
```

> **Elements Keys**: Use meaningful elements keys. Final applying styles will be accessed through these keys.

## **3. Call the `useIndicatedStyles` hook.**

Add the hook at about the start of the component, passing it the Indicators definitions and the defined Directed Styles.

```
function Input(){
    const getActiveStyles = useIndicatedStyles(INDICATORS, DIRECTED_STYLES)

    //... Rest of the component
}
```

As shown, the hook returns a function that is recommended to name `getActiveStyles`.

> **Active Indicators and Active Styles**: The _active_ term is used to refer the currently applying or "happening" indicators and their respective styles. It has **no** relation with the example's "active" Indicator itself.

### **Get the active styles.**

Remember that `condition` field you defined in `INDICATORS`? It's time to pass them their needed params, so they can decide which indicators are currently active and which styles should be applied. Just execute `getActiveStyles` passing it said params.

```
const indicatorsConditionsParams = { focused, value }; //You may just pass the object.
const activeStyles = getActiveStyles(indicatorsConditionsParams);
```

Whenever the condition params change, new active indicators will be detected, then returning each element's appropiate new active styles. These come wrapped in an object accesible by each element's key:

```
activeStyles = {
    input: "...input active styles",
    label: "...label active styles",
}
//This is activeStyles's value print, not an assignment.
```

Apply them to your elements. For example, in the input.

```
<input className={activeStyles.input} />
```

---

## **Indicated Interfaces in a new Component.**

_For performance: If a part of the interface must be Indicated, create a new Indicated Component that renders that part only._

**The Problem:** The `useIndicatedStyles` hook provokes a re-render everytime something triggers the Indicators conditions to change the active styles. That happens very often, so applying the hook in a _big_ Component is entirely inconvenient as it will make it run again too frequently.

**The Solution:** Select the part of the interface (JSX) that needs to be Indicated, and place it in another smaller Component. Then call the `useIndicatedStyles` _in that new smaller Component_. You may even just put it in the same file for simplicity.

Example:

in `/BigComponent.js`

```
function BigComponent(){
    //...lots of heavy processes that shouldn't run too often

    return <>
        <IndicatedPart />
        //...lots of heavy markup that shouldn't render too often
    </>
}

const STYLES = {
    //...BigComponent static styles
};

function IndicatedPart(){
    const getActiveStyles = useIndicatedStyles(
        INDICATED_PART_INDICATORS,
        INDICATED_PART_DIRECTED_STYLES
    )

    const styles = getActiveStyles({ /* ...indicators conditions params */ });

    return <>
        //interface that needs to be indicated.
    </>
}

const INDICATED_PART_DIRECTED_STYLES = {
    // ...
}

const INDICATED_PART_INDICATORS = {
    // ...
}
```

---

## **Custom Directed Styles.**

> **Using** Custom Directed Styles come with some performance problems when rendering many components at the same time. See the next part.

We can make our component using Indicated Styles to be _fully customizable_ through props:

- Receive `customDirectedStyles` that merge with the static `DIRECTED_STYLES` with priority for the custom ones. This way the component styles can be easily customized.

- Receive `extraIndicators` that are added at the end of the static `INDICATORS` and are used together, so the component "change cases" can be easily customized when using it.

- Receive an `extraIndicatorsParams`, as the `extraIndicators` conditions may need extra params. These are passed to `getActiveStyles` along with the already-defined ones.

```
/* customDirSty == customDirectedStyles ; extraIndParams == extraIndicatorsParams */

function Input({ customDirSty, extraIndicators, extraIndParams }){
    const getActiveStyles = useIndicatedStyles(
        INDICATORS, DIRECTED_STYLES,
        { customDirSty, extraIndicators }
    );

    //Component code

    const activeStyles = getActiveStyles({
        focused, value, ...extraIndParams
     })

    //Rendering JSX.
}

```

### **When _using_ a Customizable Indicated Component.**

_How do we customize our just defined Input component?_ Better with an example.

```
function FatherComponent(){
    /* stuff */

    return (
        /* more stuff */

        <Input
            customDirSty={INPUT_CUSTOMIZATION.CUSTOM_DIR_STY}
            extraIndicators={INPUT_CUSTOMIZATION.EXTRA_INDICATORS}
            extraIndParams={{ invalid }}
        />
    )
}

/*
    I want the input's border red when invalid and green when focused.
    Also now I want the border purple when "active".

    For the new indicators: "invalid" is passed as extraIndParam, but "focused" is an original param.
*/

const INPUT_CUSTOMIZATION = {
    CUSTOM_DIR_STY: {
        input: "iv<border-red-500> fo<border-green-500> ac<border-purple-500>",
    },
    EXTRA_INDICATORS: [
        { key: "invalid", directive: "iv", condition: p => p.invalid },
        { key: "focused", directive: "fo", condition: p => p.focused },
    ]
}
```

### **Notes.**

- The father component has no need of using the hook to customize `Input` styles or add the `INPUT_EXTRA_INDICATORS`. _Using the hook_ and _customizing a child that uses the hook_ are independant processes.

- As shown: `customDirSty` can just use the already defined `INDICATORS` of the child component and overwrite the predefined styles for that indicator.

- As shown: when defining `extraIndicators` in the father component, the child's original indicators params can still be used in the extra indicators conditions.

- The `DIRECTED_STYLES` could use the `extraIndicators` and the `INDICATORS` could use the `extraIndParams`, but that would be silly as those props are completely unknown when defining the static `DIRECTED_STYLES` and `INDICATORS`.

---

## **Custom Directed Styles are really slow.**

### **So, what's the problem?**

In few words, using `customDirSty` in several components that render at the same time causes an annoying mount-delay.

**Details**: Mounting several customizable components at the same time, while passing them the useful `customDirSty`, comes with a really noticeable delay for the elements mount. This happens because the Custom Directed Styles are merging with the Default Directed Styles on every component on mount, and that merging is a slow process.

> This problem occurs only when **using** the `customDirSty` prop, not when _defining_ it. You can create a component that receives `customDirSty` and there will be no problem until you start effectively using that prop.

### **So, what's the solution?**

Well, _don't use `customDirSty` in several components that render at the same time_. Always use `customDirSty` on components that mount separatedly on time.

The best solution is to make components mount asynchronously using the **Async Mounter**.

---

## **Extra Features.**

There are some aditional and useful features:

### **Multiple Directives for the same styles.**

If some styles should be applied when two or more indicators are active, just add their directives!

Imagine two "maxed" and "wrong" indicators, with directives `"mx"` and `"wr"` respectively. I wana apply the `border-red-500` and `text-red-500` to both.

```
<Element className="...restOfStyles mx,wr<border-red-500'text-red-500>">
```

### **On Undefined Directives.**

The hook accepts another optional param `onUndefinedDirective`, which is a callback to be executed every time the process finds an unknown directive in the Directed Styles that isn't in any of the specified Indicators. Useful to avoid human error.

```
function Input(){
    const getActiveStyles = useIndicatedStyles(
        INDICATORS, DIRECTED_STYLES,
        { onUndefinedDirective: (undefDir) => console.warn(undefDir)}
    );

    ...rest of the component
}
```

> By default, nothing happens when finding undefined directives. This is for a reason: If the father component also uses the hook with it's own directives, but still wants to customize the `Input` styles, it might use `Input` directives. These last are unknown for the father, so it would fail every time.

---

## **Notes.**

### **All styles in one place.**

Styles non included along with the Directed Styles can't be processed for priority, so they won't be overwrited by more important ones. To avoid this annoying bug-like situation, just place all your styles in one place, as Directed Styles.

### **Looks harder than it is.**

After some use, the repetitive pattern and simplicity becomes evident. Check the `Example.js` component for a simple use example of this tool, or check any component in the `components` folder for wide uses (still simple though, that's the idea).

### **Priority doesn't support all styles.**

Because the `mergeStyles` utility is used for the declarative priorities feature, it supports only the styles that tool supports. For a list, check `mergeStyles/mergeStyles.js`.
