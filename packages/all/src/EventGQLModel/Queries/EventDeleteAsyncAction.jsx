import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { EventLargeFragment } from "./EventFragments";

const EventDeleteMutationStr = `
mutation EventDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: eventDelete(
    event: {id: $id, lastchange: $lastchange}
  ) {
    ... on EventGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...EventLarge
      }
    }
  }
}
`
const EventDeleteMutation = createQueryStrLazy(`
mutation EventDelete($id: UUID!, $lastchange: DateTime!) {
  result: eventDelete(event: { id: $id, lastchange: $lastchange }) {
    ...EventLargeFragment
  }
}
`, EventLargeFragment)
export const EventDeleteAsyncAction = createAsyncGraphQLAction(EventDeleteMutation)