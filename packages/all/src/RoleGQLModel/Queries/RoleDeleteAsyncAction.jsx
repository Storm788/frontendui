import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { RoleLargeFragment } from "./RoleFragments";

const RoleDeleteMutationStr = `
mutation RoleDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: roleDelete(
    role: {id: $id, lastchange: $lastchange}
  ) {
    ... on RoleGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...RoleLarge
      }
    }
  }
}
`
const RoleDeleteMutation = createQueryStrLazy(`
mutation RoleDelete($id: UUID!, $lastchange: DateTime!) {
  result: roleDelete(id: $id, lastchange: $lastchange) {
    ...RoleLargeFragment
  }
}
`, RoleLargeFragment)
export const RoleDeleteAsyncAction = createAsyncGraphQLAction(RoleDeleteMutation)