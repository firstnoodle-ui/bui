<script setup lang="ts">
import type { Placement } from "@floating-ui/dom";
import type { TButtonType, TIcon } from "../types";
import { computed, inject, onBeforeMount, ref } from "vue";
import { BIcon, BLoadSpinner, BTooltip } from "../";
import NotificationBadge from "./NotificationBadge.vue";

const props = withDefaults(
  defineProps<{
    bordered?: boolean;
    classes?: string;
    disabled?: boolean;
    fullwidth?: boolean;
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
    softFocus?: boolean; // remove
    solid?: boolean;
    stopPropagation?: boolean;
    tooltip?: string;
    tooltipDelay?: number;
    tooltipPlacement?: Placement;
    type?: TButtonType;
  }>(),
  {
    bordered: false,
    disabled: false,
    focus: false,
    fullwidth: false,
    loading: false,
    notification: false,
    rounded: false,
    small: false,
    softFocus: false, // remove
    solid: false,
    stopPropagation: false,
    tooltipDelay: 500,
    tooltipPlacement: "top",
    type: "primary",
  },
);

const emit = defineEmits(["click", "blur"]);

const component = ref<string>(props.routerLinkTo ? "router-link" : "button");
const buttonRef = ref<HTMLButtonElement>();
const childOfButtonGroup = inject("childOfButtonGroup", null);

const loadSpinnerClass = computed(() => {
  const classes = ["w-4 h-4"];
  if (props.solid) {
    classes.push("text-light");
  }
  else {
    switch (props.type) {
      case "default":
        classes.push("text-primary");
        break;
      case "primary":
        classes.push("text-action");
        break;
      case "error":
        classes.push("text-destructive");
        break;
    }
  }
  return classes.join(" ");
});

const buttonClasses = computed(() => {
  const result = [];

  // Set padding x.
  // Add extra if rounded and there is a label
  props.rounded && props.label
    ? result.push(props.small ? "px-2" : "px-3")
    : result.push(props.loading && props.icon && !props.label ? "px-0" : "px-2");

  props.small ? result.push("h-6") : result.push("h-8");

  if (props.icon && !props.label) {
    props.small ? result.push("w-6") : result.push("w-8");
  }

  props.bordered && !props.solid ? result.push("border-default") : result.push("border-transparent");

  props.disabled ? result.push("opacity-75 cursor-not-allowed") : result.push("cursor-pointer active:scale-[0.98]");

  props.fullwidth && result.push("w-full");

  /**
   * childOfButtonGroup is an injected boolean (always true) from the ButtonGroup component,
   * so it only exists if the Button is a child of ButtonGroup
   * Classes will be applied from ButtonGroup component
   */
  if (childOfButtonGroup) {
    result.push("z-0 focus:z-10");
  }
  else {
    if (props.rounded) result.push("rounded-full");
    else result.push("rounded-lg");
  }

  switch (props.type) {
    case "default":
      props.solid
        ? result.push(
            "text-light hover:bg-neutralHover active:bg-neutralActive focus-visible:bg-neutralHover",
            props.softFocus ? "bg-neutralHover" : "bg-neutral",
          )
        : result.push(
            "hover:bg-neutralHover active:bg-neutralActive focus-visible:bg-neutralHover text-secondary hover:text-primary",
            props.softFocus ? "bg-neutral-hover" : null,
          );
      break;
    case "primary":
      props.solid
        ? result.push(
            "text-light hover:bg-actionHover active:bg-actionActive focus-visible:bg-actionHover",
            props.softFocus ? "bg-actionHover" : "bg-action",
          )
        : result.push(
            "hover:bg-actionLightHover active:bg-actionLightActive focus-visible:bg-actionLightHover text-action hover:text-actionHover",
            props.softFocus ? "bg-actionLightHover" : null,
          );
      break;
    case "error":
      props.solid
        ? result.push("text-light bg-error hover:bg-errorHover focus-visible:bg-errorActive", props.softFocus ? "bg-error" : "bg-errorHover")
        : result.push("hover:bg-sand-grey-15 focus-visible:bg-sand-grey-40 text-error hover:text-errorHover", props.softFocus ? "bg-subtle" : null);
      break;
  }

  if (props.classes) result.push(props.classes);

  return result.filter(i => i).join(" ");
});

const disabledStyle = computed(() => {
  if (props.disabled) {
    return props.solid ? { filter: "grayscale(50%)" } : { background: "hsl(0 0% 90%)" };
  }
  return {};
});

onBeforeMount(() => {
  if (props.bordered && props.solid) {
    console.warn("[Button]: bordered and solid props should not be used together. Bordered is disabled.");
  }

  /**
   * childOfButtonGroup is an injected function from the ButtonGroup component,
   * so it only exists if the Button is a child of ButtonGroup
   */
  if (props.rounded && childOfButtonGroup) {
    console.warn("[Button]: rounded buttons should not be in a ButtonGroup.");
  }
});

const onClick = (event: MouseEvent) => {
  props.stopPropagation && event.stopPropagation();

  if (!props.disabled && !props.loading) {
    if (props.href) {
      window.open(props.href, "_blank");
    }
    if (props.mailto) window.open(`mailto:${props.mailto}`);
    emit("click");
  }
};

const focus = () => buttonRef.value!.focus();

defineExpose({ focus });
</script>

<template>
  <BTooltip v-if="tooltip" hover :text="tooltip" :delay="tooltipDelay" :placement="tooltipPlacement" :trigger-full-width="fullwidth">
    <component
      :is="component"
      ref="buttonRef"
      :to="routerLinkTo"
      class="z-0 relative inline-flex items-center justify-center space-x-1 leading-none text-sm border focus:z-10 focus:outline-none focus-visible:border-black"
      :class="buttonClasses"
      :disabled="disabled || loading"
      :style="disabledStyle"
      @click="onClick"
      @blur="emit('blur')"
    >
      <BLoadSpinner v-if="loading" :class="loadSpinnerClass" />
      <BIcon v-else-if="icon" :name="icon" />
      <div v-if="label">
        {{ label }}
      </div>
      <BIcon v-if="iconAfter" :name="iconAfter" class="opacity-75" />
      <NotificationBadge v-if="notification" :inside="!bordered && !solid" />
    </component>
  </BTooltip>
  <component
    :is="component"
    v-else
    ref="buttonRef"
    :to="routerLinkTo"
    :target="props.linkTarget"
    class="z-0 relative inline-flex items-center justify-center space-x-1 leading-none text-sm border focus:z-10 focus:outline-none focus-visible:border-black"
    :class="buttonClasses"
    :disabled="disabled || loading"
    :style="disabledStyle"
    @click="onClick"
    @blur="emit('blur')"
  >
    <BLoadSpinner v-if="loading" :class="loadSpinnerClass" />
    <BIcon v-else-if="icon" :name="icon" />
    <div v-if="label">
      {{ label }}
    </div>
    <BIcon v-if="iconAfter" :name="iconAfter" />
    <NotificationBadge v-if="notification" :inside="!bordered && !solid" />
  </component>
</template>
