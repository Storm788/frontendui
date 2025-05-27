import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LessonTypeLargeFragment } from "./LessonTypeFragments";

const LessonTypeDeleteMutationStr = `
mutation LessonTypeDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: lessontypeDelete(
    lessontype: {id: $id, lastchange: $lastchange}
  ) {
    ... on LessonTypeGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...LessonTypeLarge
      }
    }
  }
}
`
const LessonTypeDeleteMutation = createQueryStrLazy(`${LessonTypeDeleteMutationStr}`, LessonTypeLargeFragment)
export const LessonTypeDeleteAsyncAction = createAsyncGraphQLAction(LessonTypeDeleteMutation)