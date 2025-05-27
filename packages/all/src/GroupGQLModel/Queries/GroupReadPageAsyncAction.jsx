import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { GroupLargeFragment } from "./GroupFragments";

const GroupReadPageQueryStr = `
query GroupReadPageQuery($skip: Int, $limit: Int, $where: GroupWhereInputFilter) {
  result: groupPage(skip: $skip, limit: $limit, where: $where) {
    ...GroupLarge
  }
}
`
const GroupReadPageQuery = createQueryStrLazy(`
query GroupPage($skip: Int, $limit: Int, $orderby: String, $where: GroupInputWhereFilter) {
  result: groupPage(skip: $skip, limit: $limit, orderby: $orderby, where: $where) {
    ...GroupLargeFragment
  }
}
`, GroupLargeFragment)
export const GroupReadPageAsyncAction = createAsyncGraphQLAction(GroupReadPageQuery)