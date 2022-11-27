# **The React Functional Component Structure.**

When it comes to build a function component, a certain pattern of code is often repeated, so I decided to document it up and repeat it in every component I create.

This structure orders code and optimizes space, maximizing legibility.

---

## **Zones of the entire file.**

There are 3 zones in a component's file.

- **The Imports Zone:** Everything above the component's definition. The only code allowed here is `import`s of all needed modules and their destructuring. Read `theImportStructure` for a general importing convention.

- **The Definition Zone:** The component's function definition and all it's procesess.

- **The Constants Zone:** Everything below the component's definition. Here lay all _absolute constants_ and _pure functions_ needed in the component's definition. The `export`s are declared here too.

> **Everything constant, outside**: If a process or value can be placed in a pure function or absolute constant outside the definition, so should be done. The component's definition must be always kept as clean and short as possible.

---

## **Structure a Component's Definition.**

A component's definition is divided into 5 **Sections**.

> Before each section any number of _auxiliar values and functions_ may be declared, defined and processed, and then used in the following sections. There is a single simple rule: place it as low within the component as you can.

- **The Check and Hooks Section**: The component begins with the `checkValues` call. Then go all the non-memoizers _hooks calls_ followed by the _component values_ declaration (which is also a hook call).

> If the `useIndicatedStyles` hook is called, it should go first because is the longest.

- **The Effects Section**: Every effect along with their processes and dependency arrays must be defined here.

- **The Handlers Section**: All functions that handle an user action or define a callback that does the same must be defined here.

> Don't forget to use the `useCallback` memoizer for heavy processes.

- **Markup values Section**: Just before the markup goes all values that will be used in the markup and must be calculated or stored beforehand.

- **Markup Section**: At the end of the Component goes all the markup, but not necessarily within a single `return` statement. It may be divided as needed, pre-stored into variables, and/or be conditional.

---

## **Component Values.**

A component will often need to hold instance (element) only values, which we'll call **Component Values** and will be saved under one single object ref called `cv`.

**Example**: A component has a `count` component value with an initial value of `0`.

```
function SomeComponent(){
  var { current: cv } = React.useRef({ count: 0 });

  //...later, somewhere
  {
    console.log(cv.count);

    if(cv.count < 10) cv.count++;
    else cv.countMaxedOut = true; //You may add new Component Values when you need.
  }
}
```

> Don't use `const` for the `cv` because is not semantically constant, is variable.

---
