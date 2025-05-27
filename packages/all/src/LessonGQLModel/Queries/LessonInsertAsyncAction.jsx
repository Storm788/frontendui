import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LessonLargeFragment } from "./LessonFragments";


const LessonInsertMutationStr = `
mutation LessonInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: lessonInsert(
    lesson: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...LessonLarge
  }
}
`

const LessonInsertMutation = createQueryStrLazy(`
mutation LessonInsert($id: UUID, $count: Int, $topicId: UUID, $typeId: UUID) {
  result: lessonInsert(lesson: { id: $id, count: $count, topicId: $topicId, typeId: $typeId }) {
    __typename
    ... on LessonGQLModel {
      ...LessonLargeFragment
    }
    ... on InsertError {
      msg
      failed
      input
    }
  }
}
`, LessonLargeFragment)
export const LessonInsertAsyncAction = createAsyncGraphQLAction(LessonInsertMutation)