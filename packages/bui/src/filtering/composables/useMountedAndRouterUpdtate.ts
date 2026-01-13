import { onMounted } from "vue";
import { type LocationQuery, onBeforeRouteUpdate, useRoute } from "vue-router";

export const useMountedAndRouterUpdate = (callback: (routeQuery: LocationQuery) => void) => {
  const route = useRoute();
  onMounted(() => callback(route.query));
  onBeforeRouteUpdate((to) => callback(to.query));
};
