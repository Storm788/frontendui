import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramTypeLargeFragment } from "./ProgramTypeFragments";

const ProgramTypeReadPageQueryStr = `
query ProgramTypeReadPageQuery($skip: Int, $limit: Int, $where: ProgramTypeWhereInputFilter) {
  result: programtypePage(skip: $skip, limit: $limit, where: $where) {
    ...ProgramTypeLarge
  }
}
`
const ProgramTypeReadPageQuery = createQueryStrLazy(`${ProgramTypeReadPageQueryStr}`, ProgramTypeLargeFragment)
export const ProgramTypeReadPageAsyncAction = createAsyncGraphQLAction(ProgramTypeReadPageQuery)