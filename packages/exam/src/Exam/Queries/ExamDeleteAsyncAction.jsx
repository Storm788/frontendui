import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ExamLargeFragment } from "./ExamFragments";

const ExamDeleteMutation = createQueryStrLazy(
`
mutation ExamDeleteMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String, $maxScore: Int, $minScore: Int) {
  result: examDelete(
    exam: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en, maxScore: $maxScore, minScore: $minScore}
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