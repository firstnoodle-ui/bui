import { type LocationQuery } from "vue-router";

/**
 * Query Object is a special type of query that is used to store complex objects in the query string.
 * syntax: name[content]=value
 */

export type ParsedQueryObject = {
  content: string;
  value: string;
};

const queryObjectContentStart = "[";
const queryObjectContentEnd = "]";

const isIdentifiedObject = (queryKey: string, identifier: string) =>
  queryKey.startsWith(identifier + queryObjectContentStart) &&
  queryKey.endsWith(queryObjectContentEnd);
export const renderQueryObject = (identifier: string, content: string) =>
  `${identifier}${queryObjectContentStart}${content}${queryObjectContentEnd}`;

export const getQueryObjectsFromQuery = (
  query: LocationQuery,
  identifier: string,
): ParsedQueryObject[] => {
  return Object.keys(query).reduce((result: ParsedQueryObject[], key: string) => {
    if (isIdentifiedObject(key, identifier)) {
      result.push({
        content: getQueryObjectContent(key, identifier),
        value: <string>query[key],
      });
    }
    return result;
  }, []);
};

export const getQueryObjectFromQuery = (
  query: LocationQuery,
  identifier: string,
): ParsedQueryObject | null => {
  const match = Object.keys(query).find((key) => isIdentifiedObject(key, identifier));
  if (match) {
    return {
      content: getQueryObjectContent(match, identifier),
      value: <string>query[match],
    };
  }
  return null;
};

const getQueryObjectContent = (filterQueryKey: string, identifier: string): string => {
  return filterQueryKey
    .replace(identifier + queryObjectContentStart, "")
    .replace(queryObjectContentEnd, "");
};

export const removeQueryObjectsFromQuery = (
  query: LocationQuery,
  identifier: string,
): LocationQuery => {
  return Object.keys(query).reduce((result: LocationQuery, key: string) => {
    if (!isIdentifiedObject(key, identifier)) result[key] = query[key];
    return result;
  }, {});
};

export const removeQueryObjectFromQuery = (
  query: LocationQuery,
  identifier: string,
  content: string,
): LocationQuery => {
  return Object.keys(query).reduce((result: LocationQuery, key: string) => {
    if (isIdentifiedObject(key, identifier)) {
      if (content !== getQueryObjectContent(key, identifier)) {
        result[key] = query[key];
      }
    } else {
      result[key] = query[key];
    }
    return result;
  }, {});
};
