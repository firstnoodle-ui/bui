import type { LocationQuery } from "vue-router";
import { onMounted } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

export const useMountedAndRouterUpdate = (callback: (routeQuery: LocationQuery) => void) => {
  const route = useRoute();
  onMounted(() => callback(route.query));
  onBeforeRouteUpdate(to => callback(to.query));
};
