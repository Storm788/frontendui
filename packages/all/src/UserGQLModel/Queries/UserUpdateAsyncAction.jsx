import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { UserLargeFragment } from "./UserFragments";

const UserUpdateMutationStr = `
mutation UserUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: userUpdate(
    user: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on UserGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...UserLarge
      }      
    }
    ...UserLarge
  }
}
`

const UserUpdateMutation = createQueryStrLazy(`
mutation UserUpdate($id: UUID!, $lastchange: DateTime!, $name: String, $surname: String, $email: String, $valid: Boolean) {
  result: userUpdate(user: { id: $id, lastchange: $lastchange, name: $name, surname: $surname, email: $email, valid: $valid }) {
    __typename
    ... on UserGQLModel {
      ...UserLargeFragment
    }
    ... on UserGQLModelUpdateError {
      Entity {
        ...UserLargeFragment
      }
      msg
      failed
      input
    }
  }
}
`, UserLargeFragment)
export const UserUpdateAsyncAction = createAsyncGraphQLAction(UserUpdateMutation)