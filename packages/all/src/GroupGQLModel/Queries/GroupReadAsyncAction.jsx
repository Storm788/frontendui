import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { GroupLargeFragment } from "./GroupFragments";

const GroupReadQueryStr = `
query GroupReadQuery($id: UUID!) {
  result: groupById(id: $id) {
    ...GroupLarge
  }
}
`

const GroupReadQuery = createQueryStrLazy(`
query GroupById($id: UUID!) {
  result: groupById(id: $id) {
    ...GroupLargeFragment
  }
}
`, GroupLargeFragment)

/**
 * An async action for executing a GraphQL query to read group entities.
 *
 * This action is created using `createAsyncGraphQLAction` with a predefined `GroupQueryRead` query.
 * It can be dispatched with query variables to fetch data related to group entities from the GraphQL API.
 *
 * @constant
 * @type {Function}
 *
 * @param {Object} query_variables - The variables for the GraphQL query.
 * @param {string|number} query_variables.id - The unique identifier for the group entity to fetch.
 *
 * @returns {Function} A dispatchable async action that performs the GraphQL query, applies middleware, and dispatches the result.
 *
 * @throws {Error} If `query_variables` is not a valid JSON object.
 *
 * @example
 * // Example usage:
 * const queryVariables = { id: "12345" };
 *
 * dispatch(GroupReadAsyncAction(queryVariables))
 *   .then((result) => {
 *     console.log("Fetched data:", result);
 *   })
 *   .catch((error) => {
 *     console.error("Error fetching data:", error);
 *   });
 */
export const GroupReadAsyncAction = createAsyncGraphQLAction(GroupReadQuery)