# **The Static or Indicated Styles Structure.**

There's a clear pattern or structure to follow when defining the styles of an Indicated or a Static Component.

---

### **A Styles Object for each component.**

- Every component shall have it's own constant styles object _below_ it's definition, where _all_ styles shall be placed. We will call this the _Styles Object_.

- If the component is "stylizable" (styles customizable through props), the Styles Object is called the Default Styles Object.

- If the component is indicated (calls the `useIndicatedStyles` hook), then the Styles Object is called the Directed Styles Object. This does _not_ apply if the component is applying custom directed styles to a rendering Indicated Component.

---

### **A field for each element.**

- Each rendered element shall have it's own field within the Styles Object, where _all_ styles for that element will be placed.

- The same applies for children Stylizable Component that receives a customizer Styles Object: it shall be itself another Styles Object with the custom styles, contained within the general Styles Object.

> This rule can be ignored in certain contexts where it might be inconvenient for readability to place Custom Styles within the Styles Object.

---

## **Composition of a styles string.**

### _Base Styles_.

- The first and actually longest part of the styles string of an element are the default/static/non-directed styles. You can call these the Base Styles.

- These styles will be replaced by responsive styles or directed styles when appropiate indicators activate.

### _Responsive Styles_.

- The responsive modifications for each breakpoint that changes something.

- All styles of a single breakpoint must be separated from the Base Styles and other breakpoints styles by a vertical bar `|`.

### _Directed Styles_.

- The last part of the styles string is for the directed styles, if there's any.

- All directed styles must be separated from the rest by a double vertical bar `||`.

---

### **The Styles Object Notation**

The Styles Object documentation of every customizable component includes a notation indicating if the styles of a particular element should be changed or not.

- **CNR**: For _Change Not Recommended_. Changes here are not necessary. You should not aim to change these styles unless there's no other way around.

- **CWC**: For _Change With Caution_. These shall be changed but might be somewhat complex and you should be cautious when adding or changing something.

- **CS**: For _Change Safely_. Styles simple enough to to be safely customized.
