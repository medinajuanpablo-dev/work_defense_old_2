# Tooled Project Template by SlarDptor.

An art-ready React project built and configured with an Optimal Structure and Workflow, highly enhanced Tailwind and lots of custom Functions and React Tools.

Everything is deeply documented with quick descriptions, use tutorials, and a hard JSDoc typing for VSCode IntelliSense.

---

### **To Use the Template.**

1. _Clone the whole project with `git`_. Avoid copying it directly as it will not ignore `node_modules` and other stuff.

2. _Remove every `/_dev` folder_. Most of them are inside `/general`. They contain development-only files that serve only when developing the tools (which _should not_ be done in the template-based project).

> **General Purpose Tools**: Most tools that come with the template are wrapped in a `/general` folder within their modules. These are general purpose and _will_ be updated later. To make those updates easier, they are (and should stay) separated like this from any other project-specific tool.

3. _Remove Dev Mode_. In `index.js` replace the rendering `DevApp` component with the original `App`. After that, you may safely remove `DevApp` and it's `import`.

4. _Remove the unused_. Feel free to remove any general purpose tools that your project is not going to need (see the _Removing Unused Tools_ below). If you happen to need them later, just include them as adding a new tool (see _Adding New Tools_ below).

---

### **To Develop or Experiment.**

Every tool in this template has an associated **example** easy to execute. This allows a clear use example and a modular development, which is perfect for tools. Examples are all located within the `/_dev` folders in their appropiate modules.

_All general tools development should be done within the template_: Never fix a tool in a project that uses this template, as that update won't be modular and won't neither be reflected for other projects that use the template. If something has to be enhanced or fixed, fix it here and then _update_ the template-based project.

---

### **To Update tools of an existing template-based project.**

- **Updating One Tool:** If just one tool was updated then just copy it's code and overwrite it on the templated-based project.

- **Updating Multiple Tools:** If multiple tools were updated it's better to just do a **full update**. Completely replace the general-purpose tools with the template's: overwrite the contents of `common/general`, `/functions/general`, `/react/general` and `/tailwind`. Don't forget to remove the `/_dev` folders.

- **Adding New Tools:** This is as easy as just adding the new files in their respective folders, then update the `index.js` file that exports them all to include the new tools.

- **Removing Unused Tools:**: The inverse process to adding a new tool. Remove the files of the unused tools and update the `index.js` file that exports them all to not include these anymore.