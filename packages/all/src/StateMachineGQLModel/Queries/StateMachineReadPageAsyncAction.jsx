import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StateMachineLargeFragment } from "./StateMachineFragments";

const StateMachineReadPageQueryStr = `
query StateMachineReadPageQuery($skip: Int, $limit: Int, $where: StateMachineWhereInputFilter) {
  result: statemachinePage(skip: $skip, limit: $limit, where: $where) {
    ...StateMachineLarge
  }
}
`
const StateMachineReadPageQuery = createQueryStrLazy(`
query StatemachineById($id: UUID!) {
  result: statemachineById(id: $id) {
    ...StateMachineLargeFragment
  }
}
`, StateMachineLargeFragment)
export const StateMachineReadPageAsyncAction = createAsyncGraphQLAction(StateMachineReadPageQuery)