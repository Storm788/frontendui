import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { PaymentInfoLargeFragment } from "./PaymentInfoFragments";

const PaymentInfoDeleteMutationStr = `
mutation PaymentInfoDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: paymentinfoDelete(
    paymentinfo: {id: $id, lastchange: $lastchange}
  ) {
    ... on PaymentInfoGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...PaymentInfoLarge
      }
    }
  }
}
`
const PaymentInfoDeleteMutation = createQueryStrLazy(`${PaymentInfoDeleteMutationStr}`, PaymentInfoLargeFragment)
export const PaymentInfoDeleteAsyncAction = createAsyncGraphQLAction(PaymentInfoDeleteMutation)