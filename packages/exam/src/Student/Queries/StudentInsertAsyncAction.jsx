import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudentLargeFragment } from "./StudentFragments";

const StudentInsertMutation = createQueryStrLazy(
`
mutation studentInsert($id: UUID, $semesterNumber: Int, $programId: UUID, $stateId: UUID, $userId: UUID, ) {
  studentInsert(student: {id: $id, semesterNumber: $semesterNumber, programId: $programId, stateId: $stateId, userId: $userId}) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...StudentLarge
  }
}
`,
    StudentLargeFragment)


export const StudentInsertAsyncAction = createAsyncGraphQLAction(StudentInsertMutation)