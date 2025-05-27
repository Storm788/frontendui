import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramTitleTypeLargeFragment } from "./ProgramTitleTypeFragments";

const ProgramTitleTypeReadPageQueryStr = `
query ProgramTitleTypeReadPageQuery($skip: Int, $limit: Int, $where: ProgramTitleTypeWhereInputFilter) {
  result: programtitletypePage(skip: $skip, limit: $limit, where: $where) {
    ...ProgramTitleTypeLarge
  }
}
`
const ProgramTitleTypeReadPageQuery = createQueryStrLazy(`${ProgramTitleTypeReadPageQueryStr}`, ProgramTitleTypeLargeFragment)
export const ProgramTitleTypeReadPageAsyncAction = createAsyncGraphQLAction(ProgramTitleTypeReadPageQuery)