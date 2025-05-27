import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { EvaluationLargeFragment } from "./EvaluationFragments";

const EvaluationInsertMutation = createQueryStrLazy(
`
mutation EvaluationInsertMutation($id: UUID, $studentId: UUID, $passed: Boolean, $grade: String, $points: Int) {
  result: evaluationInsert(
    evaluation: {id: $id, studentId: $studentId, passed: $passed, grade: $grade, points: $points}
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