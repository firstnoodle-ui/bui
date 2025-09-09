<script setup lang="ts">
import { BFlexbox, BTagInput } from "@firstnoodle-ui/bui";
import ComponentPage from "../../components/ComponentPage.vue";

const validatedEmails = [
  {
    mail: "test@dtu.dk",
    error: null
  },
  {
    mail: "test@mail.dk",
    error: "Invalid domain",
  },
  {
    mail: "test",
    error: "Invalid format",
  },
  {
    mail: "test",
    error: "Invalid format",
  },
];

const onDelete = (obj) => console.log(obj);
</script>

<template>
  <ComponentPage title="Tag">
    <BFlexbox class="gap-2">
      <BTagInput v-for="mail in validatedEmails" :key="mail.mail" :label="mail.mail" :error="mail.error" @delete="onDelete(mail)" />
    </BFlexbox>
  </ComponentPage>
</template>
