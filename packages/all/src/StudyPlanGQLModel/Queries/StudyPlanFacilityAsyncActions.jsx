import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LessonFragment } from "./StudyPlanInstructorAsyncActions";


const LessonAddFacilityMutationStr = `
mutation studyPlanLessonAddFacility($id: UUID!, $facilityId: UUID!) {
  result: studyPlanLessonAddFacility(
    studyPlanLesson: {planitemId: $id, facilityId: $facilityId}
  ) {
    __typename
    ... on StudyPlanLessonGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...Lesson
      }
    }
    ...on StudyPlanLessonGQLModel {
      ...Lesson
    }
  }
}
`

const LessonRemoveFacilityMutationStr =`
mutation studyPlanLessonRemoveFacility($id: UUID!, $facilityId: UUID!) {
  result: studyPlanLessonRemoveFacility(
    studyPlanLesson: {planitemId: $id, facilityId: $facilityId}
  ) {
    __typename
    ... on StudyPlanLessonGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...Lesson
      }
    }
    ...on StudyPlanLessonGQLModel {
      ...Lesson
    }
  }
}`

const StudyPlanAddFacilityMutation = createQueryStrLazy(`${LessonAddFacilityMutationStr}`, LessonFragment)
const StudyPlanRemoveFacilityMutation = createQueryStrLazy(`${LessonRemoveFacilityMutationStr}`, LessonFragment)

export const LessonAddFacilityAsyncAction = createAsyncGraphQLAction(StudyPlanAddFacilityMutation)
export const LessonRemoveFacilityAsyncAction = createAsyncGraphQLAction(StudyPlanRemoveFacilityMutation)