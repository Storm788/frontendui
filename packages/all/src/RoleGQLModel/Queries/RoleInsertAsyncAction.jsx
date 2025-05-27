import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { RoleLargeFragment } from "./RoleFragments";


const RoleInsertMutationStr = `
mutation RoleInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: roleInsert(
    role: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...RoleLarge
  }
}
`

const RoleInsertMutation = createQueryStrLazy(`
mutation RoleInsert($userId: UUID!, $groupId: UUID!, $roletypeId: UUID!, $id: UUID, $deputy: Boolean, $startdate: DateTime, $enddate: DateTime) {
  result: roleInsert(userId: $userId, groupId: $groupId, roletypeId: $roletypeId, id: $id, deputy: $deputy, startdate: $startdate, enddate: $enddate) {
    __typename
    ... on RoleGQLModel {
      ...RoleLargeFragment
    }
    ... on InsertError {
      msg
      failed
      input
    }
  }
}
`, RoleLargeFragment)
export const RoleInsertAsyncAction = createAsyncGraphQLAction(RoleInsertMutation)