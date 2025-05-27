import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { PaymentInfoLargeFragment } from "./PaymentInfoFragments";


const PaymentInfoInsertMutationStr = `
mutation PaymentInfoInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: paymentinfoInsert(
    paymentinfo: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...PaymentInfoLarge
  }
}
`

const PaymentInfoInsertMutation = createQueryStrLazy(`${PaymentInfoInsertMutationStr}`, PaymentInfoLargeFragment)
export const PaymentInfoInsertAsyncAction = createAsyncGraphQLAction(PaymentInfoInsertMutation)