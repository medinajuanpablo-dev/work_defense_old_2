# **The Importing Structure.**

Let's define an easy importing convention to keep the import zone nice and clean.

---

### **Why?**

There aren't many reasons to do this, but the effort is so low that it's worth it.

- Quick akcnowledgement of how many imports of each kind there is in the file.

- Keep the imports nice and clean.

---

### **Sections.**

There are a bunch of sections or categories from top to bottom of the import zone, based on "proximity" of the imported modules to the file that is doing the importing.

1. Imports from Third-party libraries.

2. Imports from the `@common` and `@state` modules. Also imports from `@static/functions`, `@static/react` and `@static/tailwind`.

3. Imports from `@static/values` and `@static/img` files.

4. Imports from files of a previous folder. Then imports from files of the same folder.
