import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ExamLargeFragment } from "./ExamFragments";

const ExamReadPageQuery = createQueryStrLazy(
`
query ExamReadPageQuery($skip: Int, $limit: Int, $where: ExamWhereInputFilter) {
  result: examPage(skip: $skip, limit: $limit, where: $where) {
    ...ExamLarge
  }
}
`, 
    ExamLargeFragment)

export const ExamReadPageAsyncAction = createAsyncGraphQLAction(ExamReadPageQuery)