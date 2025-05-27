import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { UserLargeFragment } from "./UserFragments";

const UserDeleteMutationStr = `
mutation UserDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: userDelete(
    user: {id: $id, lastchange: $lastchange}
  ) {
    ... on UserGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...UserLarge
      }
    }
  }
}
`
const UserDeleteMutation = createQueryStrLazy(`
mutation UserDelete($id: UUID!, $lastchange: DateTime!) {
  result: userDelete(user: { id: $id, lastchange: $lastchange }) {
    ...UserLargeFragment
  }
}
`, UserLargeFragment)
export const UserDeleteAsyncAction = createAsyncGraphQLAction(UserDeleteMutation)