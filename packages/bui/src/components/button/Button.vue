<script setup lang="ts">
import type { Placement } from "../../types/floating-ui";
import type { ButtonVariant, TIcon } from "../types";
import { computed, ref } from "vue";
import { BIcon, BLoadSpinner, BTooltip } from "../";
import { ButtonLabel, LeftGroup, NotificationBadge } from "./components";

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    classes?: string;
    disabled?: boolean;
    fullwidth?: boolean;
    spaceBetween?: boolean;
    href?: string;
    icon?: TIcon;
    iconAfter?: TIcon;
    label?: string;
    linkTarget?: string;
    loading?: boolean;
    mailto?: string;
    notification?: boolean;
    rounded?: boolean;
    routerLinkTo?: string | { path: string } | { name: string };
    small?: boolean;
    focus?: boolean;
    stopPropagation?: boolean;
    tooltip?: string;
    tooltipDelay?: number;
    tooltipPlacement?: Placement;
  }>(),
  {
    variant: "fill",
    disabled: false,
    focus: false,
    fullwidth: false,
    spaceBetween: false,
    loading: false,
    notification: false,
    rounded: false,
    small: false,
    stopPropagation: false,
    tooltipDelay: 500,
    tooltipPlacement: "top",
  },
);

const emit = defineEmits(["click", "blur"]);

const component = ref<string>(props.routerLinkTo ? "router-link" : "button");
const buttonRef = ref<HTMLButtonElement>();
const tooltipRef = ref<typeof BTooltip>();

const loadSpinnerClass = computed(() => {
  const classes = ["flex-none size-4"];
  if (props.variant === "fill" || props.variant === "destructive") {
    classes.push("text-light");
  }
  else if (props.variant === "outline" || props.variant === "text") {
    classes.push("text-blue-500");
  }
  else if (props.variant === "outlineSubtle" || props.variant === "textSubtle") {
    classes.push("text-slate-700 dark:text-slate-200");
  }
  else if (props.variant === "outlineDestructive") {
    classes.push("text-red-500");
  }
  return classes.join(" ");
});

