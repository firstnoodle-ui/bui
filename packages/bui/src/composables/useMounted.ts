import { onMounted, ref } from "vue";

export const useMounted = () => {
  const mounted = ref(false);
  onMounted(() => (mounted.value = true));
  return { mounted };
};
