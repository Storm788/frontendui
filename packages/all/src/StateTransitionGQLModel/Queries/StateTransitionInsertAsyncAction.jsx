import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StateTransitionLargeFragment } from "./StateTransitionFragments";


const StateTransitionInsertMutationStr = `
mutation StateTransitionInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: statetransitionInsert(
    statetransition: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...StateTransitionLarge
  }
}
`

const StateTransitionInsertMutation = createQueryStrLazy(`
mutation StatetransitionInsert($name: String!, $statemachineId: UUID!, $sourceId: UUID!, $targetId: UUID!, $id: UUID, $nameEn: String) {
  result: statetransitionInsert(name: $name, statemachineId: $statemachineId, sourceId: $sourceId, targetId: $targetId, id: $id, nameEn: $nameEn) {
    __typename
    ... on StateTransitionGQLModel {
      ...StateTransitionLargeFragment
    }
    ... on InsertError {
      msg
      failed
      input
    }
  }
}
`, StateTransitionLargeFragment)
export const StateTransitionInsertAsyncAction = createAsyncGraphQLAction(StateTransitionInsertMutation)