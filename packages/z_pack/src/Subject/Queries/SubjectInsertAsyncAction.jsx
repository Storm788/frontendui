import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { SubjectLargeFragment } from "./SubjectFragments";

const SubjectInsertMutation = createQueryStrLazy(
`
mutation SubjectInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: subjectInsert(
    subject: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...SubjectLarge
  }
}
`,
    SubjectLargeFragment)


export const SubjectInsertAsyncAction = createAsyncGraphQLAction(SubjectInsertMutation)