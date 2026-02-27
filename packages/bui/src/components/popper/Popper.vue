<script setup lang="ts">
import type { FlipOptions, LimitShiftOptions, OffsetOptions, Placement, ShiftOptions } from "../../types/floating-ui";
import type { TPopperTrigger } from "../types";
import { autoUpdate, computePosition, flip, limitShift, offset, shift } from "@floating-ui/dom";
import debounce from "debounce";
import { nextTick, onMounted, onUnmounted, ref, useSlots, watch } from "vue";
import { useClickOutside, useMounted, useTrapFocus } from "../../composables";
import { sameWidthAsElementMiddleware, sameWidthAsTriggerMiddleware } from "./middleware";

const props = withDefaults(defineProps<{
  closeDelay?: number;
  closeOnClickOutside?: boolean;
  disabled?: boolean;
  flipOptions?: Partial<FlipOptions>;
  limitShiftOptions?: Partial<LimitShiftOptions>;
  offsetOptions?: Partial<OffsetOptions>;
  shiftOptions?: Partial<ShiftOptions>;
  openDelay?: number;
  placement?: Placement;
  popperWidthClass?: string;
  rootClass?: string | string[];
  sameWidthAsElement?: HTMLElement;
  sameWidthAsTrigger?: boolean;
  show?: boolean;
  teleportTarget?: string;
  trigger?: TPopperTrigger;
  triggerClass?: string | string[];
}>(), {
  closeDelay: 20,
  closeOnClickOutside: true,
  disabled: false,
  flipOptions: () => ({}),
  offsetOptions: () => ({}),
  shiftOptions: () => ({}),
  openDelay: 0,
  placement: "bottom-start",
  rootClass: "inline-flex",
  sameWidthAsTrigger: false,
  show: false,
  teleportTarget: "#poppers",
  trigger: "hover",
  triggerClass: "flex",
});

const emit = defineEmits(["open", "close", "updateClickOutside"]);
const slots = useSlots();

// eslint-disable-next-line ts/no-unsafe-function-type
let cleanup: Function | null;

const containerRef = ref<HTMLDivElement>();
const popperRef = ref<HTMLDivElement>();
const triggerRef = ref<HTMLDivElement>();
const isOpen = ref(false);

const { mounted } = useMounted();

const { disableClickOutside, enableClickOutside, updateClickOutside } = useClickOutside(() => closePopper());
const { trapFocus, releaseFocus } = useTrapFocus(popperRef);

const onEscapeKey = (e: KeyboardEvent) => {
  if (e.key === "Escape") close();
};

const update = async () => {
  if (triggerRef.value && popperRef.value) {
    const middleware = [];

    if (props.offsetOptions) middleware.push(offset(props.offsetOptions));
    if (props.flipOptions) middleware.push(flip(props.flipOptions));

    if (props.limitShiftOptions) {
      middleware.push(
        shift({
          ...props.shiftOptions,
          limiter: limitShift(props.limitShiftOptions),
        }),
      );
    }
    else if (props.shiftOptions) {
      middleware.push(shift(props.shiftOptions));
    }

    if (!props.popperWidthClass) {
      if (props.sameWidthAsTrigger) {
        middleware.push(sameWidthAsTriggerMiddleware);
      }
      else if (props.sameWidthAsElement) {
        middleware.push(sameWidthAsElementMiddleware(props.sameWidthAsElement));
      }
    }

    const position = await computePosition(triggerRef.value, popperRef.value, {
      placement: props.placement as Placement,
      middleware,
    });

    popperRef.value.style.left = `${position.x}px`;
    popperRef.value.style.top = `${position.y}px`;
  }
};

onMounted(() => {
  const children = slots.default && slots.default({ visible: isOpen.value });

  if (children && children.length > 1) {
    return console.error(`[Popper]: The <Popper> component expects only one child element at its root. You passed ${children.length} child nodes.`);
  }

  if (!props.popperWidthClass) {
    if (props.sameWidthAsElement && props.sameWidthAsTrigger) {
      console.warn(`[Popper]: The 'sameWidthAsElement' prop will be ignored because 'sameWidthAsTrigger' is set to true`);
    }
  }
  else if (props.sameWidthAsElement || props.sameWidthAsTrigger) {
    console.warn(`[Popper]: The props 'sameWidthAsElement' or 'sameWidthAsTrigger' will be ignored because the 'popperWidthClass' is set`);
  }

  if (props.trigger === "manual" && props.show) {

    openPopperDebounce();
  }
});

