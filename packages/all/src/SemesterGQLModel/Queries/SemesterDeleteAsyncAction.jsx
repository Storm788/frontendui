import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { SemesterLargeFragment } from "./SemesterFragments";

const SemesterDeleteMutationStr = `
mutation SemesterDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: semesterDelete(
    semester: {id: $id, lastchange: $lastchange}
  ) {
    ... on SemesterGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...SemesterLarge
      }
    }
  }
}
`
const SemesterDeleteMutation = createQueryStrLazy(`
mutation SemesterDelete($id: UUID!, $lastchange: DateTime!) {
  result: semesterDelete(semester: { id: $id, lastchange: $lastchange }) {
    ...SemesterLargeFragment
  }
}
`, SemesterLargeFragment)
export const SemesterDeleteAsyncAction = createAsyncGraphQLAction(SemesterDeleteMutation)