import type { LocationQuery } from "vue-router";
import type { FilterNameAndOperator, Operator, OperatorLetters, ParsedFilterQuery } from "../types";
import type { ParsedQueryObject } from "./queryObject";
import { filterEndingBracket, filterSeparator, filterStartingBracket, filterValueSeparator } from "../config";
import { lettersToOperator, operatorToLetters } from "./operators";
import { getQueryObjectsFromQuery, removeQueryObjectFromQuery, removeQueryObjectsFromQuery } from "./queryObject";

const renderFilterIdAndOperator = (id: string, operator: OperatorLetters) => `${id}${filterSeparator}${operator}`;
const renderFilterQueryKey = (groupId: string, id: string, operator: OperatorLetters) => `${groupId}${filterStartingBracket}${renderFilterIdAndOperator(id, operator)}${filterEndingBracket}`;

const getFilterNameAndOperator = (nameAndOperator: string): FilterNameAndOperator => {
  if (!nameAndOperator.includes(filterSeparator))
    throw new Error(`Error in filter syntax: Filter must contain a filter separator "${filterSeparator}"`);

  if (!nameAndOperator.indexOf(filterSeparator) || nameAndOperator.indexOf(filterSeparator) === nameAndOperator.length - 1)
    throw new Error(`Error in filter syntax: filter separator cannot be in the beginning or the end of the string: [${nameAndOperator}]`);

  const [id, operator] = nameAndOperator.split(filterSeparator);
  return { id, operator: <OperatorLetters>operator };
};

export const getFilterValues = (filterValueString: string): string[] => filterValueString.split(filterValueSeparator);

export const getFiltersFromQuery = (query: LocationQuery, groupId: string): ParsedFilterQuery[] => {
  const filterQueryObjects = getQueryObjectsFromQuery(query, groupId);

  return filterQueryObjects.map((parsedQueryObject: ParsedQueryObject) => {
    const { id, operator } = getFilterNameAndOperator(parsedQueryObject.content);
    return {
      id,
      operator: lettersToOperator[operator],
      value: <string>query[renderFilterQueryKey(groupId, id, operator)],
    };
  });
};

export const getFilterFromQuery = (query: LocationQuery, groupId: string, filterId: string): ParsedFilterQuery | undefined => {
  return getFiltersFromQuery(query, groupId).find((filter: ParsedFilterQuery) => filter.id === filterId);
};

export const removeFiltersFromQuery = (query: LocationQuery, groupId: string): LocationQuery => {
  return removeQueryObjectsFromQuery(query, groupId);
};

export const removeFilterFromQuery = (query: LocationQuery, groupId: string, filterId: string): LocationQuery => {
  const filter = getFilterFromQuery(query, groupId, filterId); // parse the filter from the query, that we want to remove
  if (!filter) return query; // if the filter is not found, return the query as is
  const queryObjectContent = renderFilterIdAndOperator(filter.id, operatorToLetters[filter.operator]);
  return removeQueryObjectFromQuery(query, groupId, queryObjectContent);
};

export const addFilterToQuery = (query: LocationQuery, groupId: string, id: string, operator: Operator, value: string): LocationQuery => {
  const newQuery = { ...query };
  newQuery[renderFilterQueryKey(groupId, id, operatorToLetters[operator])] = value;
  return newQuery;
};
