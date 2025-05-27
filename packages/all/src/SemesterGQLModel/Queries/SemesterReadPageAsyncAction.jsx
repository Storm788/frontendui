import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { SemesterLargeFragment } from "./SemesterFragments";

const SemesterReadPageQueryStr = `
query SemesterReadPageQuery($skip: Int, $limit: Int, $where: SemesterWhereInputFilter) {
  result: semesterPage(skip: $skip, limit: $limit, where: $where) {
    ...SemesterLarge
  }
}
`
const SemesterReadPageQuery = createQueryStrLazy(`
query SemesterPage($skip: Int, $limit: Int, $orderby: String, $where: SemesterInputFilter) {
  result: semesterPage(skip: $skip, limit: $limit, orderby: $orderby, where: $where) {
    ...SemesterLargeFragment
  }
}
`, SemesterLargeFragment)
export const SemesterReadPageAsyncAction = createAsyncGraphQLAction(SemesterReadPageQuery)