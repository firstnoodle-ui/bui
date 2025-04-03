import { defineComponent as o, createElementBlock as n, openBlock as r, toDisplayString as l } from "vue";
const a = /* @__PURE__ */ o({
  __name: "TestButton",
  props: {
    text: {}
  },
  setup(s) {
    return (t, e) => (r(), n("button", {
      class: "text-gray-50 rounded-full bg-blue-300 font-bold p-2",
      onClick: e[0] || (e[0] = (p) => console.log(`${t.text}`))
    }, l(t.text), 1));
  }
});
export {
  a as TestButton
};
