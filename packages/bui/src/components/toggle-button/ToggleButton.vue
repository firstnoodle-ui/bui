<script setup lang="ts">
import type { Placement } from "../../types/floating-ui";
import type { TIcon } from "../types";
import { computed, ref } from "vue";
import { BIcon, BTooltip } from "../";

const props = withDefaults(
  defineProps<{
    active: boolean;
    disabled?: boolean;
    icon?: TIcon;
    label?: string;
    focus?: boolean;
    stopPropagation?: boolean;
    tooltip?: string;
    tooltipDelay?: number;
    tooltipPlacement?: Placement;
  }>(),
  {
    disabled: false,
    focus: false,
    loading: false,
    notification: false,
    stopPropagation: false,
    tooltipDelay: 500,
    tooltipPlacement: "top",
  },
);

const emit = defineEmits(["click", "blur"]);

const buttonRef = ref<HTMLButtonElement>();

const buttonClasses = computed(() => {
  const result = [];

  if (props.icon && !props.label) {
    result.push("w-6");
  }

  props.disabled ? result.push("opacity-75 cursor-not-allowed") : result.push("cursor-pointer");
  result.push("rounded-md");

  result.push(
    ...(props.active
      ? [
          "bg-blue-100 hover:bg-blue-200 focus-visible:bg-blue-200 active:bg-blue-300",
          "border border-action hover:border-action-hover focus-visible:border-action-hover active:border-action-active",
          "text-action hover:text-action-hover focus-visible:text-action-hover active:text-action-active",
          "dark:bg-blue-800/25 dark:hover:bg-blue-800/50 dark:focus-visible:bg-blue-800/50 dark:active:bg-blue-800/75",
          "dark:border-action dark:hover:border-action-hover dark:focus-visible:border-action-hover dark:active:border-action-active",
          "dark:text-action dark:hover:text-action-hover dark:focus-visible:text-action-hover dark:active:text-action-active",
        ]
      : [
          "hover:bg-slate-100 focus-visible:bg-slate-100 active:bg-slate-200",
          "border border-stone-300 hover:border-stone-400 focus-visible:border-stone-400 active:border-stone-500",
          "text-slate-700 hover:text-slate-800 focus-visible:text-slate-800 active:text-slate-900",
          "dark:hover:bg-neutral-700 dark:focus-visible:bg-neutral-700 dark:active:bg-neutral-600",
          "dark:border-stone-700 dark:hover:border-stone-600 dark:focus-visible:border-stone-600 dark:active:border-stone-500",
          "dark:text-slate-200 dark:hover:text-slate-100 dark:focus-visible:text-slate-100 dark:active:text-white",
        ]
    ),
  );

  return result.filter(i => i).join(" ");
});

const disabledStyle = computed(() => {
  if (props.disabled) {
    return { background: "hsl(0 0% 90%)" };
  }
  return {};
});

const onClick = (event: MouseEvent) => {
  props.stopPropagation && event.stopPropagation();

  if (!props.disabled) {
    emit("click");
  }
};

const focus = () => buttonRef.value!.focus();

defineExpose({ focus });
</script>

<template>
  <BTooltip v-if="tooltip" hover :text="tooltip" :delay="tooltipDelay" :placement="tooltipPlacement">
    <button
      ref="buttonRef"
      class="z-0 relative inline-flex items-center justify-center gap-1 h-6 leading-none text-sm border focus:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black dark:focus-visible:outline-white"
      :class="buttonClasses"
      :disabled="disabled"
      :style="disabledStyle"
      @click="onClick"
      @blur="emit('blur')"
    >
      <BIcon v-if="icon" :name="icon" />
      <div v-if="label">
        {{ label }}
      </div>
    </button>
  </BTooltip>
</template>
