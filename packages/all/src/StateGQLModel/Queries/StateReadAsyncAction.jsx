import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StateLargeFragment } from "./StateFragments";

const StateReadQueryStr = `
query StateReadQuery($id: UUID!) {
  result: stateById(id: $id) {
    ...StateLarge
  }
}
`

const StateReadQuery = createQueryStrLazy(`
query StateById($id: UUID!) {
  result: stateById(id: $id) {
    ...StateLargeFragment
  }
}
`, StateLargeFragment)

/**
 * An async action for executing a GraphQL query to read state entities.
 *
 * This action is created using `createAsyncGraphQLAction` with a predefined `StateQueryRead` query.
 * It can be dispatched with query variables to fetch data related to state entities from the GraphQL API.
 *
 * @constant
 * @type {Function}
 *
 * @param {Object} query_variables - The variables for the GraphQL query.
 * @param {string|number} query_variables.id - The unique identifier for the state entity to fetch.
 *
 * @returns {Function} A dispatchable async action that performs the GraphQL query, applies middleware, and dispatches the result.
 *
 * @throws {Error} If `query_variables` is not a valid JSON object.
 *
 * @example
 * // Example usage:
 * const queryVariables = { id: "12345" };
 *
 * dispatch(StateReadAsyncAction(queryVariables))
 *   .then((result) => {
 *     console.log("Fetched data:", result);
 *   })
 *   .catch((error) => {
 *     console.error("Error fetching data:", error);
 *   });
 */
export const StateReadAsyncAction = createAsyncGraphQLAction(StateReadQuery)