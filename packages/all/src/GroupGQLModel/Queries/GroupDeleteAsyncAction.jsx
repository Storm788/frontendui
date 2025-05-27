import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { GroupLargeFragment } from "./GroupFragments";

const GroupDeleteMutationStr = `
mutation GroupDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: groupDelete(
    group: {id: $id, lastchange: $lastchange}
  ) {
    ... on GroupGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...GroupLarge
      }
    }
  }
}
`
const GroupDeleteMutation = createQueryStrLazy(`
mutation GroupDelete($id: UUID!, $lastchange: DateTime!) {
  result: groupDelete(group: { id: $id, lastchange: $lastchange }) {
    ...GroupLargeFragment
  }
}
`, GroupLargeFragment)
export const GroupDeleteAsyncAction = createAsyncGraphQLAction(GroupDeleteMutation)