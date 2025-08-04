<script setup lang="ts" generic="T extends SelectListOption">
import type { ScrollIntersectionEvent } from "../../components";
import type { SelectListFilter, SelectListOption, SelectListOptionGroup, SelectListProps, SelectListState } from "./types.ts";
import debounce from "debounce";
import { computed, nextTick, onBeforeMount, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { BButton, BCheckbox, BInput, BScrollbar } from "../..";
import { useNextFrame } from "../../composables";
import { scrollIntoView } from "../../utils";

import { BErrorCard, BIdleCard, BLoadingCard, BNoMatchCard } from "./components/status-cards";

const props = withDefaults(defineProps<SelectListProps>(), {
  identifier: "label",
  loading: false,
  placeholder: "Search",
  small: false,
  remoteMethod: null,
});

// TODO:
// Control fixed height via props. See style attribute in root <div/>

const emit = defineEmits(["escape", "selectQuery", "select"]);

const { nextFrame } = useNextFrame();

const hoveredOption = ref<SelectListOption | null>(null);
const localOptions = ref<SelectListOption[] | SelectListOptionGroup[]>([]);
const searchQuery = ref("");

const selectListRef = ref<HTMLDivElement>();
const optionsRef = ref();
const scrollbarRef = ref<typeof BScrollbar>();
const selectedOptionsRef = ref();
const selectionScrollbarRef = ref<typeof BScrollbar>();

const selectedOptionFilter = ref<SelectListFilter | null>(props.filters ? props.filters[0] : null);
const selectionOpen = ref(false);
const selectionOverflow = ref(false);
const selectionScrollClasses = ref("");

// we need to know if the options passed is an array of options or option groups
const isOptionGroup = (obj: unknown): obj is SelectListOptionGroup => {
  if (!Array.isArray(obj)) throw new Error("Item passed must be an Array");
  if (obj.length === 0) return false;
  return "options" in obj[0];
};
const isGrouped = computed(() => isOptionGroup(props.options));
const flattenedOptions = computed((): SelectListOption[] => {
  if (!isGrouped.value) return props.options as SelectListOption[];
  return (props.options as SelectListOptionGroup[]).flatMap((group: SelectListOptionGroup) => group.options);
});

const state = computed((): SelectListState => {
  if (props.loading) return "loading";
  if (props.errorMessage) return "error";
  if (searchQuery.value.length && !localOptions.value.length) return "no match";
  if (localOptions.value.length) return "match";
  return "idle";
});

const isMultiselect = computed(() => props.selected && "length" in props.selected);

const selectedCount = computed(() => {
  if (!props.selected) return 0;
  return isMultiselect.value ? (props.selected as T[]).length : 1;
});

const allOptionsSelected = computed(() => {
  if (!props.selected) return false;
  // TODO - consider whether or not we should show "all selected" when a filter is applied and all the filtered items has been selected
  // introduces complexity, as we need to check if exactely the same options are selected and not just the count
  // plus what if more items are selected than the filtered... this is why I will currently abandon this idea

  if (selectedOptionFilter.value) {
    return (props.selected as T[]).length >= flattenedOptions.value.filter(selectedOptionFilter.value.execute).length;
  }

  return isMultiselect.value ? (props.selected as T[]).length === flattenedOptions.value.length : false;
});

const noSelection = computed(() => {
  if (!props.selected) return true;
  return isMultiselect.value ? !(props.selected as T[]).length : !props.selected;
});

watch(() => props.selected, (newValue: SelectListOption | SelectListOption[] | null) => {
  if (newValue && selectionOpen.value) {
    nextFrame(() => {
      scrollbarRef.value!.update();

      if (isMultiselect.value && selectedCount.value) {
        const target = selectedOptionsRef.value[selectedOptionsRef.value.length - 1].$el;
        const scrollView: HTMLElement | null = selectionScrollbarRef.value!.$el.querySelector(".scrollbar__wrap");
        if (scrollView) {
          scrollIntoView(scrollView, target);
          selectionScrollbarRef.value!.handleScroll();
        }
      }
    });
  }
});

watch(() => props.options, (newValue: SelectListOption[] | SelectListOptionGroup[]) => {
  // eslint-disable-next-line ts/no-use-before-define
  updateLocalOptions(newValue);
  hoveredOption.value = null;
});

// eslint-disable-next-line ts/no-use-before-define
onBeforeMount(() => updateLocalOptions(props.options));
onMounted(() => {
  if (!isMultiselect.value && props.selectAll) {
    console.warn("[SelectList] selectAll prop not allowed when SelectList is not isMultiselect. You need to pass an Array of selected options (or empty) if you want it to be isMultiselect.");
  }

  nextFrame(() => {
    if (scrollbarRef.value) scrollbarRef.value!.update();
    // eslint-disable-next-line ts/no-use-before-define
    selectListRef.value!.addEventListener("keydown", onKeydown);
  });
  // focusSearch();
});

// eslint-disable-next-line ts/no-use-before-define
onBeforeUnmount(() => selectListRef.value!.removeEventListener("keydown", onKeydown));

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    // eslint-disable-next-line ts/no-use-before-define
    selectOption();
  }
  else if (event.key === "Escape") {
    emit("escape");
  }
  else if (event.key === "ArrowDown") {
    // eslint-disable-next-line ts/no-use-before-define
    navigateOptions("next");
  }
  else if (event.key === "ArrowUp") {
    // eslint-disable-next-line ts/no-use-before-define
    navigateOptions("prev");
  }
};

