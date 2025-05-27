import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { RoleLargeFragment } from "./RoleFragments";

const RoleReadPageQueryStr = `
query RoleReadPageQuery($skip: Int, $limit: Int, $where: RoleWhereInputFilter) {
  result: rolePage(skip: $skip, limit: $limit, where: $where) {
    ...RoleLarge
  }
}
`
const RoleReadPageQuery = createQueryStrLazy(`
query RoleById($id: UUID!) {
  result: roleById(id: $id) {
    ...RoleLargeFragment
  }
}
`, RoleLargeFragment)
export const RoleReadPageAsyncAction = createAsyncGraphQLAction(RoleReadPageQuery)