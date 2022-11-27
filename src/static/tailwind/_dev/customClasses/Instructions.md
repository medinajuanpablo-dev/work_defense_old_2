## **Custom Tailwind classes.**

These are custom classes that don't come with tailwind at all.

- A `remove` class for obvious reasons.
- Very useful text classes to apply good-looking fonts and styles.
- A bunch of classes to apply text shadow. To use them, add `text-shadow <intensity>`. For instance: `text-shadow light` or `text-shadow medium-3`.
- A bunch of classes to apply box shadow.

---

### **Adding them.**

Paste the content of `index.css` in the same CSS file that contains the `@tailwind` directives. The `@import`s go at the top, and the rest go under the `@tailwind` directives.

```
@import url("...");
@import url("...");
@import url("...");

@tailwind base;

@tailwind components;

@tailwind utilities;

/* The rest goes here */
```
