import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { EventLargeFragment } from "./EventFragments";

const EventUpdateMutationStr = `
mutation EventUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: eventUpdate(
    event: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on EventGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...EventLarge
      }      
    }
    ...EventLarge
  }
}
`

const EventUpdateMutation = createQueryStrLazy(`
mutation EventUpdate($id: UUID!, $lastchange: DateTime!, $name: String, $nameEn: String, $description: String, $startdate: DateTime, $enddate: DateTime, $parentId: UUID) {
  result: eventUpdate(event: { id: $id, lastchange: $lastchange, name: $name, nameEn: $nameEn, description: $description, startdate: $startdate, enddate: $enddate, parentId: $parentId }) {
    __typename
    ... on EventGQLModel {
      ...EventLargeFragment
    }
    ... on EventGQLModelUpdateError {
      Entity {
        ...EventLargeFragment
      }
      msg
      failed
      input
    }
  }
}
`, EventLargeFragment)
export const EventUpdateAsyncAction = createAsyncGraphQLAction(EventUpdateMutation)