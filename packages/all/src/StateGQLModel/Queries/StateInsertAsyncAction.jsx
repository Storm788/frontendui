import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StateLargeFragment } from "./StateFragments";


const StateInsertMutationStr = `
mutation StateInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: stateInsert(
    state: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...StateLarge
  }
}
`

const StateInsertMutation = createQueryStrLazy(`
mutation StateInsert($name: String!, $statemachineId: UUID!, $nameEn: String, $order: Int, $id: UUID, $targets: [StatetransitionInsertGQLModel!], $rbacobjectId: UUID) {
  result: stateInsert(state: { name: $name, statemachineId: $statemachineId, nameEn: $nameEn, order: $order, id: $id, targets: $targets, rbacobjectId: $rbacobjectId }) {
    __typename
    ... on StateGQLModel {
      ...StateLargeFragment
    }
    ... on InsertError {
      msg
      failed
      input
    }
  }
}
`, StateLargeFragment)
export const StateInsertAsyncAction = createAsyncGraphQLAction(StateInsertMutation)