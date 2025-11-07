<script setup lang="ts">
import type { FlipOptions, LimitShiftOptions, OffsetOptions, Placement, ShiftOptions } from "@floating-ui/dom";
import type { TPopperTrigger } from "../types";
import { autoUpdate, computePosition, flip, limitShift, offset, shift } from "@floating-ui/dom";
import debounce from "debounce";
import { nextTick, onMounted, onUnmounted, ref, useSlots, watch } from "vue";
import { useClickOutside, useMounted } from "../../composables";
import { sameWidthAsElementMiddleware, sameWidthAsTriggerMiddleware } from "./middleware";

const {
  closeDelay = 20,
  disabled = false,
  flipOptions = {},
  limitShiftOptions,
  offsetOptions = {},
  shiftOptions = {},
  openDelay = 0,
  placement = "bottom-start",
  popperWidthClass,
  rootClass = "inline-flex",
  sameWidthAsElement,
  sameWidthAsTrigger = false,
  show = false,
  trigger = "hover",
  triggerClass = "flex",
  useOverlay = false,
} = defineProps<{
  closeDelay?: number;
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
  trigger?: TPopperTrigger;
  triggerClass?: string | string[];
  useOverlay?: boolean;
}>();

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

const update = async () => {
  if (triggerRef.value && popperRef.value) {
    const middleware = [];

    if (offsetOptions) middleware.push(offset(offsetOptions));
    if (flipOptions) middleware.push(flip(flipOptions));

    if (limitShiftOptions) {
      middleware.push(
        shift({
          ...shiftOptions,
          limiter: limitShift(limitShiftOptions),
        }),
      );
    }
    else if (shiftOptions) {
      middleware.push(shift(shiftOptions));
    }

    if (!popperWidthClass) {
      if (sameWidthAsTrigger) {
        middleware.push(sameWidthAsTriggerMiddleware);
      }
      else if (sameWidthAsElement) {
        middleware.push(sameWidthAsElementMiddleware(sameWidthAsElement));
      }
    }

    const position = await computePosition(triggerRef.value, popperRef.value, {
      placement: placement as Placement,
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

  if (!popperWidthClass) {
    if (sameWidthAsElement && sameWidthAsTrigger) {
      console.warn(`[Popper]: The 'sameWidthAsElement' prop will be ignored because 'sameWidthAsTrigger' is set to true`);
    }
  }
  else if (sameWidthAsElement || sameWidthAsTrigger) {
    console.warn(`[Popper]: The props 'sameWidthAsElement' or 'sameWidthAsTrigger' will be ignored because the 'popperWidthClass' is set`);
  }

  if (trigger === "manual" && show) {

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
  isOpen.value = false;
  emit("close");

  !useOverlay && disableClickOutside();

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

  !useOverlay && popperRef.value && triggerRef.value && enableClickOutside([popperRef.value, triggerRef.value]);
};

const openPopperDebounce = debounce(open, openDelay);
const closePopperDebounce = debounce(close, closeDelay);

const openPopper = async () => {
  if (disabled) return;
  closePopperDebounce.clear();
  openPopperDebounce();
};

const closePopper = async () => {
  openPopperDebounce.clear();
  closePopperDebounce();
};

const onClick = (e: MouseEvent) => {
  if (trigger === "click") {
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
  () => disabled,
  (newValue: boolean) => isOpen.value && newValue && close(),
);

/** If trigger is manual, we open/close popper when prop.show changes */
watch(
  () => show,
  (newValue: boolean) => {
    if (trigger === "manual") {
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
  <div ref="containerRef" :class="rootClass" @mouseleave="trigger === 'hover' && closePopper()">
    <div
      ref="triggerRef"
      :class="triggerClass"
      @mouseover="trigger === 'hover' && openPopper()"
      @click="onClick"
      @focus="trigger === 'focus' && openPopper()"
      @keyup.esc="closePopper()"
    >
      <slot :visible="isOpen" />
    </div>
    <Teleport v-if="mounted" to="#poppers">
      <template v-if="!disabled && isOpen">
        <div
          v-if="useOverlay && trigger !== 'hover' && trigger !== 'manual'"
          class="pointer-events-auto absolute w-screen h-screen top-0 left-0 bg-transparent"
          @click="closePopper()"
        >
          <div v-show="!disabled && isOpen" ref="popperRef" class="absolute" :class="popperWidthClass">
            <slot name="content" :close="close" :is-open="isOpen" />
          </div>
        </div>
        <div
          v-else
          ref="popperRef"
          class="absolute"
          :class="popperWidthClass"
          @mouseover="trigger === 'hover' && openPopper()"
          @mouseleave="trigger === 'hover' && closePopper()"
        >
          <slot name="content" :close="close" :is-open="isOpen" />
        </div>
      </template>
    </Teleport>
  </div>
</template>
