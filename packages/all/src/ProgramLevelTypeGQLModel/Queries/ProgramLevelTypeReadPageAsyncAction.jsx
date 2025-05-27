import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramLevelTypeLargeFragment } from "./ProgramLevelTypeFragments";

const ProgramLevelTypeReadPageQueryStr = `
query ProgramLevelTypeReadPageQuery($skip: Int, $limit: Int, $where: ProgramLevelTypeWhereInputFilter) {
  result: programleveltypePage(skip: $skip, limit: $limit, where: $where) {
    ...ProgramLevelTypeLarge
  }
}
`
const ProgramLevelTypeReadPageQuery = createQueryStrLazy(`${ProgramLevelTypeReadPageQueryStr}`, ProgramLevelTypeLargeFragment)
export const ProgramLevelTypeReadPageAsyncAction = createAsyncGraphQLAction(ProgramLevelTypeReadPageQuery)