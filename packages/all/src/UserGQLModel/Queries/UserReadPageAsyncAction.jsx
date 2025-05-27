import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { UserLargeFragment } from "./UserFragments";

const UserReadPageQueryStr = `
query UserReadPageQuery($skip: Int, $limit: Int, $where: UserWhereInputFilter) {
  result: userPage(skip: $skip, limit: $limit, where: $where) {
    ...UserLarge
  }
}
`
const UserReadPageQuery = createQueryStrLazy(`
query UserPage($skip: Int, $limit: Int, $orderby: String, $where: UserInputWhereFilter) {
  result: userPage(skip: $skip, limit: $limit, orderby: $orderby, where: $where) {
    ...UserLargeFragment
  }
}
`, UserLargeFragment)
export const UserReadPageAsyncAction = createAsyncGraphQLAction(UserReadPageQuery)