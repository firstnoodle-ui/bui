import buiPreset from "@firstnoodle-ui/bui/tailwind-preset";
import plugin from "tailwindcss/plugin";

export default {
  presets: [buiPreset],
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".bg-testing": { backgroundColor: "#123456" },
      });
    }),
  ],
  content: [
    "./src/**/*.{html,js,ts,vue}",
    // Optionally include the UI library's dist folder if needed:
    "./node_modules/@firstnoodle-ui/bui/dist/**/*.{js,vue}",
  ],
  // additional Tailwind configuration here...
};
