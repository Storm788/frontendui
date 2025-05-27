import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { TopicLargeFragment } from "./TopicFragments";

const TopicDeleteMutationStr = `
mutation TopicDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: topicDelete(
    topic: {id: $id, lastchange: $lastchange}
  ) {
    ... on TopicGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...TopicLarge
      }
    }
  }
}
`
const TopicDeleteMutation = createQueryStrLazy(`
mutation TopicDelete($id: UUID!, $lastchange: DateTime!) {
  result: topicDelete(topic: { id: $id, lastchange: $lastchange }) {
    ...TopicLargeFragment
  }
}
`, TopicLargeFragment)
export const TopicDeleteAsyncAction = createAsyncGraphQLAction(TopicDeleteMutation)