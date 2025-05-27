import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StateTransitionLargeFragment } from "./StateTransitionFragments";

const StateTransitionUpdateMutationStr = `
mutation StateTransitionUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: statetransitionUpdate(
    statetransition: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on StateTransitionGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...StateTransitionLarge
      }      
    }
    ...StateTransitionLarge
  }
}
`

const StateTransitionUpdateMutation = createQueryStrLazy(`
mutation StatetransitionUpdate($lastchange: DateTime!, $id: UUID!, $name: String, $nameEn: String, $sourceId: UUID, $targetId: UUID) {
  result: statetransitionUpdate(lastchange: $lastchange, id: $id, name: $name, nameEn: $nameEn, sourceId: $sourceId, targetId: $targetId) {
    __typename
    ... on StateTransitionGQLModel {
      ...StateTransitionLargeFragment
    }
    ... on StateTransitionGQLModelUpdateError {
      Entity
      msg
      failed
      input
    }
  }
}
`, StateTransitionLargeFragment)
export const StateTransitionUpdateAsyncAction = createAsyncGraphQLAction(StateTransitionUpdateMutation)