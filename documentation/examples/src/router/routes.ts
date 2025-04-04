export default {
  path: "/bui",
  name: "Components",
  component: () => import("../components/index.vue"),
  children: [
    {
      path: "/button",
      name: "Button",
      component: () => import("../views/Button/index.vue"),
    },
    {
      path: "/checkbox",
      name: "Checkbox",
      component: () => import("../views/Checkbox/index.vue"),
    },
    {
      path: "/collapse",
      name: "Collapse",
      component: () => import("../views/Collapse/index.vue"),
    },
    {
      path: "/confirm-cancel",
      name: "ConfirmCancel",
      component: () => import("../views/ConfirmCancel/index.vue"),
    },
    {
      path: "/dialog",
      name: "Dialog",
      component: () => import("../views/Dialog/index.vue"),
    },
    {
      path: "/first-paint",
      name: "FirstPaint",
      component: () => import("../views/FirstPaint/index.vue"),
    },
    {
      path: "/horizontal-layout",
      name: "HorizontalLayout",
      component: () => import("../views/HorizontalLayout/index.vue"),
    },
    {
      path: "/icon",
      name: "Icon",
      component: () => import("../views/Icon/index.vue"),
    },
    {
      path: "/load-spinner",
      name: "LoadSpinner",
      component: () => import("../views/LoadSpinner/index.vue"),
    },
    {
      path: "/modal",
      name: "Modal",
      component: () => import("../views/Modal/index.vue"),
    },
    {
      path: "/notification",
      name: "Notification",
      component: () => import("../views/Notification/index.vue"),
    },
    {
      path: "/pagination",
      name: "Pagination",
      component: () => import("../views/Pagination/index.vue"),
    },
    {
      path: "/pill",
      name: "Pill",
      component: () => import("../views/Pill/index.vue"),
    },
    {
      path: "/pop-confirm",
      name: "PopConfirm",
      component: () => import("../views/PopConfirm/index.vue"),
    },
    {
      path: "/popper",
      name: "Popper",
      component: () => import("../views/Popper/index.vue"),
    },
    {
      path: "/pop-select",
      name: "PopSelect",
      component: () => import("../views/PopSelect/index.vue"),
    },
    {
      path: "/side-over",
      name: "SideOver",
      component: () => import("../views/SideOver/index.vue"),
    },
    {
      path: "/status-select",
      name: "StatusSelect",
      component: () => import("../views/StatusSelect/index.vue"),
    },
    {
      path: "/switch",
      name: "Switch",
      component: () => import("../views/Switch/index.vue"),
    },
    {
      path: "/tab",
      name: "Tab",
      component: () => import("../views/Tab/index.vue"),
    },
    {
      path: "/tag",
      name: "Tag",
      component: () => import("../views/Tag/index.vue"),
    },
    {
      path: "/text-highlight",
      name: "TextHighlight",
      component: () => import("../views/TextHighlight/index.vue"),
    },
    {
      path: "/tooltip",
      name: "Tooltip",
      component: () => import("../views/Tooltip/index.vue"),
    },
    {
      path: "/vertical-layout",
      name: "VerticalLayout",
      component: () => import("../views/VerticalLayout/index.vue"),
    },
  ],
};
