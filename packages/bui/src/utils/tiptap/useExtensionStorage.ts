import type { Ref } from "vue";
import { onBeforeUnmount, onMounted, ref } from "vue";

export function useExtensionStorage<T>(
  editor: Ref<any>,
  extensionName: string,
  key: string,
) {
  const value = ref<T | null>(null) as Ref<T | null>;

  const sync = () => {
    const newValue = editor.value?.storage?.[extensionName]?.[key] ?? null;
    if (value.value !== newValue) {
      value.value = newValue;
    }
  };

  onMounted(() => {
    editor.value?.on("update", sync);
    editor.value?.on("transaction", sync);
    sync();
  });

  onBeforeUnmount(() => {
    editor.value?.off("update", sync);
    editor.value?.off("transaction", sync);
  });

  return value;
}
