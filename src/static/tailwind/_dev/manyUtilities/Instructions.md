## **Tailwind config file for computed classes**.

This `tailwind.config.js` contains two functions that generate classes non existant by default:

- `generateExtensions`: All utilities specified here will **extend** default ones.

- `generateDefinitions`: All classes specified here will **replace** default ones.

The file should be place at highest-level of the project, aside `package.json` and else.
