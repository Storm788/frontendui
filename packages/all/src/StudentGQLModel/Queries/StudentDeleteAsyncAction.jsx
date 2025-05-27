import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudentLargeFragment } from "./StudentFragments";

const StudentDeleteMutationStr = `
mutation StudentDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: studentDelete(
    student: {id: $id, lastchange: $lastchange}
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
`
const StudentDeleteMutation = createQueryStrLazy(`
mutation StudentDelete($id: UUID!, $lastchange: DateTime!) {
  result: studentDelete(student: { id: $id, lastchange: $lastchange }) {
    ...StudentLargeFragment
  }
}
`, StudentLargeFragment)
export const StudentDeleteAsyncAction = createAsyncGraphQLAction(StudentDeleteMutation)