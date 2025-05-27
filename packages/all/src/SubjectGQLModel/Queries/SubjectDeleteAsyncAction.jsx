import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { SubjectLargeFragment } from "./SubjectFragments";

const SubjectDeleteMutationStr = `
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
`
const SubjectDeleteMutation = createQueryStrLazy(`
mutation SubjectDelete($id: UUID!, $lastchange: DateTime!) {
  result: subjectDelete(subject: { id: $id, lastchange: $lastchange }) {
    ...SubjectLargeFragment
  }
}
`, SubjectLargeFragment)
export const SubjectDeleteAsyncAction = createAsyncGraphQLAction(SubjectDeleteMutation)