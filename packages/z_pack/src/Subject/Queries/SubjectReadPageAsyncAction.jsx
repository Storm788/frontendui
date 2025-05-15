import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { SubjectLargeFragment } from "./SubjectFragments";

const SubjectReadPageQuery = createQueryStrLazy(
`
query SubjectReadPageQuery($skip: Int, $limit: Int, $where: SubjectWhereInputFilter) {
  result: subjectPage(skip: $skip, limit: $limit, where: $where) {
    ...SubjectLarge
  }
}
`, 
    SubjectLargeFragment)

export const SubjectReadPageAsyncAction = createAsyncGraphQLAction(SubjectReadPageQuery)