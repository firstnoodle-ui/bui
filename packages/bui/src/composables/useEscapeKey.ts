import { onMounted, onUnmounted } from "vue";

export const useEscapeKey = (callback: Function) => {
  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") callback();
  };

  onMounted(() => window.addEventListener("keydown", onKeydown));
  onUnmounted(() => window.removeEventListener("keydown", onKeydown));
};
