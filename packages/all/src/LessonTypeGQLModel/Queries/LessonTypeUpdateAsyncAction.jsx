import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LessonTypeLargeFragment } from "./LessonTypeFragments";

const LessonTypeUpdateMutationStr = `
mutation LessonTypeUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: lessontypeUpdate(
    lessontype: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on LessonTypeGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...LessonTypeLarge
      }      
    }
    ...LessonTypeLarge
  }
}
`

const LessonTypeUpdateMutation = createQueryStrLazy(`${LessonTypeUpdateMutationStr}`, LessonTypeLargeFragment)
export const LessonTypeUpdateAsyncAction = createAsyncGraphQLAction(LessonTypeUpdateMutation)