# link to tutorial for setting up mono repo
[complete guide to building a vue js component library](https://soubiran.dev/series/the-complete-guide-to-building-a-vue-js-component-library)
[demo repository](https://github.com/Barbapapazes/huchet-vue/)

# Install

Clone repo

Place it it C:\repos\

## Tailwind intellisense not working
add this key to your VSCode settings.json (CTRL + P -> search for user settings (JSON))

```
"tailwindCSS.experimental.configFile": "documentation/examples/src/assets/main.css"
```

## Ensure to use source link to bui package from main project
**src/assets/main.css**

import tailwind because we need tilwind in our project
set the source to the bui package, because tailwind will only add the classes,
which are using the main project by default. It doesn't know about which classes are used in bui.
By setting the source to the bui package, we instruct tailwind to also include the classes from the bui package into the final .css

@import "tailwindcss";
@source "../../../../packages/bui/src/**/*.{ts,vue}";

# start scripts
in the root repo:

CTRL + SHIFT + P -> Run Task: Start Lib + Docs

### tips
The more components your library has, the longer it will take to reflect changes in the playground. If it starts to slow down, consider directly importing the component from the library with a relative path or using a storybook like Histoire, which we'll cover next.
