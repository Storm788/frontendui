import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { AdmissionLargeFragment } from "./AdmissionFragments";

const AdmissionInsertMutation = createQueryStrLazy(`
mutation AdmissionInsert($programId: UUID!, $id: UUID) {
    result: admissionInsert(programId: $programId, id: $id) {
        ...AdmissionLargeFragment
    }
}
`, AdmissionLargeFragment)


export const AdmissionInsertAsyncAction = createAsyncGraphQLAction(AdmissionInsertMutation)