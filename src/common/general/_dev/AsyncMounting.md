## **Asynchronous Component Mounting**

### **Simultaneous Mounting and Mount Time**

**Simultaneous Mounting**: The default behavior of interfaces with React is that they won't display at all until they are fully mounted. This is what I call _Simultaneous Mounting_.

**Mount Time**: There is a time between the trigger event and the interface effectively displaying, the _Mount Time_. It's almost always so small is not noticeable at all, but when the amount and complexity of the mounting Components is too big, the Mount Time becomes really noticeable.

> A noticeable Mount Time feels like you press the button and absolutely nothing happens. A portion of a second later, the interface displays.

### **The Problem and Known Workarounds**

**Only when mounting**: This is of course really unprofessional. The problem might exist only when _Mounting_, meaning everything works nice and fast _after_ the interface is mounted and displayed.

**Unprofessional**: But after-mount efficiency doesn't solve anything. The slow mounting and slow event reaction makes the app feel laggy and heavy, badly optimized. It absolutely can't stay like that.

**Classic Workarounds**: There isn't really a solution for this problem more that completely avoiding it: you are forced to not render many complex Components in a single interface. The classic solution is to separate them in more pages or require more events to display more of them (like a "show more" button).

---

## **The Chad Async Mount**

Solving this problem is as easy as just _not waiting to mount everything before displaying something_. To make React do this, Components must mount asynchronously and display with a delay.

Here is where the `AsyncMounter` makes it's shining entrance. This component allows an asynchronous mount of a secuence of elements. Just pass it the array of elements that shall be asynchronously mounted and **that's it**.

The next example performs an async mount of 100 `SlowMountingComponent`s:

```
function SomeInterface(){

  //...interface's code

  return <>
    {/* ...interface's markup */}

    <AsyncMounter
      renderSecuence={Array(100)
        .fill(0)
        .map(() => <SlowMountingComponent />)}
    />
  </>
}
```

> On the user experience, this async mounting looks like a quick interface rendering cascade.

> If we were to mount these 100 `SlowMountingComponent`s _simultaneously_ after a button is pressed, we would see nothing happening for a certain amount of time after the click. The heavier the Components and higher the quantity, the longer the delay.

### **Chunk divisions**.

**Few Components, no delay**: Some Components take longer to mount than others. You can mount a certain number of them without causing a delay. This is called a _no-delay chunk_.

**Group them in no-delay chunks**: Group the Components in _no-delay chunks_ using the `elementsPerChunk` prop of the `AsyncMounter`. This way, the chunks are mounted asynchronously, but individual Components _in_ the same chunk are mounted simultaneously without causing a delay.

**Criteria**: _How many Components can I fit in a chunk?_ Well, it's about trying. Test how long it takes to mount with a number of `elementsPerChunk`, then change the amount and test again. Repeat until you find an amount of Components for each chunk that doesn't cause a noticeable delay.

**Why?**: You can perfectly avoid chunks, but using them provides a faster mounting interface. It looks better to mount 10 chunks async than 100 elements async.

The following example specifies to the `AsyncMounter` to divide the renderSecuence into chunks of 10 elements.

```
function SomeInterface(){

  //...interface's code

  return <>
    {/* ...interface's markup */}

    <AsyncMounter
      renderSecuence={
        Array(50).fill(0).map(() => <NotSoSlowMountingComponent />)
      }
      elementsPerChunk={10}
    />
  </>
}
```

> The AsyncMounter sees the chunks only, and will mount them asynchronously. Each chunk will mount it's 10 `NotSoSlowMountingComponent`s simultaneously without causing a delay.

> The chunk division can be manually done with a sequence of `Array`s. It allows adding more stuff to the division process if needed.

### **Notes**

The `AsyncMounter` also comes with a bunch of useful props:

- `children [element]`: The `AsyncMounter` admits children, equivalent to passing one element only to the `renderSecuence`. This is incompatible with `renderSecuence` (using both throws an Error).

- `onMount [function]`: Callback to execute whenever an element of the secuence is effectively mounted.

- `onFinish [function]`: Callback to execute when all elements of the secuence were effectively mounted.
