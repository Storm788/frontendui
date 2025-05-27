import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StateTransitionLargeFragment } from "./StateTransitionFragments";

const StateTransitionReadPageQueryStr = `
query StateTransitionReadPageQuery($skip: Int, $limit: Int, $where: StateTransitionWhereInputFilter) {
  result: statetransitionPage(skip: $skip, limit: $limit, where: $where) {
    ...StateTransitionLarge
  }
}
`
const StateTransitionReadPageQuery = createQueryStrLazy(`
query StatetransitionById($id: UUID!) {
  result: statetransitionById(id: $id) {
    ...StateTransitionLargeFragment
  }
}
`, StateTransitionLargeFragment)
export const StateTransitionReadPageAsyncAction = createAsyncGraphQLAction(StateTransitionReadPageQuery)