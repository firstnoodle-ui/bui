<script setup lang="ts">
import { BTextHighlight } from "@firstnoodle-ui/bui";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
</script>

<template>
  <ComponentPage title="TextHighlight">
    <ComponentPageSection title="Bold">
      <BTextHighlight bold value="This is a bold test" highlight="bold" />
    </ComponentPageSection>
    <ComponentPageSection title="Underline">
      <BTextHighlight value="You can also use underline" highlight="underline" underline />
    </ComponentPageSection>
    <ComponentPageSection title="Background color">
      <BTextHighlight value="This is background color highlight" highlight="background" background-color="yellow" />
    </ComponentPageSection>
    <ComponentPageSection title="Combined">
      <BTextHighlight
        value="This is combined background color highlight with bold and underline"
        highlight="co"
        underline
        bold
        italic
        background-color="red"
        text-color-class="text-white"
      />
    </ComponentPageSection>
  </ComponentPage>
</template>
