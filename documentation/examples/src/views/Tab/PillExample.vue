<script setup lang="ts">
import { BTab } from "@firstnoodle-ui/bui";
import { ref } from "vue";

const selected = ref("News");
</script>

<template>
  <nav class="flex items-center w-full gap-2">
    <BTab name="News" icon="news" type="pill" :selected="selected === 'News'" @select="selected = 'News'" />
    <BTab name="Products" icon="box" type="pill" notification :selected="selected === 'Products'" @select="selected = 'Products'" />
    <BTab name="Messages" icon="message" type="pill" :selected="selected === 'Messages'" @select="selected = 'Messages'" />
    <BTab name="Notifications" icon="bell" type="pill" :selected="selected === 'Notifications'" @select="selected = 'Notifications'" />
  </nav>
</template>
