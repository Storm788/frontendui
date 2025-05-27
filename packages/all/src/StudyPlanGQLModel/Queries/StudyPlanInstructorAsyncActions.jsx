import { createAsyncGraphQLAction, createQueryStrLazy, updateItemsFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared";



const LessonAddInstructorMutationStr = `
mutation studyPlanLessonAddInstructor($id: UUID!, $userId: UUID!) {
  result: studyPlanLessonAddInstructor(
    studyPlanLesson: {planitemId: $id, userId: $userId}
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

const LessonRemoveInstructorMutationStr =`
mutation studyPlanLessonRemoveInstructor($id: UUID!, $userId: UUID!) {
  result: studyPlanLessonRemoveInstructor(
    studyPlanLesson: {planitemId: $id, userId: $userId}
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

export const LessonFragment = createQueryStrLazy(`fragment Lesson on StudyPlanLessonGQLModel {
  __typename
  id
  lastchange
  plan {
    __typename
    id
    semester {
      id
      order
      subject {
        id
        name
      }
    }
    lessons {
      id
      lastchange
      order
      name
      nameEn
      length
      eventId
      instructors {
        id
        fullname
        email
      }
      studyGroups {
        id
        name
      }
      facilities {
        id
        name
      }
    }
  }
}`)

const StudyPlanAddInstructorMutation = createQueryStrLazy(`${LessonAddInstructorMutationStr}`, LessonFragment)
const StudyPlanRemoveInstructorMutation = createQueryStrLazy(`${LessonRemoveInstructorMutationStr}`, LessonFragment)

export const LessonAddInstructorAsyncAction = createAsyncGraphQLAction(StudyPlanAddInstructorMutation, updateItemsFromGraphQLResult(3))
export const LessonRemoveInstructorAsyncAction = createAsyncGraphQLAction(StudyPlanRemoveInstructorMutation, updateItemsFromGraphQLResult(3))