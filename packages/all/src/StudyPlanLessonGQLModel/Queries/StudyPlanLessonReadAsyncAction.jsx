import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudyPlanLessonLargeFragment } from "./StudyPlanLessonFragments";

const StudyPlanLessonReadQueryStr = `
query StudyPlanLessonReadQuery($id: UUID!) {
  result: studyplanlessonById(id: $id) {
    ...StudyPlanLessonLarge
  }
}
`

const StudyPlanLessonReadQuery = createQueryStrLazy(`${StudyPlanLessonReadQueryStr}`, StudyPlanLessonLargeFragment)

/**
 * An async action for executing a GraphQL query to read studyplanlesson entities.
 *
 * This action is created using `createAsyncGraphQLAction` with a predefined `StudyPlanLessonQueryRead` query.
 * It can be dispatched with query variables to fetch data related to studyplanlesson entities from the GraphQL API.
 *
 * @constant
 * @type {Function}
 *
 * @param {Object} query_variables - The variables for the GraphQL query.
 * @param {string|number} query_variables.id - The unique identifier for the studyplanlesson entity to fetch.
 *
 * @returns {Function} A dispatchable async action that performs the GraphQL query, applies middleware, and dispatches the result.
 *
 * @throws {Error} If `query_variables` is not a valid JSON object.
 *
 * @example
 * // Example usage:
 * const queryVariables = { id: "12345" };
 *
 * dispatch(StudyPlanLessonReadAsyncAction(queryVariables))
 *   .then((result) => {
 *     console.log("Fetched data:", result);
 *   })
 *   .catch((error) => {
 *     console.error("Error fetching data:", error);
 *   });
 */
export const StudyPlanLessonReadAsyncAction = createAsyncGraphQLAction(StudyPlanLessonReadQuery)