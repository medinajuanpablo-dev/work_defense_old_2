## **Merging Styles with Tailwind.**

### **What is merge styles, and why merge styles?**

Let's call merge styles to the act of applying styles to an element and those added last take priority over changing the same properties.

**Situation:** We know that in `"text-gray-500 bg-white text-lg bg-white text-white"`, tailwind will completely ignore the white text. Let's say we can't use important styles.

---

### **Merge would solve it:**

This is how `mergeStyles` works:

```
mergeStyles("text-gray-500 text-lg bg-white", "text-white")

=> "text-lg text-black text-white"
```

---

### **When would you need to merge styles?**

Just think of any conditional styles; apply some in certain situations that conflicts with the initial or previous ones.

**Example**: A custom indicator to make a border red when something is wrong, but the border is already blue so the red one won't apply.

**Not often, but annoying**: This won't be needed too often, but when it does it sucks there is no **fucking** way of doing it.

---

## **Priority to the end.**

Using this, last added styles have the high ground. If you want those styles applied above all cases,
place them last in the styles string (`className`). You can play with priorities this way.
