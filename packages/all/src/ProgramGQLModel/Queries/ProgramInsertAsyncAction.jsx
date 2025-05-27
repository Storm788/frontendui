import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramLargeFragment } from "./ProgramFragments";


const ProgramInsertMutationStr = `
mutation ProgramInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: programInsert(
    program: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...ProgramLarge
  }
}
`

const ProgramInsertMutation = createQueryStrLazy(`
mutation ProgramInsert($id: UUID, $name: String, $nameEn: String, $groupId: UUID, $licencedGroupId: UUID, $typeId: UUID) {
  result: programInsert(program: { id: $id, name: $name, nameEn: $nameEn, groupId: $groupId, licencedGroupId: $licencedGroupId, typeId: $typeId }) {
    __typename
    ... on ProgramGQLModel {
      ...ProgramLargeFragment
    }
    ... on InsertError {
      msg
      failed
      input
    }
  }
}
`, ProgramLargeFragment)
export const ProgramInsertAsyncAction = createAsyncGraphQLAction(ProgramInsertMutation)