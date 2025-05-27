import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudentLargeFragment } from "./StudentFragments";


const StudentInsertMutationStr = `
mutation StudentInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: studentInsert(
    student: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...StudentLarge
  }
}
`

const StudentInsertMutation = createQueryStrLazy(`
mutation StudentInsert($id: UUID, $userId: UUID, $programId: UUID, $stateId: UUID, $semesterNumber: Int) {
  result: studentInsert(student: { id: $id, userId: $userId, programId: $programId, stateId: $stateId, semesterNumber: $semesterNumber }) {
    __typename
    ... on StudentGQLModel {
      ...StudentLargeFragment
    }
    ... on InsertError {
      msg
      failed
      input
    }
  }
}
`, StudentLargeFragment)
export const StudentInsertAsyncAction = createAsyncGraphQLAction(StudentInsertMutation)