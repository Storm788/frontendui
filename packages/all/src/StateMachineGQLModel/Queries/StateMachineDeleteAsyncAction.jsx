import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StateMachineLargeFragment } from "./StateMachineFragments";

const StateMachineDeleteMutationStr = `
mutation StateMachineDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: statemachineDelete(
    statemachine: {id: $id, lastchange: $lastchange}
  ) {
    ... on StateMachineGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...StateMachineLarge
      }
    }
  }
}
`
const StateMachineDeleteMutation = createQueryStrLazy(`
mutation StatemachineDelete($lastchange: DateTime!, $id: UUID!) {
  result: statemachineDelete(lastchange: $lastchange, id: $id) {
    ...StateMachineLargeFragment
  }
}
`, StateMachineLargeFragment)
export const StateMachineDeleteAsyncAction = createAsyncGraphQLAction(StateMachineDeleteMutation)