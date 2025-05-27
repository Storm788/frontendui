import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { UserLargeFragment } from "./UserFragments";


const UserInsertMutationStr = `
mutation UserInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: userInsert(
    user: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...UserLarge
  }
}
`

const UserInsertMutation = createQueryStrLazy(`
mutation UserInsert($id: UUID, $name: String, $surname: String, $email: String, $valid: Boolean) {
  result: userInsert(user: { id: $id, name: $name, surname: $surname, email: $email, valid: $valid }) {
    __typename
    ... on UserGQLModel {
      ...UserLargeFragment
    }
    ... on InsertError {
      msg
      failed
      input
    }
  }
}
`, UserLargeFragment)
export const UserInsertAsyncAction = createAsyncGraphQLAction(UserInsertMutation)