import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { AdmissionLargeFragment } from "./AdmissionFragments";

const AdmissionUpdateMutation = createQueryStrLazy(`
mutation AdmissionUpdate($id: UUID!, $lastchange: DateTime!) {
    result: admissionUpdate(id: $id, lastchange: $lastchange) {
        ...AdmissionLargeFragment
    }
}
`, AdmissionLargeFragment)

export const AdmissionUpdateAsyncAction = createAsyncGraphQLAction(AdmissionUpdateMutation)