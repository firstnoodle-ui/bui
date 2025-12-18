import type { TIcon } from "../components";

export const getModifierKeyIcon = (): TIcon => {
  // Modern browsers (Chromium-based)
  if ("userAgentData" in navigator) {
    const uaData = (navigator as any).userAgentData;
    if (uaData.platform === "macOS") {
      return "key-cmd";
    }
  }

  // Fallback for Safari / older browsers
  const platform
    = navigator.platform
      || navigator.userAgent
      || "";

  const isMac = /Mac|iPhone|iPad|iPod/i.test(platform);

  if (isMac) {
    return "key-cmd";
  }

  // Windows / Linux / others
  return "key-ctrl";
};
