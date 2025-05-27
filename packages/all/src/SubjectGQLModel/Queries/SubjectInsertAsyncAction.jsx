import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { SubjectLargeFragment } from "./SubjectFragments";


const SubjectInsertMutationStr = `
mutation SubjectInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: subjectInsert(
    subject: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...SubjectLarge
  }
}
`

const SubjectInsertMutation = createQueryStrLazy(`
mutation SubjectInsert($id: UUID, $name: String, $nameEn: String, $description: String, $descriptionEn: String, $programId: UUID, $groupId: UUID) {
  result: subjectInsert(subject: { id: $id, name: $name, nameEn: $nameEn, description: $description, descriptionEn: $descriptionEn, programId: $programId, groupId: $groupId }) {
    __typename
    ... on SubjectGQLModel {
      ...SubjectLargeFragment
    }
    ... on InsertError {
      msg
      failed
      input
    }
  }
}
`, SubjectLargeFragment)
export const SubjectInsertAsyncAction = createAsyncGraphQLAction(SubjectInsertMutation)