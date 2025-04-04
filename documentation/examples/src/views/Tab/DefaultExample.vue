<script setup lang="ts">
import { BTab } from "@firstnoodle-ui/bui";
import { ref } from "vue";

const selected = ref("News");
</script>

<template>
  <nav class="flex items-center w-full">
    <BTab name="News" icon="news" :selected="selected === 'News'" @select="selected = 'News'" />
    <BTab name="Products" icon="box" notification :selected="selected === 'Products'" @select="selected = 'Products'" />
    <BTab name="Messages" icon="message" :selected="selected === 'Messages'" @select="selected = 'Messages'" />
    <BTab name="Notifications" icon="bell" :selected="selected === 'Notifications'" @select="selected = 'Notifications'" />
  </nav>
</template>