onUnmounted(() => {
  // the openDelay might be triggered after the component is onUnmounted

  openPopperDebounce.clear();

  if (cleanup) {
    cleanup();
    cleanup = null;
  }
});

const close = () => {
  openPopperDebounce.clear();
  if (!isOpen.value) return;
  releaseFocus();
  window.removeEventListener("keydown", onEscapeKey);
  isOpen.value = false;

  if (props.trigger !== "hover") {
    const focusable = triggerRef.value?.querySelector<HTMLElement>("button, [href], input, select, textarea, [tabindex]");
    (focusable ?? triggerRef.value)?.focus();
  }

  emit("close");

  props.closeOnClickOutside && disableClickOutside();

  if (cleanup) {
    cleanup();
    cleanup = null;
  }
};

const open = async () => {
  if (isOpen.value) return;
  isOpen.value = true;

  await nextTick();
  emit("open", [triggerRef.value, popperRef.value]);
  cleanup = autoUpdate(triggerRef.value as HTMLElement, popperRef.value as HTMLElement, update);

  props.closeOnClickOutside && popperRef.value && triggerRef.value && enableClickOutside([popperRef.value, triggerRef.value]);

  if (props.trigger !== "hover") {
    nextTick(trapFocus);
    window.addEventListener("keydown", onEscapeKey);
  }
};

const openPopperDebounce = debounce(open, props.openDelay);
const closePopperDebounce = debounce(close, props.closeDelay);

const openPopper = async () => {
  if (props.disabled) return;
  closePopperDebounce.clear();
  openPopperDebounce();
};

const closePopper = async () => {
  openPopperDebounce.clear();
  closePopperDebounce();
};

const onClick = (e: MouseEvent) => {
  if (props.trigger === "click") {
    e.preventDefault();
    e.stopPropagation();

    togglePopper();
  }
};

const updateClickOutsideTargets = (targets: HTMLElement[]) => {
  if (popperRef.value && triggerRef.value) {
    updateClickOutside([popperRef.value, triggerRef.value, ...targets]);
  }
};

const togglePopper = () => (isOpen.value ? closePopper() : openPopper());

/** If Popper is open, we automatically close it if if becomes disabled */
watch(
  () => props.disabled,
  (newValue: boolean) => isOpen.value && newValue && close(),
);

/** If trigger is manual, we open/close popper when prop.show changes */
watch(
  () => props.show,
  (newValue: boolean) => {
    if (props.trigger === "manual") {
      newValue ? openPopperDebounce() : closePopperDebounce();
    }
    else {
      console.warn(`[Popper]: The 'show' prop is only available when the 'trigger' prop is set to 'manual'`);
    }
  },
);

defineExpose({
  close,
  containerRef,
  open,
  updateClickOutsideTargets,
});
</script>

<template>
  <div ref="containerRef" :class="props.rootClass" @mouseleave="props.trigger === 'hover' && closePopper()">
    <div
      ref="triggerRef"
      :class="props.triggerClass"
      @mouseover="props.trigger === 'hover' && openPopper()"
      @click="onClick"
      @focus="props.trigger === 'focus' && openPopper()"
      @keyup.esc="closePopper()"
    >
      <slot :visible="isOpen" />
    </div>
    <Teleport v-if="mounted" :to="teleportTarget">
      <template v-if="!props.disabled && isOpen">
        <div
          ref="popperRef"
          class="absolute"
          :class="props.popperWidthClass"
          @mouseover="props.trigger === 'hover' && openPopper()"
          @mouseleave="props.trigger === 'hover' && closePopper()"
        >
          <slot name="content" :close="close" :is-open="isOpen" />
        </div>
      </template>
    </Teleport>
  </div>
</template>
