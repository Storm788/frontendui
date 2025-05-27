import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudentLargeFragment } from "./StudentFragments";

const StudentReadPageQueryStr = `
query StudentReadPageQuery($skip: Int, $limit: Int, $where: StudentWhereInputFilter) {
  result: studentPage(skip: $skip, limit: $limit, where: $where) {
    ...StudentLarge
  }
}
`
const StudentReadPageQuery = createQueryStrLazy(`
query StudentPage($skip: Int, $limit: Int, $orderby: String, $where: StudentInputFilter) {
  result: studentPage(skip: $skip, limit: $limit, orderby: $orderby, where: $where) {
    ...StudentLargeFragment
  }
}
`, StudentLargeFragment)
export const StudentReadPageAsyncAction = createAsyncGraphQLAction(StudentReadPageQuery)