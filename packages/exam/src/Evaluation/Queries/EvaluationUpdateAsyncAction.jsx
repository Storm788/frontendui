import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { EvaluationLargeFragment } from "./EvaluationFragments";

const EvaluationUpdateMutation = createQueryStrLazy(
`
mutation EvaluationUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: evaluationUpdate(
    evaluation: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on EvaluationGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...EvaluationLarge
      }      
    }
    ...EvaluationLarge
  }
}
`, EvaluationLargeFragment)

export const EvaluationUpdateAsyncAction = createAsyncGraphQLAction(EvaluationUpdateMutation)