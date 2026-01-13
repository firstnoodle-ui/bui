import { expect } from "vitest";
import { getQueryObjectsFromQuery, removeQueryObjectFromQuery, removeQueryObjectsFromQuery, renderQueryObject } from "@/filtering/utils/queryObject";

it("renderQueryObject", () => {
  expect(renderQueryObject("foo", "bar")).toBe("foo[bar]");
});

it("getQueryObjectsFromQuery", () => {
  const filterScope = "foo";
  const query = {
    "foo[bar]": "baz",
    "foo[qux]": "quux",
  };

  const queryObjects = getQueryObjectsFromQuery(query, filterScope);

  expect(queryObjects).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        content: expect.any(String),
        value: expect.any(String),
      }),
    ]),
  );

  expect(queryObjects[0].content).toBe("bar");
  expect(queryObjects[0].value).toBe("baz");

  expect(queryObjects[1].content).toBe("qux");
  expect(queryObjects[1].value).toBe("quux");
});

it("removeQueryObjectFromQuery", () => {
  const filterScope = "foo";
  const query = {
    "foo[bar]": "baz",
    "foo[qux]": "quux",
    "page": 1,
  };

  const queryObjects = removeQueryObjectFromQuery(query, filterScope, "bar");

  expect(Object.keys(queryObjects).length).toBe(2);
  expect(Object.keys(queryObjects)[0]).toBe("foo[qux]");
  expect(Object.keys(queryObjects)[1]).toBe("page");
});

it("removeQueryObjectsFromQuery", () => {
  const filterScope = "foo";
  const query = {
    "foo[bar]": "baz",
    "foo[qux]": "quux",
    "page": 1,
  };

  expect(Object.keys(query).length).toBe(3);
  const queryObjects = removeQueryObjectsFromQuery(query, filterScope);
  expect(Object.keys(queryObjects).length).toBe(1);
});
