import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { AdmissionLargeFragment } from "./AdmissionFragments";

const AdmissionDeleteMutationStr = `
mutation AdmissionDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: admissionDelete(
    admission: {id: $id, lastchange: $lastchange}
  ) {
    ... on AdmissionGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...AdmissionLarge
      }
    }
  }
}
`
const AdmissionDeleteMutation = createQueryStrLazy(`
mutation AdmissionDelete($id: UUID!, $lastchange: DateTime!) {
  result: admissionDelete(admission: { id: $id, lastchange: $lastchange }) {
    ...AdmissionLargeFragment
  }
}
`, AdmissionLargeFragment)
export const AdmissionDeleteAsyncAction = createAsyncGraphQLAction(AdmissionDeleteMutation)