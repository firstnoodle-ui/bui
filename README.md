# link to tutorial for setting up mono repo
[complete guide to building a vue js component library](https://soubiran.dev/series/the-complete-guide-to-building-a-vue-js-component-library)
[demo repository](https://github.com/Barbapapazes/huchet-vue/)

# start scripts
./packages/bui -> pnpm run watch
./documentation/examples -> pnpm run start

### tips
The more components your library has, the longer it will take to reflect changes in the playground. If it starts to slow down, consider directly importing the component from the library with a relative path or using a storybook like Histoire, which we'll cover next.
