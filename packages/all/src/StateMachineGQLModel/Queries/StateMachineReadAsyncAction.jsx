import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StateMachineLargeFragment } from "./StateMachineFragments";

const StateMachineReadQueryStr = `
query StateMachineReadQuery($id: UUID!) {
  result: statemachineById(id: $id) {
    ...StateMachineLarge
  }
}
`

const StateMachineReadQuery = createQueryStrLazy(`
query StatemachineById($id: UUID!) {
  result: statemachineById(id: $id) {
    ...StateMachineLargeFragment
  }
}
`, StateMachineLargeFragment)

/**
 * An async action for executing a GraphQL query to read statemachine entities.
 *
 * This action is created using `createAsyncGraphQLAction` with a predefined `StateMachineQueryRead` query.
 * It can be dispatched with query variables to fetch data related to statemachine entities from the GraphQL API.
 *
 * @constant
 * @type {Function}
 *
 * @param {Object} query_variables - The variables for the GraphQL query.
 * @param {string|number} query_variables.id - The unique identifier for the statemachine entity to fetch.
 *
 * @returns {Function} A dispatchable async action that performs the GraphQL query, applies middleware, and dispatches the result.
 *
 * @throws {Error} If `query_variables` is not a valid JSON object.
 *
 * @example
 * // Example usage:
 * const queryVariables = { id: "12345" };
 *
 * dispatch(StateMachineReadAsyncAction(queryVariables))
 *   .then((result) => {
 *     console.log("Fetched data:", result);
 *   })
 *   .catch((error) => {
 *     console.error("Error fetching data:", error);
 *   });
 */
export const StateMachineReadAsyncAction = createAsyncGraphQLAction(StateMachineReadQuery)