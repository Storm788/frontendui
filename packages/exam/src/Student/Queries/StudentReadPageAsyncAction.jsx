import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudentLargeFragment } from "./StudentFragments";

const StudentReadPageQuery = createQueryStrLazy(
`
query studentPage($skip: Int, $limit: Int, $orderby: String, $where: StudentInputFilter) {
  studentPage(skip: $skip, limit: $limit, orderby: $orderby, where: $where) {
  ...StudentLarge
}
}
`, 
    StudentLargeFragment)

export const StudentReadPageAsyncAction = createAsyncGraphQLAction(StudentReadPageQuery)