import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LessonLargeFragment } from "./LessonFragments";

const LessonDeleteMutationStr = `
mutation LessonDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: lessonDelete(
    lesson: {id: $id, lastchange: $lastchange}
  ) {
    ... on LessonGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...LessonLarge
      }
    }
  }
}
`
const LessonDeleteMutation = createQueryStrLazy(`
mutation LessonDelete($id: UUID!, $lastchange: DateTime!, $count: Int, $topicId: UUID, $typeId: UUID) {
  result: lessonDelete(lesson: { id: $id, lastchange: $lastchange, count: $count, topicId: $topicId, typeId: $typeId }) {
    ...LessonLargeFragment
  }
}
`, LessonLargeFragment)
export const LessonDeleteAsyncAction = createAsyncGraphQLAction(LessonDeleteMutation)