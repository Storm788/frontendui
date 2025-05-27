import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramFormTypeLargeFragment } from "./ProgramFormTypeFragments";

const ProgramFormTypeReadPageQueryStr = `
query ProgramFormTypeReadPageQuery($skip: Int, $limit: Int, $where: ProgramFormTypeWhereInputFilter) {
  result: programformtypePage(skip: $skip, limit: $limit, where: $where) {
    ...ProgramFormTypeLarge
  }
}
`
const ProgramFormTypeReadPageQuery = createQueryStrLazy(`${ProgramFormTypeReadPageQueryStr}`, ProgramFormTypeLargeFragment)
export const ProgramFormTypeReadPageAsyncAction = createAsyncGraphQLAction(ProgramFormTypeReadPageQuery)