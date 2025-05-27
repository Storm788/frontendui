import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramLanguageTypeLargeFragment } from "./ProgramLanguageTypeFragments";

const ProgramLanguageTypeReadPageQueryStr = `
query ProgramLanguageTypeReadPageQuery($skip: Int, $limit: Int, $where: ProgramLanguageTypeWhereInputFilter) {
  result: programlanguagetypePage(skip: $skip, limit: $limit, where: $where) {
    ...ProgramLanguageTypeLarge
  }
}
`
const ProgramLanguageTypeReadPageQuery = createQueryStrLazy(`${ProgramLanguageTypeReadPageQueryStr}`, ProgramLanguageTypeLargeFragment)
export const ProgramLanguageTypeReadPageAsyncAction = createAsyncGraphQLAction(ProgramLanguageTypeReadPageQuery)