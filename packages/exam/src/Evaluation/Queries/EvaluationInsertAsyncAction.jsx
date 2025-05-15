import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { EvaluationLargeFragment } from "./EvaluationFragments";

const EvaluationInsertMutation = createQueryStrLazy(
`
mutation EvaluationInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: evaluationInsert(
    evaluation: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...EvaluationLarge
  }
}
`,
    EvaluationLargeFragment)


export const EvaluationInsertAsyncAction = createAsyncGraphQLAction(EvaluationInsertMutation)