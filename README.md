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

# publish package
Login to the github npm registry using your **github username** as Username and **your personal access token** as password.

```npm login --registry=https://npm.pkg.github.com```

```pnpm release```
this command runs a script which runs eslint, typechecks packages, auto bump package versions and releases to the registry.

## generate personal access token

You need write permissions to the repository. You create a personal access token in github by clicking your image in the top right corner -> settings -> developer settings (bottom left corner) -> personal access token -> Tokens (classic) -> genereate token -> check write:packages (and read:packages which is auto checked when you select write:packages)

Store the token somewhere safe, you will not be able to see it again.

## install package
login to npm. use your github username as username and your newly generated token as password. Not your github password.

```npm login```

A) if you are adding the package to a new project, then try to install the package

```npm install @firstnoodle-ui/bui --registry=https://npm.pkg.github.com```

B) If the package is already added to your project, then run ```npm install```

If you get errors like floating-ui is not hosted on github, then you have to install those dependencies manually, like you would normally from the public npmjs registry.

the current packages and versions are

``` "@floating-ui/dom": "^1.6.13",
    "@tiptap/extension-bold": "^2.11.7",
    "@tiptap/extension-bullet-list": "^2.11.7",
    "@tiptap/extension-document": "^2.11.7",
    "@tiptap/extension-heading": "^2.11.7",
    "@tiptap/extension-highlight": "^2.11.7",
    "debounce": "^2.2.0",
    "vue-router": "4"
```

Then try to install the package.

If everything fucks up and npm install keeps being a pain in the ass, try to clean the cache. Maybe you have to install the packages manually again before installing bui.. sorry about that.

```npm cache clean --force```

## link to package on github

[bui package on github packages](https://github.com/firstnoodle-ui/bui/pkgs/npm/bui)

## live documentation will some day live on
[live documentation](https://firstnoodle-ui.github.io/bui/)

### tips
The more components your library has, the longer it will take to reflect changes in the playground. If it starts to slow down, consider directly importing the component from the library with a relative path or using a storybook like Histoire, which we'll cover next.
