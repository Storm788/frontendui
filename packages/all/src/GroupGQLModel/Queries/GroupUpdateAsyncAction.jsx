import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { GroupLargeFragment } from "./GroupFragments";

const GroupUpdateMutationStr = `
mutation GroupUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: groupUpdate(
    group: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on GroupGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...GroupLarge
      }      
    }
    ...GroupLarge
  }
}
`

const GroupUpdateMutation = createQueryStrLazy(`
mutation GroupUpdate($id: UUID!, $lastchange: DateTime!, $name: String, $nameEn: String, $grouptypeId: UUID, $mastergroupId: UUID, $valid: Boolean, $abbreviation: String, $email: String) {
  result: groupUpdate(group: { id: $id, lastchange: $lastchange, name: $name, nameEn: $nameEn, grouptypeId: $grouptypeId, mastergroupId: $mastergroupId, valid: $valid, abbreviation: $abbreviation, email: $email }) {
    __typename
    ... on GroupGQLModel {
      ...GroupLargeFragment
    }
    ... on GroupGQLModelUpdateError {
      Entity {
        ...GroupLargeFragment
      }
      msg
      failed
      input
    }
  }
}
`, GroupLargeFragment)
export const GroupUpdateAsyncAction = createAsyncGraphQLAction(GroupUpdateMutation)