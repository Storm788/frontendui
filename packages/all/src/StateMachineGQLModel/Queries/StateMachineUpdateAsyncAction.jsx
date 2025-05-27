import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StateMachineLargeFragment } from "./StateMachineFragments";

const StateMachineUpdateMutationStr = `
mutation StateMachineUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: statemachineUpdate(
    statemachine: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on StateMachineGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...StateMachineLarge
      }      
    }
    ...StateMachineLarge
  }
}
`

const StateMachineUpdateMutation = createQueryStrLazy(`
mutation StatemachineUpdate($lastchange: DateTime!, $id: UUID!, $name: String, $nameEn: String) {
  result: statemachineUpdate(lastchange: $lastchange, id: $id, name: $name, nameEn: $nameEn) {
    __typename
    ... on StateMachineGQLModel {
      ...StateMachineLargeFragment
    }
    ... on StateMachineGQLModelUpdateError {
      Entity
      msg
      failed
      input
    }
  }
}
`, StateMachineLargeFragment)
export const StateMachineUpdateAsyncAction = createAsyncGraphQLAction(StateMachineUpdateMutation)