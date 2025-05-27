import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { PaymentLargeFragment } from "./PaymentFragments";

const PaymentReadQueryStr = `
query PaymentReadQuery($id: UUID!) {
  result: paymentById(id: $id) {
    ...PaymentLarge
  }
}
`

const PaymentReadQuery = createQueryStrLazy(`
query PaymentById($id: UUID!) {
  result: paymentById(id: $id) {
    ...PaymentLargeFragment
  }
}
`, PaymentLargeFragment)

/**
 * An async action for executing a GraphQL query to read payment entities.
 *
 * This action is created using `createAsyncGraphQLAction` with a predefined `PaymentQueryRead` query.
 * It can be dispatched with query variables to fetch data related to payment entities from the GraphQL API.
 *
 * @constant
 * @type {Function}
 *
 * @param {Object} query_variables - The variables for the GraphQL query.
 * @param {string|number} query_variables.id - The unique identifier for the payment entity to fetch.
 *
 * @returns {Function} A dispatchable async action that performs the GraphQL query, applies middleware, and dispatches the result.
 *
 * @throws {Error} If `query_variables` is not a valid JSON object.
 *
 * @example
 * // Example usage:
 * const queryVariables = { id: "12345" };
 *
 * dispatch(PaymentReadAsyncAction(queryVariables))
 *   .then((result) => {
 *     console.log("Fetched data:", result);
 *   })
 *   .catch((error) => {
 *     console.error("Error fetching data:", error);
 *   });
 */
export const PaymentReadAsyncAction = createAsyncGraphQLAction(PaymentReadQuery)