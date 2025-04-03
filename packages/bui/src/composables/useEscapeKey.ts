import { onMounted, onUnmounted } from "vue";

// eslint-disable-next-line ts/no-unsafe-function-type
export function useEscapeKey(callback: Function) {
  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape")
      callback();
  };

  onMounted(() => window.addEventListener("keydown", onKeydown));
  onUnmounted(() => window.removeEventListener("keydown", onKeydown));
}
