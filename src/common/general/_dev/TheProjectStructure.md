# **Components Types and Project Structure.**

There are two fundamental types of components to be used all along any React based website. Also there is a clear way of organizing files for each interface.

---

## **View/Layout Components.**

_A view or layout component display aesthetically good elements or layout to the user, receives the user's interactions and handles visual processes._

### **What it might contain.**

- Native HTML elements rendering.
- Other View components rendering.
- Any passed children rendering.
- Both static and dynamic styling.
- _Visual_ processes only.

### **What it shouldn't contain.**

- Manager components rendering.
- Non-visual handlers or processes.
- Redux connections.

### **Notes.**

- A View component shall call-back the logic handlers passed to it from a father Manager Component.

- A View component might be a styled and reactive **Layout Container** that receives and renders `children` passed elements.

---

## **Manager Components.**

_A manager component renders view components and handles all logical or data processes of a certain context of the user interface._

### **What it might contain.**

- Both view or manager components rendering.
- Handling processes.
- Other processes.
- Redux connections.
- API calls and handling.

### **What it shouldn't contain.**

- Native HTML elements rendering.
- Static or dynamic styling.
- Visual logic of any kind.

### **Notes.**

- A Manager component shall pass logical callbacks to View components to be called on user interaction.

- Manager components will always be containers, but never **Layout Containers**.

---

## **Folders/Files Structuration.**

Each interface or "visual-part" in the project must be in it's own folder, where:

- There's one Manager only, which is always the `index.js` of the folder.

- There's always a `Layout` file, which is the general Layout Container of that interface.

- The content may be View Components and/or more interfaces:

  - The content interfaces repeat this structure.

  - The content View Components are always single files.

### **Example.**

- `Contact` (folder of _Contact_ interface)

  - `index` (_Contact_ Manager)

  - `Layout` (_Contact_ Layout Container)

  - `Form` (folder of _Form_ interface)

    - `index` (_Form_ Manager)

    - `Layout` (_Form_ Layout Container)

    - `CustomInput` (_Form_ View Component)

    - `CustomSelect` (_Form_ View Component)

### **All Visual in Layout vs Separated in more View Components**

Choosing between placing all visuals of the interface in it's Layout, or adding separated View Components, is just mere developer/situation preference and not a rule. Sometimes it might be better to separate parts of the visuals.

### **Layout or Everything Visual in the Manager for simple Components**

If the Layout of the interface is relatively simple (simple visual logic, static styles, few elements) then save up files and code, and place it in the Manager.

If both the Layout _and_ the View Components are all relatively simple, then place everything in the Manager.

### **Notes:**

- With this structure, all Managers will always be the `index` files, all Layouts will always be the `Layout` files or within the Manager, and all named files will always be View Components.
