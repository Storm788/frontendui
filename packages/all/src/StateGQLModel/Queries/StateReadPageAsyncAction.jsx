import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StateLargeFragment } from "./StateFragments";

const StateReadPageQueryStr = `
query StateReadPageQuery($skip: Int, $limit: Int, $where: StateWhereInputFilter) {
  result: statePage(skip: $skip, limit: $limit, where: $where) {
    ...StateLarge
  }
}
`
const StateReadPageQuery = createQueryStrLazy(`
query StatePage($skip: Int, $limit: Int, $orderby: String, $where: StateWhereFilter) {
  result: statePage(skip: $skip, limit: $limit, orderby: $orderby, where: $where) {
    ...StateLargeFragment
  }
}
`, StateLargeFragment)
export const StateReadPageAsyncAction = createAsyncGraphQLAction(StateReadPageQuery)