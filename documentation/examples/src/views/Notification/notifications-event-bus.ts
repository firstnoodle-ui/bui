import EventBus from "./event-bus";

export const notificationsEventBus = new EventBus<{
  validate: string[];
}>();
