import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudyPlanLargeFragment } from "./StudyPlanFragments";

const StudyPlanReadPageQueryStr = `
query StudyPlanReadPageQuery($skip: Int, $limit: Int, $where: StudyPlanWhereInputFilter) {
  result: studyPlanPage(skip: $skip, limit: $limit, where: $where) {
    ...StudyPlanLarge
  }
}
`
const StudyPlanReadPageQuery = createQueryStrLazy(`${StudyPlanReadPageQueryStr}`, StudyPlanLargeFragment)
export const StudyPlanReadPageAsyncAction = createAsyncGraphQLAction(StudyPlanReadPageQuery)