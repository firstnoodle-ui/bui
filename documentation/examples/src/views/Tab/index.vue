<script setup lang="ts">
import { BTab } from "@firstnoodle/bui";
import { ref } from "vue";
import ComponentPage from "../../components/ComponentPage.vue";

const selected = ref("News");
</script>

<template>
  <ComponentPage title="Tab">
    <nav class="flex items-center w-full">
      <BTab name="News" icon="news" :selected="selected === 'News'" @select="selected = 'News'" />
      <BTab name="Products" icon="box" notification :selected="selected === 'Products'" @select="selected = 'Products'" />
      <BTab name="Messages" icon="message" :selected="selected === 'Messages'" @select="selected = 'Messages'" />
      <BTab name="Notifications" icon="bell" :selected="selected === 'Notifications'" @select="selected = 'Notifications'" />
    </nav>
  </ComponentPage>
</template>
