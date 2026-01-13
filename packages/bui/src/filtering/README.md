# Implementing filters

## RouterSynced

**Syntax**<br>
`groupId[id:operator]=value+value+value`

**Syntax example**<br>
`messages[author:eq]=John Doe+Jane Doe`

In the above example we would be filtering a list of messages by whether "John Doe" or "Jane Doe" authored them.

**Terms**
| name | description |
| ---- | ----------- |
| groupId | What the filter applies to - A specific list view. Eg. "messages" |
| id | the id/name used in the url query (the property we are filtering by) |
| operator | the logic operator. Eg. `=`, `!=`, `<`, etc. |
| value | the actual value of the filter (could be multiple if allowed) |

#### Example folder structure

The `message-view` below is a made up example component. It could be any "root" view component that implements filtering functionality.

```
message-view/
├── components/
│ ├── filters/
│ │ ├── CategoryFilter.vue     (1)
│ │ ├── TypeFilter.vue         (1)
│ │ ├── TagFilter.vue          (1)
│ │ ├── etc.
│ │ ├── index.ts               (2)
├── filterConfig.ts            (3)
├── index.ts
├── MessageView.vue            (4)
├── types.ts
```

1. Implement individual filter components using `useFilterComponent` composable, that provides reusable methods like `clearFilter`, `updateFilter`, etc.

2. Export filter components in a `filterComponents` object

3. Create a `filterConfig.ts` file that defines the **groupId** (filter namespace) and the **filters**

4. In the `MessageView.vue` import the `filterConfig`, the `filterComponents` and the `useFilters` composable that accepts the `groupId`, `filters` from the `filterConfig`, plus the items that should be filtered - and exposes `availableFilters`, `filteredItems`, and `handleFilterChange`.
5. Render the filters based on the filters exposed from the `useFilters` composable, using a dynamic `<component />`, and tie their `@change` event to the `handleFilterChange` from the composable.
6. Render the `filteredItems` from the `useFilters` composable.

When removing all filters with a shared groupId, use `removeQueryObjectsFromQuery` which takes a LocationQuery and an identifier (groupId) as parameters.
