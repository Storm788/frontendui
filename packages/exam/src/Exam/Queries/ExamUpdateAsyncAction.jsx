import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ExamLargeFragment } from "./ExamFragments";

const ExamUpdateMutation = createQueryStrLazy(
`
mutation ExamUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: examUpdate(
    exam: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on ExamGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...ExamLarge
      }      
    }
    ...ExamLarge
  }
}
`, ExamLargeFragment)

export const ExamUpdateAsyncAction = createAsyncGraphQLAction(ExamUpdateMutation)