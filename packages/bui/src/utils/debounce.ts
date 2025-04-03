// eslint-disable-next-line ts/no-unsafe-function-type
export const debounce = (fn: Function, timeout: number = 300) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), timeout);
  };
};
