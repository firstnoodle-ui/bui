import type { LocationQuery } from "vue-router";
import type { FilterNameAndOperator, Operator, OperatorLetters, ParsedFilterQuery, ParsedFiltersAndSorting, ParsedSortingQuery, SortingDirection } from "../types";
import type { ParsedQueryObject } from "./queryObject";
import { filterEndingBracket, filterSeparator, filterStartingBracket, filterValueSeparator } from "../config";
import { sortingDirections } from "../types";
import { lettersToOperator, operatorToLetters } from "./operators";
import { getQueryObjectsFromQuery, removeQueryObjectFromQuery, removeQueryObjectsFromQuery } from "./queryObject";

const SORTING_IDENTIFIER = "sort" as const;

const renderFilterIdAndOperator = (id: string, operator: OperatorLetters) => `${id}${filterSeparator}${operator}`;
const renderSortingFieldAndDirection = (field: string, direction: SortingDirection) => `${field}${filterSeparator}${direction}`;
const renderFilterQueryKey = (groupId: string, id: string, operator: OperatorLetters) => `${groupId}${filterStartingBracket}${renderFilterIdAndOperator(id, operator)}${filterEndingBracket}`;
const renderSortingQueryKey = (groupId: string, direction: SortingDirection) => `${groupId}${filterStartingBracket}${renderSortingFieldAndDirection("sort", direction)}${filterEndingBracket}`;

const getFilterNameAndOperator = (nameAndOperator: string): FilterNameAndOperator => {
  if (!nameAndOperator.includes(filterSeparator))
    throw new Error(`Error in filter syntax: Filter must contain a filter separator "${filterSeparator}"`);

  if (!nameAndOperator.indexOf(filterSeparator) || nameAndOperator.indexOf(filterSeparator) === nameAndOperator.length - 1)
    throw new Error(`Error in filter syntax: filter separator cannot be in the beginning or the end of the string: [${nameAndOperator}]`);

  const [id, operator] = nameAndOperator.split(filterSeparator);
  return { id, operator: <OperatorLetters>operator };
};

export const getFilterValues = (filterValueString: string): string[] => filterValueString.split(filterValueSeparator);

const isSortingQuery = (filterQueryObject: ParsedQueryObject) => {
  const [id, operator] = filterQueryObject.content.split(filterSeparator);
  return id === SORTING_IDENTIFIER && sortingDirections.includes(operator as SortingDirection);
};

export const getFiltersAndSortingFromQuery = (query: LocationQuery, groupId: string): ParsedFiltersAndSorting => {
  const filterQueryObjects = getQueryObjectsFromQuery(query, groupId);

  // intercept sorting object - if any - and convert
  const [sortingQuery] = filterQueryObjects
    .filter(filterQueryObject => isSortingQuery(filterQueryObject))
    .map((filterQueryObject) => {
      const [_id, operator] = filterQueryObject.content.split(filterSeparator);
      return {
        direction: operator,
        field: filterQueryObject.value,
      } as ParsedSortingQuery;
    });

  const parsedFilterQuery = filterQueryObjects.map((parsedQueryObject: ParsedQueryObject) => {
    const { id, operator } = getFilterNameAndOperator(parsedQueryObject.content);
    return {
      id,
      operator: lettersToOperator[operator],
      value: <string>query[renderFilterQueryKey(groupId, id, operator)],
    };
  });

  return parsedFilterQuery.reduce((result, filterObject) => {
    if (filterObject.id === SORTING_IDENTIFIER && filterObject.operator === undefined) {
      result.sorting = sortingQuery;
    }
    else {
      result.filters.push(filterObject);
    }
    return result;
  }, { sorting: undefined, filters: [] } as ParsedFiltersAndSorting);
};

export const getFilterFromQuery = (query: LocationQuery, groupId: string, filterId: string): ParsedFilterQuery | undefined => {
  return getFiltersAndSortingFromQuery(query, groupId).filters.find((filter: ParsedFilterQuery) => filter.id === filterId);
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

export const removeSortingFromQuery = (query: LocationQuery, groupId: string): LocationQuery => {
  const sortingQuery = getQueryObjectsFromQuery(query, groupId).find(parsedQueryObject => isSortingQuery(parsedQueryObject));
  if (!sortingQuery) return query;
  return removeQueryObjectFromQuery(query, groupId, sortingQuery.content);
};

export const addFilterToQuery = (query: LocationQuery, groupId: string, id: string, operator: Operator, value: string): LocationQuery => {
  const newQuery = { ...query };
  newQuery[renderFilterQueryKey(groupId, id, operatorToLetters[operator])] = value;
  return newQuery;
};

export const addSortingToQuery = (query: LocationQuery, groupId: string, direction: SortingDirection, field: string): LocationQuery => {
  const newQuery = { ...query };
  newQuery[renderSortingQueryKey(groupId, direction)] = field;
  return newQuery;
};
