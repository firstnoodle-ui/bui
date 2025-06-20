<script setup lang="ts">
import { BLoadSpinner } from "../../../..";
import { StatusCard } from "../status-card";
</script>

<template>
  <StatusCard status="Loading" variant="loading">
    <BLoadSpinner />
  </StatusCard>
</template>
