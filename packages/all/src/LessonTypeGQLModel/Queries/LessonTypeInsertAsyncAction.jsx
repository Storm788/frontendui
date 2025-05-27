import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LessonTypeLargeFragment } from "./LessonTypeFragments";


const LessonTypeInsertMutationStr = `
mutation LessonTypeInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: lessontypeInsert(
    lessontype: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...LessonTypeLarge
  }
}
`

const LessonTypeInsertMutation = createQueryStrLazy(`${LessonTypeInsertMutationStr}`, LessonTypeLargeFragment)
export const LessonTypeInsertAsyncAction = createAsyncGraphQLAction(LessonTypeInsertMutation)