import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudyPlanLessonLargeFragment } from "./StudyPlanLessonFragments";

const StudyPlanLessonReadPageQueryStr = `
query StudyPlanLessonReadPageQuery($skip: Int, $limit: Int, $where: StudyPlanLessonWhereInputFilter) {
  result: studyplanlessonPage(skip: $skip, limit: $limit, where: $where) {
    ...StudyPlanLessonLarge
  }
}
`
const StudyPlanLessonReadPageQuery = createQueryStrLazy(`${StudyPlanLessonReadPageQueryStr}`, StudyPlanLessonLargeFragment)
export const StudyPlanLessonReadPageAsyncAction = createAsyncGraphQLAction(StudyPlanLessonReadPageQuery)