const buttonClasses = computed(() => {
  const result = [
    "z-0 relative overflow-hidden min-w-0 inline-flex items-center gap-1 border",
    "focus:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black dark:focus-visible:outline-white",
  ];

  // Set padding x.
  // Add extra if rounded and there is a label
  props.rounded && props.label
    ? result.push(props.small ? "px-2" : "px-3")
    : result.push((props.loading || props.icon) && !props.label ? "px-0" : "px-2");

  props.small ? result.push("h-6 text-xs") : result.push("h-8 text-sm");

  if (props.icon && !props.label) {
    props.small ? result.push("w-6") : result.push("w-8");
  }

  props.disabled ? result.push("opacity-75 cursor-not-allowed") : result.push("cursor-pointer");
  props.fullwidth && result.push("w-full");
  result.push(props.spaceBetween ? "justify-between" : "justify-center");

  if (props.rounded) result.push("rounded-full");
  else result.push(props.small ? "rounded" : "rounded-lg");

  switch (props.variant) {
    case "fill":
      result.push(
        ...(props.focus
          ? ["text-white bg-blue-700 border-blue-700 dark:bg-blue-500 dark:border-blue-500"]
          : [
              "bg-blue-500 hover:bg-blue-600 focus-visible:bg-blue-600 active:bg-blue-700",
              "border border-blue-500 hover:border-blue-600 focus-visible:border-blue-600 active:border-blue-700",
              "text-white focus-visible:outline",
              "dark:bg-blue-700 dark:hover:bg-blue-600 focus-visible:bg-blue-600 dark:active:bg-blue-500",
              "border dark:border-blue-700 dark:hover:border-blue-600 focus-visible:border-blue-600 dark:active:border-blue-500",
            ]
        ),
      );
      break;
    case "outline":
      result.push(
        ...(props.focus
          ? ["bg-blue-200 border-blue-700 text-blue-700 dark:bg-blue-700 dark:border-blue-600 dark:text-white"]
          : [
              "hover:bg-blue-100 focus-visible:bg-blue-100 active:bg-blue-200",
              "border border-blue-500 hover:border-blue-600 focus-visible:border-blue-600 active:border-blue-700",
              "text-blue-500 hover:text-blue-600 focus-visible:text-blue-600 active:text-blue-700",
              "dark:hover:bg-blue-900 dark:focus-visible:bg-blue-900 dark:active:bg-blue-700",
              "dark:border-blue-500 dark:hover:border-blue-500 dark:focus-visible:border-blue-500 dark:active:border-blue-600",
              "dark:text-blue-500 dark:hover:text-blue-100 focus-visible:text-blue-100 dark:active:text-white",
            ]
        ),
      );
      break;
    case "outlineSubtle":
      result.push(
        ...(props.focus
          ? ["bg-slate-200 border-stone-500 text-slate-900 dark:bg-neutral-600 dark:border-stone-500 dark:text-white"]
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
      break;
    case "text":
      result.push(
        ...(props.focus
          ? ["border-none bg-blue-200 text-blue-700 dark:bg-blue-700 dark:text-white"]
          : [
              "hover:bg-blue-100 focus-visible:bg-blue-100 active:bg-blue-200",
              "border-none",
              "text-blue-500 hover:text-blue-600 focus-visible:text-blue-600 active:text-blue-700",
              "dark:hover:bg-blue-900 dark:focus-visible:bg-blue-900 dark:active:bg-blue-700",
              "dark:text-blue-500 dark:hover:text-blue-100 dark:focus-visible:text-blue-100 dark:active:text-white",
            ]
        ),
      );
      break;
    case "textSubtle":
      result.push(
        ...(props.focus
          ? ["border-none bg-slate-200 text-slate-900 dark:bg-neutral-600 dark:text-white"]
          : [
              "hover:bg-slate-100 focus-visible:bg-slate-100 active:bg-slate-200",
              "border-none",
              "text-slate-700 hover:text-slate-800 focus-visible:text-slate-800 active:text-slate-900",
              "dark:hover:bg-neutral-700 dark:focus-visible:bg-neutral-700 dark:active:bg-neutral-600",
              "dark:text-slate-200 dark:hover:text-slate-100 dark:focus-visible:text-slate-100 dark:active:text-white",
            ]
        ),
      );
      break;
    case "destructive":
      result.push(
        ...(props.focus
          ? ["bg-red-800 border-red-800 text-white"]
          : [
              "bg-red-600 hover:bg-red-700 focus-visible:bg-red-700 active:bg-red-800",
              "border border-red-600 hover:border-red-700 focus-visible:border-red-700 active:border-red-800",
              "text-white",
            ]
        ),
      );
      break;
    case "outlineDestructive":
      result.push(
        ...(props.focus
          ? ["bg-red-200 border-red-700 text-red-700 dark:bg-red-900 dark:border-red-600 dark:text-red-100"]
          : [
              "hover:bg-red-100 focus-visible:bg-red-100 active:bg-red-200",
              "border border-red-500 hover:border-red-600 focus-visible:border-red-600 active:border-red-700",
              "text-red-500 hover:text-red-600 focus-visible:text-red-600 active:text-red-700",
              "dark:hover:bg-red-900/50 dark:focus-visible:bg-red-900/50 dark:active:bg-red-900",
              "dark:border-red-500 dark:hover:border-red-400 dark:focus-visible:border-red-400 dark:active:border-red-300",
              "dark:text-red-500 dark:hover:text-red-400 dark:focus-visible:text-red-400 dark:active:text-red-300",
            ]
        ),
      );
      break;
  }

  if (props.classes) result.push(props.classes);

  return result.filter(i => i).join(" ");
});

const disabledStyle = computed(() => {
  if (props.disabled) {
    return props.variant === "fill" || props.variant === "destructive" ? { filter: "grayscale(50%)" } : { opacity: "0.5" };
  }
  return {};
});

const onClick = (event: MouseEvent) => {
  props.stopPropagation && event.stopPropagation();

  if (!props.disabled && !props.loading) {
    if (props.href) {
      window.open(props.href, "_blank");
    }
    if (props.mailto) window.open(`mailto:${props.mailto}`);
    if (props.tooltip) tooltipRef.value?.hide();
    emit("click");
  }
};

const focus = () => buttonRef.value!.focus();

defineExpose({ focus });
</script>

<template>
  <BTooltip
    v-if="tooltip"
    ref="tooltipRef"
    :text="tooltip"
    :delay="tooltipDelay"
    :placement="tooltipPlacement"
    :trigger-full-width="fullwidth"
  >
    <component
      :is="component"
      ref="buttonRef"
      :to="routerLinkTo"
      :class="buttonClasses"
      :disabled="disabled || loading"
      :style="disabledStyle"
      @click="onClick"
      @blur="emit('blur')"
    >
      <LeftGroup>
        <BLoadSpinner v-if="loading" :class="loadSpinnerClass" />
        <BIcon v-else-if="icon" :name="icon" />
        <ButtonLabel v-if="label" :label="label" />
      </LeftGroup>
      <BIcon v-if="iconAfter" :name="iconAfter" class="opacity-75" />
      <NotificationBadge v-if="notification" :inside="variant === 'text' || variant === 'textSubtle'" />
    </component>
  </BTooltip>
  <component
    :is="component"
    v-else
    ref="buttonRef"
    :to="routerLinkTo"
    :target="props.linkTarget"
    :class="buttonClasses"
    :disabled="disabled || loading"
    :style="disabledStyle"
    @click="onClick"
    @blur="emit('blur')"
  >
    <LeftGroup>
      <BLoadSpinner v-if="loading" :class="loadSpinnerClass" />
      <BIcon v-else-if="icon" :name="icon" />
      <ButtonLabel v-if="label" :label="label" />
    </LeftGroup>
    <BIcon v-if="iconAfter" :name="iconAfter" />
    <NotificationBadge v-if="notification" :inside="variant === 'text' || variant === 'textSubtle'" />
  </component>
</template>
