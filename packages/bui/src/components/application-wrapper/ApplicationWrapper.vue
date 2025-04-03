<template>
  <main class="fixed top-0 left-0 w-screen h-screen overflow-hidden">
    <slot />
    <div id="modals" class="z-10 fixed w-screen h-screen top-0 left-0 pointer-events-none" />
    <div id="notifications" class="z-10 fixed w-screen h-screen top-0 left-0 pointer-events-none flex items-end justify-center p-12" />
    <div id="poppers" class="z-10 fixed w-screen h-screen top-0 left-0 pointer-events-none" />
  </main>
</template>
