import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudentLargeFragment } from "./StudentFragments";

const StudentUpdateMutation = createQueryStrLazy(
`
mutation StudentUpdateMutation($id: UUID!, $lastchange: DateTime!, $semesterNumber: Int, $userId: UUID!, $programId: UUID!, $stateId: UUID!) {
  result: studentUpdate(
    student: {id: $id, lastchange: $lastchange, semesterNumber: $semesterNumber, userId: $userId, programId: $programId, stateId: $stateId}
  ) {
    ... on StudentGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...StudentLarge
      }      
    }
    ...StudentLarge
  }
}
`, StudentLargeFragment)

export const StudentUpdateAsyncAction = createAsyncGraphQLAction(StudentUpdateMutation)