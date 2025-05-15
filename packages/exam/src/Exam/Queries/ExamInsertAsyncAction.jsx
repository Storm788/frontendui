import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ExamLargeFragment } from "./ExamFragments";

const ExamInsertMutation = createQueryStrLazy(
`
mutation ExamInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: examInsert(
    exam: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...ExamLarge
  }
}
`,
    ExamLargeFragment)


export const ExamInsertAsyncAction = createAsyncGraphQLAction(ExamInsertMutation)