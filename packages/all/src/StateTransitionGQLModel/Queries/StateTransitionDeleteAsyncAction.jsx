import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StateTransitionLargeFragment } from "./StateTransitionFragments";

const StateTransitionDeleteMutationStr = `
mutation StateTransitionDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: statetransitionDelete(
    statetransition: {id: $id, lastchange: $lastchange}
  ) {
    ... on StateTransitionGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...StateTransitionLarge
      }
    }
  }
}
`
const StateTransitionDeleteMutation = createQueryStrLazy(`
mutation StatetransitionDelete($lastchange: DateTime!, $id: UUID!) {
  result: statetransitionDelete(lastchange: $lastchange, id: $id) {
    ...StateTransitionLargeFragment
  }
}
`, StateTransitionLargeFragment)
export const StateTransitionDeleteAsyncAction = createAsyncGraphQLAction(StateTransitionDeleteMutation)