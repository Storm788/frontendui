import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramLargeFragment } from "./ProgramFragments";

const ProgramReadPageQuery = createQueryStrLazy(
`
query ProgramReadPageQuery($skip: Int, $limit: Int, $where: ProgramInputFilter) {
  result: programPage(skip: $skip, limit: $limit, where: $where) {
    ...ProgramLarge
  }
}
`, 
    ProgramLargeFragment)

export const ProgramReadPageAsyncAction = createAsyncGraphQLAction(ProgramReadPageQuery)