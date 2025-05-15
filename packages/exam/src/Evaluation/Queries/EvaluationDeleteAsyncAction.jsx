import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { EvaluationLargeFragment } from "./EvaluationFragments";

const EvaluationDeleteMutation = createQueryStrLazy(
`
mutation EvaluationDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: evaluationDelete(
    evaluation: {id: $id, lastchange: $lastchange}
  ) {
    ... on EvaluationGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...EvaluationLarge
      }
    }
  }
}
`,
    EvaluationLargeFragment)

export const EvaluationDeleteAsyncAction = createAsyncGraphQLAction(EvaluationDeleteMutation)