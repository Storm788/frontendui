import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { SubjectLargeFragment } from "./SubjectFragments";

const SubjectDeleteMutation = createQueryStrLazy(
`
mutation SubjectDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: subjectDelete(
    subject: {id: $id, lastchange: $lastchange}
  ) {
    ... on SubjectGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...SubjectLarge
      }
    }
  }
}
`,
    SubjectLargeFragment)

export const SubjectDeleteAsyncAction = createAsyncGraphQLAction(SubjectDeleteMutation)