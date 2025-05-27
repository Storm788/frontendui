import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudyPlanLessonLargeFragment } from "./StudyPlanLessonFragments";
import { StudyPlanLargeFragment } from "../../StudyPlanGQLModel";

const StudyPlanLessonUpdateMutationStr = `
mutation StudyPlanLessonUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String, $lessontypeId: UUID!, $topicId: UUID!, $length: Int, $order:Int, $eventId: UUID) {
  result: studyPlanLessonUpdate(
    studyPlanLesson: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en, lessontypeId: $lessontypeId, topicId: $topicId, length: $length, order: $order, eventId: $eventId}
  ) {
    ... on StudyPlanLessonGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...StudyPlanLessonLargeFragment
      }      
    }
    ...on StudyPlanLessonGQLModel {
      ...StudyPlanLessonLargeFragment
      plan {
        __typename
        ...StudyPlanLargeFragment
      }
    }
    
  }
}
`

const StudyPlanLessonUpdateMutation = createQueryStrLazy(`${StudyPlanLessonUpdateMutationStr}`, StudyPlanLessonLargeFragment, StudyPlanLargeFragment)
export const StudyPlanLessonUpdateAsyncAction = createAsyncGraphQLAction(StudyPlanLessonUpdateMutation)