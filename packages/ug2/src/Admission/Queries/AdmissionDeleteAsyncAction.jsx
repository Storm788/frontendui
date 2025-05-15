import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { AdmissionLargeFragment } from "./AdmissionFragments";

const AdmissionDeleteMutation = createQueryStrLazy(`
mutation AdmissionDelete($id: UUID!, $lastchange: DateTime!) {
    result: admissionDelete(id: $id, lastchange: $lastchange) {
        ...AdmissionLargeFragment
    }
}
`, AdmissionLargeFragment)

export const AdmissionDeleteAsyncAction = createAsyncGraphQLAction(AdmissionDeleteMutation)