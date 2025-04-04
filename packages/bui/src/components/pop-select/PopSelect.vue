<script setup lang="ts" generic="T extends TPopSelectOption">
import type { Placement } from "@floating-ui/dom";
import type { TIcon, TPopSelectOption, TPopSelectResultFilter } from "../types";
import { computed, nextTick, onBeforeMount, ref, useSlots, watch, withDefaults } from "vue";
import { BIcon, BLoadSpinner, BPopper, BPopperContent, BScrollbar, BTextHighlight } from "../";
import { useNextFrame } from "../../composables";
import { debounce, scrollIntoView } from "../../utils";
import { State } from "./enums.ts";
import PopSelectOption from "./option.vue";
import ResultFilters from "./ResultFilters.vue";

const props = withDefaults(
  defineProps<{
    resetOnClose?: boolean;
    debounceMs?: number;
    disabled?: boolean;
    emptyStateIcon?: TIcon;
    emptyStateText?: string;
    filterable?: boolean;
    fixedHeight?: boolean;
    keepOpen?: boolean;
    loading?: boolean;
    loadingText?: string;
    options: T[];
    placeholder?: string;
    placement?: Placement;
    popperWidthClass?: string;
    // eslint-disable-next-line ts/no-unsafe-function-type
    remoteMethod?: Function | null;
    resultFilters?: TPopSelectResultFilter<T>[];
    rootClass?: string;
    sameWidthAsElement?: HTMLElement;
    sameWidthAsTrigger?: boolean;
    selected?: TPopSelectOption | TPopSelectOption[];
    triggerClass?: string;
  }>(),
  {
    resetOnClose: false,
    debounceMs: 300,
    disabled: false,
    emptyStateIcon: "keyboard",
    emptyStateText: "Type to search",
    filterable: false,
    fixedHeight: false,
    keepOpen: false,
    loading: false,
    loadingText: "Loading...",
    placeholder: "Search",
    placement: "bottom-start",
    remoteMethod: null,
    sameWidthAsTrigger: false,
  },
);
const emit = defineEmits(["close", "save-custom", "select"]);
const slots = useSlots() as ReturnType<typeof useSlots>;

const hoveredOption = ref<TPopSelectOption | null>(null);
const localOptions = ref<TPopSelectOption[]>([]);
const currentQuery = ref("");

const contentRef = ref<typeof BPopperContent>();
const errorRef = ref<HTMLElement>();
const inputRef = ref<HTMLInputElement>();
const optionsRef = ref();
const popperRef = ref<typeof BPopper>();
const scrollbarRef = ref<typeof BScrollbar>();

const localResultFilters = ref<TPopSelectResultFilter<T>[]>(props.resultFilters || []);
const selectedResultFilter = ref<TPopSelectResultFilter<T> | null>(props.resultFilters ? props.resultFilters[0] : null);

const { nextFrame } = useNextFrame();

const selectedOptions = computed(() => {
  if (!props.selected) return [];
  return Array.isArray(props.selected) ? props.selected : [props.selected];
});

const allOptionsDisabled = computed(() => {
  return localOptions.value.every((option: TPopSelectOption) => option.disabled as boolean);
});

const emptyState = computed(() => {
  return !currentQuery.value.length && !localOptions.value.length;
});

const noSearchResults = computed(() => {
  return currentQuery.value.length && !localOptions.value.length;
});

const state = computed(() => {
  if (errorRef.value) return State.ERROR;
  if (props.loading) return State.LOADING;
  if (noSearchResults.value && !props.loading) return State.NO_MATCH;
  if (emptyState.value && !props.loading) return State.IDLE;
  if (localOptions.value.length && !props.loading) return State.MATCH;
  return undefined;
});

const updateLocalOptions = (options: T[]) => {
  localOptions.value = selectedResultFilter.value ? options.filter(selectedResultFilter.value.execute) : options;

  // update counts
  if (props.resultFilters) {
    localResultFilters.value.forEach((filter) => {
      filter.count = options.filter(filter.execute).length;
    });
  }
};

watch(
  () => props.options,
  (newValue: T[]) => {
    updateLocalOptions(newValue);
    hoveredOption.value = null;
  },
);

onBeforeMount(() => {
  if (props.filterable && props.remoteMethod) {
    console.warn("[PopSelect] should not have both \"filterable\" and \"remoteMethod\" props at the same time");
  }
  updateLocalOptions(props.options);
});

// triggers onClose event when popper is closed
const close = () => popperRef.value!.close();
const focus = () => popperRef.value!.open();

const onOpen = async () => {
  nextFrame(() => {
    if (scrollbarRef.value) {
      nextFrame(() => scrollbarRef.value!.update());
    }
    if (inputRef.value) {
      nextFrame(() => inputRef.value!.focus());
    }
  });
};

const onClose = () => {
  if (props.keepOpen) return;

  hoveredOption.value = null;

  if (props.resetOnClose) {
    currentQuery.value = "";
    props.remoteMethod ? props.remoteMethod("") : updateLocalOptions([]);
    selectedResultFilter.value = props.resultFilters ? props.resultFilters[0] : null;
  }

  emit("close");
};

const onSelect = (option: TPopSelectOption) => {
  emit("select", option);
  if (!props.keepOpen) close();
};

const filterOptions = (query: string) => (localOptions.value = props.options.filter(o => o.label.toLowerCase().includes(query.toLowerCase())));

const onQuery = async (event: Event) => {
  const query = (event.target as HTMLInputElement).value;

  hoveredOption.value = null;

  if (props.filterable) {
    filterOptions(query);
  }
  else if (props.remoteMethod) {
    await props.remoteMethod(query);
  }
};

const debounceOnQuery = debounce(onQuery, props.debounceMs);

