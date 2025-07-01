<script setup lang="ts">
import { BButton, BFlexbox, BTab } from '@firstnoodle/bui';

const tabType = "pill";
</script>

<template>
    <main class="p-4">
        <section class="mb-8">Sketching out Term view</section>
        <BFlexbox justify="end">
            <BButton variant="destructive" icon="trash" label="Delete" />
        </BFlexbox>
        <BFlexbox>
            <BTab :type="tabType" icon="calendar" name="Dates" :selected="true" />
            <BTab :type="tabType" icon="paper" name="Files" :selected="false" />
            <BTab :type="tabType" icon="authority" name="Teachers" :selected="false" />
            <BTab :type="tabType" icon="team" name="Students" :selected="false" />
        </BFlexbox>
    </main>
</template>