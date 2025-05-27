import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramFormTypeLargeFragment } from "./ProgramFormTypeFragments";

const ProgramFormTypeReadQueryStr = `
query ProgramFormTypeReadQuery($id: UUID!) {
  result: programformtypeById(id: $id) {
    ...ProgramFormTypeLarge
  }
}
`

const ProgramFormTypeReadQuery = createQueryStrLazy(`${ProgramFormTypeReadQueryStr}`, ProgramFormTypeLargeFragment)

/**
 * An async action for executing a GraphQL query to read programformtype entities.
 *
 * This action is created using `createAsyncGraphQLAction` with a predefined `ProgramFormTypeQueryRead` query.
 * It can be dispatched with query variables to fetch data related to programformtype entities from the GraphQL API.
 *
 * @constant
 * @type {Function}
 *
 * @param {Object} query_variables - The variables for the GraphQL query.
 * @param {string|number} query_variables.id - The unique identifier for the programformtype entity to fetch.
 *
 * @returns {Function} A dispatchable async action that performs the GraphQL query, applies middleware, and dispatches the result.
 *
 * @throws {Error} If `query_variables` is not a valid JSON object.
 *
 * @example
 * // Example usage:
 * const queryVariables = { id: "12345" };
 *
 * dispatch(ProgramFormTypeReadAsyncAction(queryVariables))
 *   .then((result) => {
 *     console.log("Fetched data:", result);
 *   })
 *   .catch((error) => {
 *     console.error("Error fetching data:", error);
 *   });
 */
export const ProgramFormTypeReadAsyncAction = createAsyncGraphQLAction(ProgramFormTypeReadQuery)