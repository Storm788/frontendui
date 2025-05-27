import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { PaymentLargeFragment } from "./PaymentFragments";

const PaymentUpdateMutationStr = `
mutation PaymentUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: paymentUpdate(
    payment: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on PaymentGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...PaymentLarge
      }      
    }
    ...PaymentLarge
  }
}
`

const PaymentUpdateMutation = createQueryStrLazy(`
mutation PaymentUpdate($id: UUID!, $lastchange: DateTime!, $studentId: UUID, $programId: UUID, $bankUniqueData: String, $variableSymbol: String, $amount: Float, $paymentInfoId: UUID) {
  result: paymentUpdate(id: $id, lastchange: $lastchange, studentId: $studentId, programId: $programId, bankUniqueData: $bankUniqueData, variableSymbol: $variableSymbol, amount: $amount, paymentInfoId: $paymentInfoId) {
    __typename
    ... on PaymentGQLModel {
      ...PaymentLargeFragment
    }
    ... on PaymentGQLModelUpdateError {
      Entity
      msg
      failed
      input
    }
  }
}
`, PaymentLargeFragment)
export const PaymentUpdateAsyncAction = createAsyncGraphQLAction(PaymentUpdateMutation)