const onOptionHover = (label: string) => {
  hoveredOption.value = localOptions.value.find(o => o.label === label) || null;
};

const scrollToOption = (option: TPopSelectOption) => {
  if (!optionsRef.value.length) return;

  const target = optionsRef.value[localOptions.value.findIndex(o => o.label === option.label)].$el;

  if (scrollbarRef.value && target) {
    const menu: HTMLElement | null = scrollbarRef.value.$el.querySelector(".scrollbar__wrap");
    if (menu) {
      scrollIntoView(menu, target);
      scrollbarRef.value.handleScroll();
    }
  }
};

const navigateOptions = async (direction: "next" | "prev") => {
  if (localOptions.value.length === 0) return;

  let hoverIndex = localOptions.value.findIndex(o => o.label === hoveredOption.value?.label);

  if (!allOptionsDisabled.value) {
    if (direction === "next") {
      hoverIndex++;
      if (hoverIndex === localOptions.value.length) {
        hoverIndex = 0;
      }
    }
    else if (direction === "prev") {
      hoverIndex--;
      if (hoverIndex < 0) {
        hoverIndex = localOptions.value.length - 1;
      }
    }
    hoveredOption.value = localOptions.value[hoverIndex];

    if (hoveredOption.value.disabled === true) {
      navigateOptions(direction);
    }

    await nextTick();

    if (hoveredOption.value) {
      scrollToOption(hoveredOption.value);
    }
  }
};

const selectOption = () => {
  if (hoveredOption.value) {
    onSelect(hoveredOption.value);
  }
  else if (currentQuery.value.length) {
    emit("save-custom", currentQuery.value);
  }
};

const onResultFilterChange = (filter: TPopSelectResultFilter<T>) => {
  selectedResultFilter.value = filter;
  updateLocalOptions(props.options);
  inputRef.value!.focus();
};

defineExpose({ close, focus });
</script>

<template>
  <BPopper
    ref="popperRef"
    trigger="click"
    :placement="placement"
    :disabled="disabled"
    :popper-width-class="popperWidthClass"
    :same-width-as-element="sameWidthAsElement"
    :same-width-as-trigger="sameWidthAsTrigger"
    :root-class="rootClass"
    :trigger-class="triggerClass"
    @close="onClose"
    @open="onOpen"
  >
    <template #default="slotProps">
      <slot name="trigger" :disabled="disabled" :visible="slotProps && slotProps.visible" />
    </template>

    <template #content>
      <BPopperContent ref="contentRef" class="flex flex-col" :class="{ 'h-72': fixedHeight }">
        <header v-if="filterable || remoteMethod || resultFilters" class="border-b border-default">
          <header v-if="filterable || remoteMethod" class="flex items-center w-full px-3 space-x-2 bg-light overflow-hidden">
            <BIcon name="magnifying-glass" class="text-light-blue" />
            <input
              ref="inputRef"
              v-model="currentQuery"
              type="text"
              class="w-full h-8 text-sm leading-none bg-light rounded-tr-lg focus:outline-none"
              :placeholder="placeholder"
              @click.stop.prevent
              @input="debounceOnQuery"
              @keydown.down.prevent="navigateOptions('next')"
              @keydown.up.prevent="navigateOptions('prev')"
              @keydown.enter.prevent="selectOption"
              @keydown.esc.stop.prevent="onClose"
            >
          </header>
          <ResultFilters
            v-if="resultFilters"
            show-counts
            :filters="localResultFilters"
            :selected="selectedResultFilter"
            @change="onResultFilterChange"
          />
        </header>

        <div v-if="$slots.error" ref="errorRef" class="flex-1 bg-light h-full">
          <slot name="error" />
        </div>
        <div v-else-if="state === State.LOADING" class="flex-1">
          <div class="flex items-center space-x-2 bg-light text-tertiary py-3 px-3">
            <BLoadSpinner class="w-4 h-4 text-granite-grey" />
            <span class="italic leading-none text-sm">{{ loadingText }}</span>
          </div>
        </div>
        <div v-else-if="state === State.NO_MATCH" class="flex-1">
          <div class="flex space-x-2 bg-light text-tertiary py-3 px-3">
            <div class="w-4 h-4 text-center leading-none">
              ...
            </div>
            <span class="italic leading-none text-sm">Nothing matches your input</span>
          </div>
        </div>
        <div v-else-if="state === State.IDLE" class="flex-1">
          <div class="flex items-center space-x-2 bg-light text-tertiary py-3 px-3">
            <BIcon :name="emptyStateIcon" />
            <span class="italic leading-none text-sm">{{ emptyStateText }}</span>
          </div>
          <div class="h-8 w-full bg-light" />
        </div>

        <BScrollbar v-else-if="state === State.MATCH" ref="scrollbarRef">
          <div class="max-h-60 bg-light">
            <PopSelectOption
              v-for="option in localOptions"
              ref="optionsRef"
              :key="option.id || option.label"
              :disabled="option.disabled"
              :label="option.label"
              :hovered-option="hoveredOption"
              :selected="selectedOptions.includes(option)"
              @focus="onOptionHover"
              @hover="onOptionHover"
              @click="onSelect(option)"
            >
              <div class="flex items-center space-x-2">
                <BIcon v-if="option.icon" :name="option.icon" />
                <BTextHighlight bold underline :value="option.label" :highlight="currentQuery" />
              </div>
              <div v-if="option.meta" class="text-secondary">
                {{ option.meta }}
              </div>
            </PopSelectOption>
          </div>
        </BScrollbar>

        <footer v-if="slots.footer" class="flex-none border-t border-default bg-light">
          <slot name="footer" />
        </footer>
      </BPopperContent>
    </template>
  </BPopper>
</template>
