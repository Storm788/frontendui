import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ExamLargeFragment } from "./ExamFragments";

const ExamInsertMutation = createQueryStrLazy( 
`
mutation ExamInsertMutation($id: UUID, $name: String, $name_en: String, $maxScore: Int, $minScore: Int) {
  result: examInsert(
    exam: {id: $id, name: $name, nameEn: $name_en, maxScore: $maxScore, minScore: $minScore}
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