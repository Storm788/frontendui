import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudyPlanLessonLargeFragment } from "./StudyPlanLessonFragments";

const StudyPlanLessonDeleteMutationStr = `
mutation StudyPlanLessonDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: studyplanlessonDelete(
    studyplanlesson: {id: $id, lastchange: $lastchange}
  ) {
    ... on StudyPlanLessonGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...StudyPlanLessonLarge
      }
    }
  }
}
`
const StudyPlanLessonDeleteMutation = createQueryStrLazy(`${StudyPlanLessonDeleteMutationStr}`, StudyPlanLessonLargeFragment)
export const StudyPlanLessonDeleteAsyncAction = createAsyncGraphQLAction(StudyPlanLessonDeleteMutation)