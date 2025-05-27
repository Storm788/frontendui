import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StateMachineLargeFragment } from "./StateMachineFragments";


const StateMachineInsertMutationStr = `
mutation StateMachineInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: statemachineInsert(
    statemachine: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...StateMachineLarge
  }
}
`

const StateMachineInsertMutation = createQueryStrLazy(`
mutation StatemachineInsert($name: String!, $nameEn: String, $id: UUID, $states: [StateInsertGQLModel!], $rbacobjectId: UUID) {
  result: statemachineInsert(name: $name, nameEn: $nameEn, id: $id, states: $states, rbacobjectId: $rbacobjectId) {
    __typename
    ... on StateMachineGQLModel {
      ...StateMachineLargeFragment
    }
    ... on InsertError {
      msg
      failed
      input
    }
  }
}
`, StateMachineLargeFragment)
export const StateMachineInsertAsyncAction = createAsyncGraphQLAction(StateMachineInsertMutation)