const onSelect = (option: SelectListOption) => {
  if (isMultiselect.value) {
    const newSelection = (props.selected as T[]).map(i => i.label).includes(option.label)
      ? [...(props.selected as T[]).filter(i => i.label !== option.label)]
      : [...(props.selected as T[]), option];
    emit("select", newSelection);
  }
  else {
    emit("select", option);
  }
};

const selectOption = () => {
  if (hoveredOption.value) {
    onSelect(hoveredOption.value);
  }
  else if (searchQuery.value.length) {
    emit("selectQuery", searchQuery.value);
  }
};

const optionIsSelected = (option: SelectListOption) => {
  if (!props.selected) return false;

  if (isMultiselect.value) {
    return (props.selected as T[]).some(o => o[props.identifier] === (option as T)[props.identifier]);
  }

  return (option as T)[props.identifier] === (props.selected as T)[props.identifier];
};

const onSearch = async (value: string) => {
  searchQuery.value = value;
  hoveredOption.value = null;

  if (props.searchFunction) {
    await props.searchFunction(value);
  }
};
const debounceOnSearch = props.searchDebounce ? debounce(onSearch, props.searchDebounce) : onSearch;

const updateLocalOptions = (options: SelectListOption[] | SelectListOptionGroup[]) => {
  if (isGrouped.value) {
    const groups = options as SelectListOptionGroup[];
    localOptions.value = groups.map(group => ({
      ...group,
      options: selectedOptionFilter.value ? group.options.filter(selectedOptionFilter.value?.execute) : group.options,
    }));
  }
  else {
    const flatOptions = options as SelectListOption[];
    localOptions.value = selectedOptionFilter.value ? flatOptions.filter(selectedOptionFilter.value?.execute) : flatOptions;
  }

  // Update option filter counts
  // if (props.filters) {
  //   localOptionFilters.value.forEach((filter) => {
  //     filter.count = isGrouped.value
  //       ? options.reduce((acc: number, group: SelectListOptionGroup): number => {
  //           acc += group.options.filter(filter.execute).length;
  //           return acc;
  //         }, 0)
  //       : options.filter(filter.execute).length;
  //   });
  // }
  // nextFrame(() => scrollbarRef.value!.update());
};

const onOptionFilterChange = (filter: SelectListFilter) => {
  selectedOptionFilter.value = filter;
  updateLocalOptions(props.options);
  // focusSearch();
};

