import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { AdmissionLargeFragment } from "./AdmissionFragments";

const AdmissionUpdateMutationStr = `
mutation AdmissionUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: admissionUpdate(
    admission: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on AdmissionGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...AdmissionLarge
      }      
    }
    ...AdmissionLarge
  }
}
`

const AdmissionUpdateMutation = createQueryStrLazy(`
mutation AdmissionUpdate($id: UUID!, $lastchange: DateTime!, $name: String, $nameEn: String, $stateId: UUID, $paymentInfoId: UUID, $applicationStartDate: DateTime, $applicationLastDate: DateTime, $endDate: DateTime, $conditionDate: DateTime, $paymentDate: DateTime, $conditionExtendedDate: DateTime, $requestConditionExtendDate: DateTime, $requestExtraConditionsDate: DateTime, $requestExtraDateDate: DateTime, $examStartDate: DateTime, $examLastDate: DateTime, $studentEntryDate: DateTime) {
  result: admissionUpdate(admission: { id: $id, lastchange: $lastchange, name: $name, nameEn: $nameEn, stateId: $stateId, paymentInfoId: $paymentInfoId, applicationStartDate: $applicationStartDate, applicationLastDate: $applicationLastDate, endDate: $endDate, conditionDate: $conditionDate, paymentDate: $paymentDate, conditionExtendedDate: $conditionExtendedDate, requestConditionExtendDate: $requestConditionExtendDate, requestExtraConditionsDate: $requestExtraConditionsDate, requestExtraDateDate: $requestExtraDateDate, examStartDate: $examStartDate, examLastDate: $examLastDate, studentEntryDate: $studentEntryDate }) {
    __typename
    ... on AdmissionGQLModel {
      ...AdmissionLargeFragment
    }
    ... on AdmissionGQLModelUpdateError {
      Entity {
        ...AdmissionLargeFragment
      }
      msg
      failed
      input
    }
  }
}
`, AdmissionLargeFragment)
export const AdmissionUpdateAsyncAction = createAsyncGraphQLAction(AdmissionUpdateMutation)