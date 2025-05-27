import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { SemesterLargeFragment } from "./SemesterFragments";


const SemesterInsertMutationStr = `
mutation SemesterInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: semesterInsert(
    semester: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...SemesterLarge
  }
}
`

const SemesterInsertMutation = createQueryStrLazy(`
mutation SemesterInsert($id: UUID, $order: Int, $mandatory: Boolean, $credits: Int, $classificationtypeId: UUID, $subjectId: UUID) {
  result: semesterInsert(semester: { id: $id, order: $order, mandatory: $mandatory, credits: $credits, classificationtypeId: $classificationtypeId, subjectId: $subjectId }) {
    __typename
    ... on SemesterGQLModel {
      ...SemesterLargeFragment
    }
    ... on InsertError {
      msg
      failed
      input
    }
  }
}
`, SemesterLargeFragment)
export const SemesterInsertAsyncAction = createAsyncGraphQLAction(SemesterInsertMutation)