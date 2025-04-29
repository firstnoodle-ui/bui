<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { BIcon } from "../";

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
    borderClassOpen: "border-default",
    borderClassClosed: "border-subtle",
    headerBgClass: "bg-white",
    id: "",
    open: false,
    sticky: false,
  },
);

const emit = defineEmits(["toggle"]);

const buttonRef = ref<HTMLButtonElement>();
const headerRef = ref<HTMLHeadElement>();
const isSticky = ref(false);

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
          [props.borderClassOpen]: open,
          [props.borderClassClosed]: !open,
          'shadow-sm border-brand': isSticky,
          'sticky z-10': isSticky,
          'relative': !isSticky,
        },
        headerBgClass,
      ]"
    >
      <div class="flex items-center w-full h-10">
        <div v-if="alignment === 'left'" class="relative flex-1 min-w-0 flex items-center text-sm">
          <slot name="header" :sticky="isSticky" />
        </div>
        <div class="flex-none w-8 h-8 flex items-center justify-center">
          <button
            v-if="$slots.content"
            ref="buttonRef"
            class="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-black hover:bg-opacity-10 focus:outline-none focus-visible:bg-black focus-visible:bg-opacity-10"
            @click="emit('toggle', id)"
          >
            <BIcon
              :name="alignment === 'right' ? 'chevron-right' : 'chevron-up'"
              class="transform transition-all duration-100"
              :class="{ [alignment === 'right' ? 'rotate-90' : 'rotate-180']: open }"
            />
          </button>
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
