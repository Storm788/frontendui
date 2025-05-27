import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { RoleLargeFragment } from "./RoleFragments";

const RoleUpdateMutationStr = `
mutation RoleUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: roleUpdate(
    role: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on RoleGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...RoleLarge
      }      
    }
    ...RoleLarge
  }
}
`

const RoleUpdateMutation = createQueryStrLazy(`
mutation RoleUpdate($id: UUID!, $lastchange: DateTime!, $valid: Boolean, $startdate: DateTime, $enddate: DateTime) {
  result: roleUpdate(id: $id, lastchange: $lastchange, valid: $valid, startdate: $startdate, enddate: $enddate) {
    __typename
    ... on RoleGQLModel {
      ...RoleLargeFragment
    }
    ... on RoleGQLModelUpdateError {
      Entity
      msg
      failed
      input
    }
  }
}
`, RoleLargeFragment)
export const RoleUpdateAsyncAction = createAsyncGraphQLAction(RoleUpdateMutation)