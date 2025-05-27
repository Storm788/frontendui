import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramLargeFragment } from "./ProgramFragments";

const ProgramReadPageQueryStr = `
query ProgramReadPageQuery($skip: Int, $limit: Int, $where: ProgramWhereInputFilter) {
  result: programPage(skip: $skip, limit: $limit, where: $where) {
    ...ProgramLarge
  }
}
`
const ProgramReadPageQuery = createQueryStrLazy(`
query ProgramPage($skip: Int, $limit: Int, $orderby: String, $where: ProgramInputFilter) {
  result: programPage(skip: $skip, limit: $limit, orderby: $orderby, where: $where) {
    ...ProgramLargeFragment
  }
}
`, ProgramLargeFragment)
export const ProgramReadPageAsyncAction = createAsyncGraphQLAction(ProgramReadPageQuery)