const onToggleAll = () => {
  if (!isMultiselect.value) throw new Error("[SelectList@onToggleAll] method should not be called when \"isMultiselect=false\"");

  // need to do a different check if selectedOptionFilter has a value
  // then check if "allFilteredOptionsSelected"
  if (selectedCount.value === 0 || Boolean(selectedCount.value && !allOptionsSelected.value)) {
    emit("select", selectedOptionFilter.value ? flattenedOptions.value.filter(selectedOptionFilter.value.execute) : flattenedOptions.value);
  }
  else {
    emit("select", []);
  }
};

/**
 * Navigating and highlighting
 */
const onOptionHover = (option: T) => hoveredOption.value = flattenedOptions.value.find(o => (o as T)[props.identifier] === option[props.identifier]) || null;
const allOptionsDisabled = computed(() => {
  // If options are grouped, flatten them before checking
  const options = Array.isArray(localOptions.value) && localOptions.value.length > 0 && "options" in localOptions.value[0]
    ? (localOptions.value as SelectListOptionGroup[]).flatMap(group => group.options)
    : (localOptions.value as SelectListOption[]);
  return options.length > 0 && options.every((option: any) => !!option.disabled);
});

const navigateOptions = async (direction: "next" | "prev") => {
  if (localOptions.value.length === 0) return;

  let hoverIndex = flattenedOptions.value.findIndex(o => o.label === hoveredOption.value?.label);

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
    hoveredOption.value = flattenedOptions.value[hoverIndex];

    if (hoveredOption.value.disabled === true) {
      navigateOptions(direction);
    }

    await nextTick();

    if (hoveredOption.value) {
      // eslint-disable-next-line ts/no-use-before-define
      scrollToOption(hoveredOption.value);
    }
  }
};

const scrollToOption = (_option: SelectListOption) => {
  if (!optionsRef.value.children.length) return;

  // TODO add data attribute to options and query those within the optionsRef

  const target = null; // optionsRef.value.children[localOptions.value.findIndex(o => o.label === option.label)].$el;

  if (scrollbarRef.value && target) {
    const scrollView: HTMLElement | null = scrollbarRef.value.$el.querySelector(".scrollbar__wrap");
    if (scrollView) {
      scrollIntoView(scrollView, target);
      scrollbarRef.value.handleScroll();
    }
  }
};

const onToggleSelectionFooter = () => {
  selectionOpen.value = !selectionOpen.value;
  selectionScrollbarRef.value!.update();
};
const selectionClassesComputed = computed(() => {
  return selectionOpen.value && selectionOverflow.value ? selectionScrollClasses.value : "border-transparent";
});
const onSelectionFooterIntersect = (payload: ScrollIntersectionEvent) => {
  if (!payload.hit) {
    selectionScrollClasses.value = "border-y-outline-subtle shadow-scroll-y";
  }
  else if (payload.edge === "bottom" && payload.hit) {
    selectionScrollClasses.value = "border-b-transparent border-t-outline-subtle shadow-scroll-top";
  }
  else if (payload.edge === "top" && payload.hit) {
    selectionScrollClasses.value = "border-t-transparent border-b-outline-subtle shadow-scroll-bottom";
  }
};
const onScrollYActive = (active: boolean) => {
  selectionOverflow.value = active;
};

const reset = () => {
  searchQuery.value = "";
  props.searchFunction ? props.searchFunction("") : updateLocalOptions([]);
  selectedOptionFilter.value = props.filters ? props.filters[0] : null;
};

defineExpose({
  // focusSearch,
  isMultiselect,
  reset,
  scrollbarRef,
});
</script>

