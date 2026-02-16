import type { OverflowTab } from "./types";
import { computed, nextTick, onMounted, ref, watch } from "vue";

export function useOverflowTabs<T extends OverflowTab>(tabs: () => T[], selectedId: () => string) {
  const containerRef = ref<HTMLElement>();
  const tabRefs = ref<HTMLElement[]>([]);
  const overflowTriggerRef = ref<HTMLElement>();

  const visibleIds = ref<string[]>([]);
  const overflowIds = ref<string[]>([]);

  // Cache widths since hidden elements won't have refs after overflow
  const cachedTabWidths = ref<Map<string, number>>(new Map());
  const cachedOverflowWidth = ref(0);

  function recalc() {
    if (!containerRef.value) return;

    // Update cached widths for any visible tabs
    const allTabs = tabs();
    tabRefs.value.forEach((el, i) => {
      if (el && visibleIds.value[i]) {
        cachedTabWidths.value.set(visibleIds.value[i], el.offsetWidth);
      }
    });

    // On first run, visibleIds is empty, so cache from initial refs
    if (visibleIds.value.length === 0) {
      tabRefs.value.forEach((el, i) => {
        if (el && allTabs[i]) {
          cachedTabWidths.value.set(allTabs[i].id, el.offsetWidth);
        }
      });
    }

    // Cache overflow button width when visible
    if (overflowTriggerRef.value) {
      cachedOverflowWidth.value = overflowTriggerRef.value.offsetWidth;
    }

    const containerWidth = containerRef.value.clientWidth;
    const tabWidths = allTabs.map(t => cachedTabWidths.value.get(t.id) ?? 0);
    const overflowWidth = cachedOverflowWidth.value;

    let used = 0;
    let cutoff = tabs().length;

    for (let i = 0; i < tabWidths.length; i++) {
      const remaining = tabWidths.length - i - 1;
      const needsOverflow = remaining > 0;

      const next = used + tabWidths[i] + (needsOverflow ? overflowWidth : 0);

      if (next > containerWidth) {
        cutoff = i;
        break;
      }

      used += tabWidths[i];
    }

    const visible = tabs()
      .slice(0, cutoff)
      .map(t => t.id);
    const overflow = tabs()
      .slice(cutoff)
      .map(t => t.id);

    // Ensure selected tab stays visible
    const currentSelected = selectedId();
    if (overflow.includes(currentSelected)) {
      const selectedIndex = overflow.indexOf(currentSelected);
      overflow.splice(selectedIndex, 1);
      const demoted = visible.pop();
      if (demoted) overflow.unshift(demoted);
      visible.push(currentSelected);
    }

    visibleIds.value = visible;
    overflowIds.value = overflow;
  }

  // Ensure selected tab is always visible
  watch(selectedId, (id) => {
    if (!overflowIds.value.includes(id)) return;

    const v = [...visibleIds.value];
    const o = [...overflowIds.value];

    o.splice(o.indexOf(id), 1);

    const demoted = v.pop();
    if (demoted) o.unshift(demoted);

    v.push(id);

    visibleIds.value = v;
    overflowIds.value = o;
  });

  onMounted(async () => {
    await nextTick();
    recalc();

    const observer = new ResizeObserver(recalc);
    observer.observe(containerRef.value!);
  });

  function focusTab(id: string) {
    const index = tabs().findIndex(t => t.id === id);
    const el = tabRefs.value[index];
    el?.focus();
  }

  function onKeydown(e: KeyboardEvent) {
    const allIds = tabs().map(t => t.id);
    const currentIndex = allIds.indexOf(selectedId());

    let nextIndex = currentIndex;

    switch (e.key) {
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % allIds.length;
        break;
      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + allIds.length) % allIds.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = allIds.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    const nextId = allIds[nextIndex];
    focusTab(nextId);
  }

  return {
    containerRef,
    tabRefs,
    overflowTriggerRef,
    overflowIds: computed(() => overflowIds.value),
    visibleIds: computed(() => visibleIds.value),
    onKeydown,
    recalc,
  };
}
