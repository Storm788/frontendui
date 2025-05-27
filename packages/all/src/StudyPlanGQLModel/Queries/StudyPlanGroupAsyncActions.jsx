import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LessonFragment } from "./StudyPlanInstructorAsyncActions";


const LessonAddGroupMutationStr = `
mutation studyPlanLessonAddGroup($id: UUID!, $groupId: UUID!) {
  result: studyPlanLessonAddGroup(
    studyPlanLesson: {planitemId: $id, groupId: $groupId}
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

const LessonRemoveGroupMutationStr =`
mutation studyPlanLessonRemoveGroup($id: UUID!, $groupId: UUID!) {
  result: studyPlanLessonRemoveGroup(
    studyPlanLesson: {planitemId: $id, groupId: $groupId}
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

const StudyPlanAddGroupMutation = createQueryStrLazy(`${LessonAddGroupMutationStr}`, LessonFragment)
const StudyPlanRemoveGroupMutation = createQueryStrLazy(`${LessonRemoveGroupMutationStr}`, LessonFragment)

export const LessonAddGroupAsyncAction = createAsyncGraphQLAction(StudyPlanAddGroupMutation)
export const LessonRemoveGroupAsyncAction = createAsyncGraphQLAction(StudyPlanRemoveGroupMutation)