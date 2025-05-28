import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudentLargeFragment } from "./StudentFragments";

const StudentDeleteMutation = createQueryStrLazy(
`
mutation StudentDeleteMutation($id: UUID!, $lastchange: DateTime!, $semesterNumber: Int) {
  result: studentDelete(
    student: {id: $id, lastchange: $lastchange, semesterNumber: $semesterNumber}
  ) {
    ... on StudentGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...StudentLarge
      }
    }
  }
}
`,
    StudentLargeFragment)

export const StudentDeleteAsyncAction = createAsyncGraphQLAction(StudentDeleteMutation)