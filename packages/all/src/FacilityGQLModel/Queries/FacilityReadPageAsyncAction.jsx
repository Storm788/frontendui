import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { FacilityLargeFragment } from "./FacilityFragments";

const FacilityReadPageQueryStr = `
query FacilityReadPageQuery($skip: Int, $limit: Int, $where: FacilityWhereInputFilter) {
  result: facilityPage(skip: $skip, limit: $limit, where: $where) {
    ...FacilityLarge
  }
}
`
const FacilityReadPageQuery = createQueryStrLazy(`
query FacilityPage($skip: Int, $limit: Int, $orderby: String, $where: FacilityInputFilter) {
  result: facilityPage(skip: $skip, limit: $limit, orderby: $orderby, where: $where) {
    ...FacilityLargeFragment
  }
}
`, FacilityLargeFragment)
export const FacilityReadPageAsyncAction = createAsyncGraphQLAction(FacilityReadPageQuery)