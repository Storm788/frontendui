import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StateTransitionLargeFragment } from "./StateTransitionFragments";

const StateTransitionReadQueryStr = `
query StateTransitionReadQuery($id: UUID!) {
  result: statetransitionById(id: $id) {
    ...StateTransitionLarge
  }
}
`

const StateTransitionReadQuery = createQueryStrLazy(`
query StatetransitionById($id: UUID!) {
  result: statetransitionById(id: $id) {
    ...StateTransitionLargeFragment
  }
}
`, StateTransitionLargeFragment)

/**
 * An async action for executing a GraphQL query to read statetransition entities.
 *
 * This action is created using `createAsyncGraphQLAction` with a predefined `StateTransitionQueryRead` query.
 * It can be dispatched with query variables to fetch data related to statetransition entities from the GraphQL API.
 *
 * @constant
 * @type {Function}
 *
 * @param {Object} query_variables - The variables for the GraphQL query.
 * @param {string|number} query_variables.id - The unique identifier for the statetransition entity to fetch.
 *
 * @returns {Function} A dispatchable async action that performs the GraphQL query, applies middleware, and dispatches the result.
 *
 * @throws {Error} If `query_variables` is not a valid JSON object.
 *
 * @example
 * // Example usage:
 * const queryVariables = { id: "12345" };
 *
 * dispatch(StateTransitionReadAsyncAction(queryVariables))
 *   .then((result) => {
 *     console.log("Fetched data:", result);
 *   })
 *   .catch((error) => {
 *     console.error("Error fetching data:", error);
 *   });
 */
export const StateTransitionReadAsyncAction = createAsyncGraphQLAction(StateTransitionReadQuery)