import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StateLargeFragment } from "./StateFragments";

const StateDeleteMutationStr = `
mutation StateDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: stateDelete(
    state: {id: $id, lastchange: $lastchange}
  ) {
    ... on StateGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...StateLarge
      }
    }
  }
}
`
const StateDeleteMutation = createQueryStrLazy(`
mutation StateDelete($lastchange: DateTime!, $id: UUID!) {
  result: stateDelete(state: { lastchange: $lastchange, id: $id }) {
    ...StateLargeFragment
  }
}
`, StateLargeFragment)
export const StateDeleteAsyncAction = createAsyncGraphQLAction(StateDeleteMutation)