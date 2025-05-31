type Callback<T> = (data: T) => void;

export default class EventBus<Events extends Record<string, unknown>> {
  private events: { [K in keyof Events]?: Callback<Events[K]>[] } = {};

  on<K extends keyof Events>(event: K, callback: Callback<Events[K]>): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event]!.push(callback);
  }

  off<K extends keyof Events>(event: K, callback: Callback<Events[K]>): void {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((cb) => cb !== callback);
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    if (!this.events[event]) return;
    this.events[event].forEach((callback) => {
      callback(data);
    });
  }
}
