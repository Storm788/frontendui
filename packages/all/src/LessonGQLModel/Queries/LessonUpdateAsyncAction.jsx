import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LessonLargeFragment } from "./LessonFragments";

const LessonUpdateMutationStr = `
mutation LessonUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: lessonUpdate(
    lesson: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on LessonGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...LessonLarge
      }      
    }
    ...LessonLarge
  }
}
`

const LessonUpdateMutation = createQueryStrLazy(`
mutation LessonUpdate($id: UUID!, $lastchange: DateTime!, $count: Int, $topicId: UUID, $typeId: UUID) {
  result: lessonUpdate(lesson: { id: $id, lastchange: $lastchange, count: $count, topicId: $topicId, typeId: $typeId }) {
    __typename
    ... on LessonGQLModel {
      ...LessonLargeFragment
    }
    ... on LessonGQLModelUpdateError {
      Entity {
        ...LessonLargeFragment
      }
      msg
      failed
      input
    }
  }
}
`, LessonLargeFragment)
export const LessonUpdateAsyncAction = createAsyncGraphQLAction(LessonUpdateMutation)