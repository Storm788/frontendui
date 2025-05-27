import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { TopicLargeFragment } from "./TopicFragments";


const TopicInsertMutationStr = `
mutation TopicInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: topicInsert(
    topic: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...TopicLarge
  }
}
`

const TopicInsertMutation = createQueryStrLazy(`
mutation TopicInsert($id: UUID, $name: String, $nameEn: String, $order: Int, $description: String, $semesterId: UUID) {
  result: topicInsert(topic: { id: $id, name: $name, nameEn: $nameEn, order: $order, description: $description, semesterId: $semesterId }) {
    __typename
    ... on TopicGQLModel {
      ...TopicLargeFragment
    }
    ... on InsertError {
      msg
      failed
      input
    }
  }
}
`, TopicLargeFragment)
export const TopicInsertAsyncAction = createAsyncGraphQLAction(TopicInsertMutation)