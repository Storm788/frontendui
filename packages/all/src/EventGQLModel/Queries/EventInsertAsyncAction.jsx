import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { EventLargeFragment } from "./EventFragments";


const EventInsertMutationStr = `
mutation EventInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: eventInsert(
    event: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...EventLarge
  }
}
`

const EventInsertMutation = createQueryStrLazy(`
mutation EventInsert($name: String, $nameEn: String, $description: String, $startDate: DateTime, $endDate: DateTime, $parentId: UUID, $id: UUID, $rbacobjectId: UUID) {
  result: eventInsert(event: { name: $name, nameEn: $nameEn, description: $description, startDate: $startDate, endDate: $endDate, parentId: $parentId, id: $id, rbacobjectId: $rbacobjectId }) {
    __typename
    ... on EventGQLModel {
      ...EventLargeFragment
    }
    ... on InsertError {
      msg
      failed
      input
    }
  }
}
`, EventLargeFragment)
export const EventInsertAsyncAction = createAsyncGraphQLAction(EventInsertMutation)