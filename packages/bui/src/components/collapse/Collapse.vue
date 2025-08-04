<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { BButton } from "../";

const props = withDefaults(
  defineProps<{
    alignment?: "left" | "right";
    borderClassOpen?: string;
    borderClassClosed?: string;
    headerBgClass?: string;
    id?: string | number;
    open?: boolean;
    sticky?: boolean;
  }>(),
  {
    alignment: "right",
    borderClassOpen: "border-strong",
    borderClassClosed: "border-default",
    headerBgClass: "bg-primary",
    id: "",
    open: false,
    sticky: false,
  },
);

const emit = defineEmits(["toggle"]);

const buttonRef = ref<HTMLButtonElement>();
const headerRef = ref<HTMLHeadElement>();
const isSticky = ref(false);

const borderClass = computed(() => props.open ? props.borderClassOpen : props.borderClassClosed);
const styles = computed(() => {
  return isSticky.value
    ? {
        top: "-1px",
        paddingTop: "1px",
      }
    : {};
});

watch(
  () => props.open,
  (newValue) => {
    if (!newValue) isSticky.value = false;
  },
);

watch(isSticky, (newValue) => {
  if (newValue) buttonRef.value!.blur();
});

const observer = ref<IntersectionObserver | null>(null);
onMounted(() => {
  if (props.sticky) {
    observer.value = new IntersectionObserver(
      ([e]) => {
        if (props.open) {
          isSticky.value = e.intersectionRatio < 1;
        }
      },
      {
        threshold: [1],
      },
    );

    observer.value.observe(headerRef.value!);
  }
});
onBeforeUnmount(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});
</script>

<template>
  <section class="w-full">
    <header
      ref="headerRef"
      class="w-full border-b"
      :style="styles"
      :class="[
        {
          'shadow-sm-xs border-strong sticky z-10': isSticky,
          'relative': !isSticky,
        },
        borderClass,
        headerBgClass,
      ]"
    >
      <div class="flex items-center w-full h-10">
        <div v-if="alignment === 'left'" class="relative flex-1 min-w-0 flex items-center text-sm">
          <slot name="header" :sticky="isSticky" />
        </div>
        <div class="flex-none w-8 h-8 flex items-center justify-center">
          <BButton
            v-if="$slots.content"
            small
            variant="textSubtle"
            :icon="open ? 'chevron-down-small' : 'chevron-right-small'"
            @click="emit('toggle', id)"
          />
        </div>
        <div v-if="alignment === 'right'" class="relative flex-1 min-w-0 flex items-center text-sm">
          <slot name="header" :sticky="isSticky" />
        </div>
      </div>
    </header>
    <main v-if="open" class="relative">
      <slot name="content" />
    </main>
  </section>
</template>
