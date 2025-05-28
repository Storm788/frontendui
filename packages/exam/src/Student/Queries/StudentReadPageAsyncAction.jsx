import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudentLargeFragment } from "./StudentFragments";

const StudentReadPageQuery = createQueryStrLazy(
`
query StudentReadPageQuery($skip: Int, $limit: Int, $where: StudentWhereInputFilter) {
  result: studentPage(skip: $skip, limit: $limit, where: $where) {
    ...StudentLarge
  }
}
`, 
    StudentLargeFragment)

export const StudentReadPageAsyncAction = createAsyncGraphQLAction(StudentReadPageQuery)