<template>
  <div
    ref="selectListRef"
    tabindex="0"
    class="relative flex flex-col focus:outline-none w-full h-full overflow-hidden"
    :style="{
      height: searchFunction ? '640px' : undefined,
      maxHeight: searchFunction ? undefined : '100%',
    }"
  >
    <header
      v-if="$slots.header || searchFunction || filters || selectAll"
      class="flex-0 flex flex-col gap-2 p-2 border-b border-default"
    >
      <slot name="header" />

      <section v-if="searchFunction" class="">
        <BInput
          class="w-full"
          clearable
          :value="searchQuery"
          :placeholder="placeholder"
          @change="debounceOnSearch"
          @clear="onSearch('')"
        />
      </section>

      <section v-if="filters" class="flex items-center gap-1">
        <BButton
          v-for="filter in filters"
          :key="filter.name"
          small
          variant="textSubtle"
          :focus="Boolean(selectedOptionFilter && selectedOptionFilter.name === filter.name)"
          :label="filter.name"
          @click="onOptionFilterChange(filter)"
        />
      </section>

      <button
        v-if="selectAll"
        class="cursor-pointer flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-secondary active:bg-tertiary"
        @click="onToggleAll"
      >
        <BCheckbox
          :indeterminate="Boolean(selectedCount && !allOptionsSelected)"
          :checked="allOptionsSelected"
          @click="onToggleAll"
        />
        <span class="text-sm text-muted italic">Select/deselect all</span>
      </button>
    </header>

    <main class="flex-1 h-full overflow-hidden flex flex-col">
      <BErrorCard v-if="state === 'error'" :message="errorMessage as string" />
      <BLoadingCard v-else-if="state === 'loading'" />
      <BNoMatchCard v-else-if="state === 'no match'" />
      <BIdleCard v-else-if="state === 'idle'" />
      <BScrollbar
        v-else-if="state === 'match'"
        ref="scrollbarRef"
        class="flex-1"
        show
      >
        <ul
          ref="optionsRef"
          class="px-1"
          :class="{
            'py-2': small && isGrouped || !small && !isGrouped,
            'py-1': small && !isGrouped,
            'py-4': !small && isGrouped,
          }"
        >
          <slot
            name="options"
            :options="localOptions"
            :hover="onOptionHover"
            :hovered-option="hoveredOption"
            :select="onSelect"
            :get-is-selected="optionIsSelected"
          />
        </ul>
      </BScrollbar>
    </main>

    <template v-if="$slots.footer">
      <footer class="flex-initial max-h-72 flex flex-col border-t-1 border-default">
        <template v-if="showSelection">
          <header class="flex-none flex items-center justify-between gap-1 px-4 py-1">
            <BButton
              square
              size="tiny"
              variant="text"
              class="-ml-4"
              :label="`${selectionOpen ? 'Hide' : 'Show'} selected items (${selectedCount})`"
              :trailing-icon="selectionOpen ? 'chevron-down' : 'chevron-up'"
              @click="onToggleSelectionFooter"
            />
          </header>
          <BScrollbar
            ref="selectionScrollbarRef"
            show
            tag="ul"
            class="border-y-1"
            :class="selectionClassesComputed"
            :view-height-class="selectionOpen ? 'flex-1 max-h-72' : 'flex-none h-0'"
            @scroll-y-active="onScrollYActive"
            @intersect="onSelectionFooterIntersect"
          >
            <template v-if="selectionOpen">
              <span v-if="noSelection" class="px-4 h-8 flex items-center text-ui-label-14-regular text-disabled-font">Nothing selected</span>
              <section class="w-full px-4 flex flex-wrap items-center gap-2">
                <!-- <NInputChip
                                    ref="selectedOptionsRef"
                                    v-if="selected && isMultiselect"
                                    v-for="option in selected"
                                    :key="(option as T).id || (option as T).label"
                                    :selected="optionIsSelected(option as T)"
                                    :label="(option as T).label"
                                    shape="squared"
                                    variant="outline"
                                    emphasis="strong"
                                    closable
                                    @close="onSelect(option as T)"
                                />
                                <NInputChip
                                    ref="selectedOptionsRef"
                                    v-else-if="selected"
                                    :selected="true"
                                    :label="(selected as T).label"
                                    shape="squared"
                                    variant="outline"
                                    emphasis="strong"
                                    closable
                                    @close="onSelect(selected as T)"
                                /> -->
              </section>
            </template>
          </BScrollbar>
        </template>
        <footer class="flex-0 px-6 py-4">
          <slot name="footer" />
        </footer>
      </footer>
    </template>
  </div>
</template>
