import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { SubjectLargeFragment } from "./SubjectFragments";

const SubjectReadQuery = createQueryStrLazy(
`
query SubjectReadQuery($id: UUID!) {
  result: subjectById(id: $id) {
    ...SubjectLarge
  }
}
`, 
    SubjectLargeFragment)

    /**
 * An async action for executing a GraphQL query to read subject entities.
 *
 * This action is created using `createAsyncGraphQLAction` with a predefined `SubjectQueryRead` query.
 * It can be dispatched with query variables to fetch data related to subject entities from the GraphQL API.
 *
 * @constant
 * @type {Function}
 *
 * @param {Object} query_variables - The variables for the GraphQL query.
 * @param {string|number} query_variables.id - The unique identifier for the subject entity to fetch.
 *
 * @returns {Function} A dispatchable async action that performs the GraphQL query, applies middleware, and dispatches the result.
 *
 * @throws {Error} If `query_variables` is not a valid JSON object.
 *
 * @example
 * // Example usage:
 * const queryVariables = { id: "12345" };
 *
 * dispatch(SubjectReadAsyncAction(queryVariables))
 *   .then((result) => {
 *     console.log("Fetched data:", result);
 *   })
 *   .catch((error) => {
 *     console.error("Error fetching data:", error);
 *   });
 */
export const SubjectReadAsyncAction = createAsyncGraphQLAction(SubjectReadQuery)