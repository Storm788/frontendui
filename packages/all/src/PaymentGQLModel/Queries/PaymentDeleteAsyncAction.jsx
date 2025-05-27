import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { PaymentLargeFragment } from "./PaymentFragments";

const PaymentDeleteMutationStr = `
mutation PaymentDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: paymentDelete(
    payment: {id: $id, lastchange: $lastchange}
  ) {
    ... on PaymentGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...PaymentLarge
      }
    }
  }
}
`
const PaymentDeleteMutation = createQueryStrLazy(`
mutation PaymentDelete($id: UUID!, $lastchange: DateTime!) {
  result: paymentDelete(id: $id, lastchange: $lastchange) {
    ...PaymentLargeFragment
  }
}
`, PaymentLargeFragment)
export const PaymentDeleteAsyncAction = createAsyncGraphQLAction(PaymentDeleteMutation)