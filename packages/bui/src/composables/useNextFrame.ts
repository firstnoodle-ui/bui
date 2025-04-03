// double raf (RequestAnimationFrame) to avoid layout thrashing
export const useNextFrame = () => {
  return {
    nextFrame: (callback: FrameRequestCallback) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(callback);
      });
    }
  };
};
