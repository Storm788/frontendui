import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { PaymentLargeFragment } from "./PaymentFragments";


const PaymentInsertMutationStr = `
mutation PaymentInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: paymentInsert(
    payment: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...PaymentLarge
  }
}
`

const PaymentInsertMutation = createQueryStrLazy(`
mutation PaymentInsert($id: UUID, $studentId: UUID, $programId: UUID, $bankUniqueData: String, $variableSymbol: String, $amount: Float, $paymentInfoId: UUID) {
  result: paymentInsert(id: $id, studentId: $studentId, programId: $programId, bankUniqueData: $bankUniqueData, variableSymbol: $variableSymbol, amount: $amount, paymentInfoId: $paymentInfoId) {
    __typename
    ... on PaymentGQLModel {
      ...PaymentLargeFragment
    }
    ... on InsertError {
      msg
      failed
      input
    }
  }
}
`, PaymentLargeFragment)
export const PaymentInsertAsyncAction = createAsyncGraphQLAction(PaymentInsertMutation)