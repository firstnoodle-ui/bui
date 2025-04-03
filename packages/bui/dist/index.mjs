import { defineComponent as o, createElementBlock as n, openBlock as s, toDisplayString as r } from "vue";
const a = /* @__PURE__ */ o({
  __name: "TestButton",
  props: {
    text: {}
  },
  setup(u) {
    return (t, e) => (s(), n("button", {
      class: "text-gray-700 rounded-full bg-pink-100 p-4",
      onClick: e[0] || (e[0] = (p) => console.log(`${t.text}`))
    }, r(t.text), 1));
  }
}), _ = /* @__PURE__ */ o({
  __name: "TestButtonFour",
  props: {
    text: {}
  },
  setup(u) {
    return (t, e) => (s(), n("button", {
      class: "text-gray-50 rounded-full bg-amber-800 p-4",
      onClick: e[0] || (e[0] = (p) => console.log(`${t.text}`))
    }, r(t.text), 1));
  }
}), g = /* @__PURE__ */ o({
  __name: "TestButtonThree",
  props: {
    text: {}
  },
  setup(u) {
    return (t, e) => (s(), n("button", {
      class: "text-gray-700 rounded-full bg-blue-200 p-4",
      onClick: e[0] || (e[0] = (p) => console.log(`${t.text}`))
    }, r(t.text), 1));
  }
}), i = /* @__PURE__ */ o({
  __name: "TestButtonTwo",
  props: {
    text: {}
  },
  setup(u) {
    return (t, e) => (s(), n("button", {
      class: "text-gray-50 rounded-full bg-gray-600 p-4",
      onClick: e[0] || (e[0] = (p) => console.log(`${t.text}`))
    }, r(t.text), 1));
  }
});
export {
  a as TestButton,
  _ as TestButtonFour,
  g as TestButtonThree,
  i as TestButtonTwo
};
