import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { RoleLargeFragment } from "./RoleFragments";

const RoleReadQueryStr = `
query RoleReadQuery($id: UUID!) {
  result: roleById(id: $id) {
    ...RoleLarge
  }
}
`

const RoleReadQuery = createQueryStrLazy(`
query RoleById($id: UUID!) {
  result: roleById(id: $id) {
    ...RoleLargeFragment
  }
}
`, RoleLargeFragment)

/**
 * An async action for executing a GraphQL query to read role entities.
 *
 * This action is created using `createAsyncGraphQLAction` with a predefined `RoleQueryRead` query.
 * It can be dispatched with query variables to fetch data related to role entities from the GraphQL API.
 *
 * @constant
 * @type {Function}
 *
 * @param {Object} query_variables - The variables for the GraphQL query.
 * @param {string|number} query_variables.id - The unique identifier for the role entity to fetch.
 *
 * @returns {Function} A dispatchable async action that performs the GraphQL query, applies middleware, and dispatches the result.
 *
 * @throws {Error} If `query_variables` is not a valid JSON object.
 *
 * @example
 * // Example usage:
 * const queryVariables = { id: "12345" };
 *
 * dispatch(RoleReadAsyncAction(queryVariables))
 *   .then((result) => {
 *     console.log("Fetched data:", result);
 *   })
 *   .catch((error) => {
 *     console.error("Error fetching data:", error);
 *   });
 */
export const RoleReadAsyncAction = createAsyncGraphQLAction(RoleReadQuery)