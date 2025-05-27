import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { TopicLargeFragment } from "./TopicFragments";

const TopicUpdateMutationStr = `
mutation TopicUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: topicUpdate(
    topic: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on TopicGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...TopicLarge
      }      
    }
    ...TopicLarge
  }
}
`

const TopicUpdateMutation = createQueryStrLazy(`
mutation TopicUpdate($id: UUID!, $lastchange: DateTime!, $name: String, $nameEn: String, $order: Int, $description: String, $semesterId: UUID) {
  result: topicUpdate(topic: { id: $id, lastchange: $lastchange, name: $name, nameEn: $nameEn, order: $order, description: $description, semesterId: $semesterId }) {
    __typename
    ... on TopicGQLModel {
      ...TopicLargeFragment
    }
    ... on TopicGQLModelUpdateError {
      Entity {
        ...TopicLargeFragment
      }
      msg
      failed
      input
    }
  }
}
`, TopicLargeFragment)
export const TopicUpdateAsyncAction = createAsyncGraphQLAction(TopicUpdateMutation)