import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { EventLargeFragment } from "./EventFragments";

const EventReadPageQueryStr = `
query EventReadPageQuery($skip: Int, $limit: Int, $where: EventWhereInputFilter) {
  result: eventPage(skip: $skip, limit: $limit, where: $where) {
    ...EventLarge
  }
}
`
const EventReadPageQuery = createQueryStrLazy(`
query EventPage($skip: Int, $limit: Int, $orderby: String, $where: EventInputFilter) {
  result: eventPage(skip: $skip, limit: $limit, orderby: $orderby, where: $where) {
    ...EventLargeFragment
  }
}
`, EventLargeFragment)
export const EventReadPageAsyncAction = createAsyncGraphQLAction(EventReadPageQuery)