import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LessonTypeLargeFragment } from "./LessonTypeFragments";

const LessonTypeReadPageQueryStr = `
query LessonTypeReadPageQuery($skip: Int, $limit: Int, $where: LessonTypeInputFilter) {
  result: lessonTypePage(skip: $skip, limit: $limit, where: $where) {
    ...LessonTypeLargeFragment
  }
}
`
const LessonTypeReadPageQuery = createQueryStrLazy(`${LessonTypeReadPageQueryStr}`, LessonTypeLargeFragment)
export const LessonTypeReadPageAsyncAction = createAsyncGraphQLAction(LessonTypeReadPageQuery)