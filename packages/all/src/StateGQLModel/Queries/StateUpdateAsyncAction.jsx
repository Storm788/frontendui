import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StateLargeFragment } from "./StateFragments";

const StateUpdateMutationStr = `
mutation StateUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: stateUpdate(
    state: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on StateGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...StateLarge
      }      
    }
    ...StateLarge
  }
}
`

const StateUpdateMutation = createQueryStrLazy(`
mutation StateUpdate($lastchange: DateTime!, $id: UUID!, $name: String, $nameEn: String, $order: Int) {
  result: stateUpdate(state: { lastchange: $lastchange, id: $id, name: $name, nameEn: $nameEn, order: $order }) {
    __typename
    ... on StateGQLModel {
      ...StateLargeFragment
    }
    ... on StateGQLModelUpdateError {
      Entity {
        ...StateLargeFragment
      }
      msg
      failed
      input
    }
  }
}
`, StateLargeFragment)
export const StateUpdateAsyncAction = createAsyncGraphQLAction(StateUpdateMutation)