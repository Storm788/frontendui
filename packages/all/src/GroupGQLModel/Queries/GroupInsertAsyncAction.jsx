import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { GroupLargeFragment } from "./GroupFragments";


const GroupInsertMutationStr = `
mutation GroupInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: groupInsert(
    group: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...GroupLarge
  }
}
`

const GroupInsertMutation = createQueryStrLazy(`
mutation GroupInsert($name: String!, $grouptypeId: UUID!, $id: UUID, $nameEn: String, $mastergroupId: UUID, $valid: Boolean, $abbreviation: String, $email: String) {
  result: groupInsert(group: { name: $name, grouptypeId: $grouptypeId, id: $id, nameEn: $nameEn, mastergroupId: $mastergroupId, valid: $valid, abbreviation: $abbreviation, email: $email }) {
    __typename
    ... on GroupGQLModel {
      ...GroupLargeFragment
    }
    ... on InsertError {
      msg
      failed
      input
    }
  }
}
`, GroupLargeFragment)
export const GroupInsertAsyncAction = createAsyncGraphQLAction(GroupInsertMutation)