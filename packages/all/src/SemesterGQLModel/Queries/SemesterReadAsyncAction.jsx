import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { SemesterLargeFragment } from "./SemesterFragments";

const SemesterReadQueryStr = `
query SemesterReadQuery($id: UUID!) {
  result: semesterById(id: $id) {
    ...SemesterLarge
  }
}
`

const SemesterReadQuery = createQueryStrLazy(`
query SemesterById($id: UUID!) {
  result: semesterById(id: $id) {
    ...SemesterLargeFragment
  }
}
`, SemesterLargeFragment)

/**
 * An async action for executing a GraphQL query to read semester entities.
 *
 * This action is created using `createAsyncGraphQLAction` with a predefined `SemesterQueryRead` query.
 * It can be dispatched with query variables to fetch data related to semester entities from the GraphQL API.
 *
 * @constant
 * @type {Function}
 *
 * @param {Object} query_variables - The variables for the GraphQL query.
 * @param {string|number} query_variables.id - The unique identifier for the semester entity to fetch.
 *
 * @returns {Function} A dispatchable async action that performs the GraphQL query, applies middleware, and dispatches the result.
 *
 * @throws {Error} If `query_variables` is not a valid JSON object.
 *
 * @example
 * // Example usage:
 * const queryVariables = { id: "12345" };
 *
 * dispatch(SemesterReadAsyncAction(queryVariables))
 *   .then((result) => {
 *     console.log("Fetched data:", result);
 *   })
 *   .catch((error) => {
 *     console.error("Error fetching data:", error);
 *   });
 */
export const SemesterReadAsyncAction = createAsyncGraphQLAction(SemesterReadQuery)