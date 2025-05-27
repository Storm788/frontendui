import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudyPlanLessonLargeFragment } from "./StudyPlanLessonFragments";


const StudyPlanLessonInsertMutationStr = `
mutation StudyPlanLessonInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: studyplanlessonInsert(
    studyplanlesson: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...StudyPlanLessonLarge
  }
}
`

const StudyPlanLessonInsertMutation = createQueryStrLazy(`${StudyPlanLessonInsertMutationStr}`, StudyPlanLessonLargeFragment)
export const StudyPlanLessonInsertAsyncAction = createAsyncGraphQLAction(StudyPlanLessonInsertMutation)