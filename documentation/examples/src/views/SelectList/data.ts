import type { SelectListFilter, SelectListOption, SelectListOptionGroup } from "@firstnoodle/bui";

export const demoOptions: SelectListOption[] = [
  { id: 1, icon: "box", label: "Apple", suffix: "green" },
  { id: 2, icon: "box", label: "Orange", suffix: "orange" },
  { id: 3, icon: "box", label: "Pineapple", suffix: "yellow" },
  { id: 4, icon: "box", label: "Pear", suffix: "green" },
  { id: 5, icon: "box", label: "Lemon", suffix: "yellow" },
  { id: 6, icon: "box", label: "Grape", suffix: "yellow" },
  { id: 7, icon: "box", label: "Banana", suffix: "yellow" },
  { id: 8, icon: "box", label: "Lime", suffix: "green" },
  { id: 9, icon: "box", label: "Watermelon", suffix: "pink" },
  { id: 10, icon: "box", label: "Lychee", suffix: "white" },
];

export const groupedOptions: SelectListOptionGroup[] = [
  {
    id: 1,
    name: "Green",
    options: demoOptions.filter(o => o.suffix === "green"),
  },
  {
    id: 2,
    name: "Orange",
    options: demoOptions.filter(o => o.suffix === "orange"),
  },
  {
    id: 3,
    name: "Yellow",
    options: demoOptions.filter(o => o.suffix === "yellow"),
  },
  {
    id: 4,
    name: "Pink",
    options: demoOptions.filter(o => o.suffix === "pink"),
  },
  {
    id: 5,
    name: "White",
    options: demoOptions.filter(o => o.suffix === "white"),
  },
];

export const filters: SelectListFilter[] = [
  {
    id: 1,
    name: "All",
    disabled: false,
    execute: _option => true,
    count: 0,
  },
  {
    id: 2,
    name: "Yellow",
    disabled: false,
    execute: option => option.suffix === "yellow",
    count: 0,
  },
  {
    id: 3,
    name: "Green",
    disabled: false,
    execute: option => option.suffix === "green",
    count: 0,
  },
  {
    id: 4,
    name: "Orange",
    disabled: false,
    execute: option => option.suffix === "orange",
    count: 0,
  },
  {
    id: 5,
    name: "Pink",
    disabled: false,
    execute: option => option.suffix === "pink",
    count: 0,
  },
];
