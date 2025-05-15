import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { EvaluationLargeFragment } from "./EvaluationFragments";

const EvaluationReadPageQuery = createQueryStrLazy(
`
query EvaluationReadPageQuery($skip: Int, $limit: Int, $where: EvaluationWhereInputFilter) {
  result: evaluationPage(skip: $skip, limit: $limit, where: $where) {
    ...EvaluationLarge
  }
}
`, 
    EvaluationLargeFragment)

export const EvaluationReadPageAsyncAction = createAsyncGraphQLAction(EvaluationReadPageQuery)