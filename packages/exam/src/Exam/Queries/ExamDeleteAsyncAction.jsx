import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ExamLargeFragment } from "./ExamFragments";

const ExamDeleteMutation = createQueryStrLazy(
`
mutation ExamDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: examDelete(
    exam: {id: $id, lastchange: $lastchange}
  ) {
    ... on ExamGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...ExamLarge
      }
    }
  }
}
`,
    ExamLargeFragment)

export const ExamDeleteAsyncAction = createAsyncGraphQLAction(ExamDeleteMutation)