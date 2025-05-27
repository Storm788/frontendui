import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudentLargeFragment } from "./StudentFragments";

const StudentUpdateMutationStr = `
mutation StudentUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: studentUpdate(
    student: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on StudentGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...StudentLarge
      }      
    }
    ...StudentLarge
  }
}
`

const StudentUpdateMutation = createQueryStrLazy(`
mutation StudentUpdate($id: UUID!, $lastchange: DateTime!, $userId: UUID, $programId: UUID, $stateId: UUID, $semesterNumber: Int) {
  result: studentUpdate(student: { id: $id, lastchange: $lastchange, userId: $userId, programId: $programId, stateId: $stateId, semesterNumber: $semesterNumber }) {
    __typename
    ... on StudentGQLModel {
      ...StudentLargeFragment
    }
    ... on StudentGQLModelUpdateError {
      Entity {
        ...StudentLargeFragment
      }
      msg
      failed
      input
    }
  }
}
`, StudentLargeFragment)
export const StudentUpdateAsyncAction = createAsyncGraphQLAction(StudentUpdateMutation)