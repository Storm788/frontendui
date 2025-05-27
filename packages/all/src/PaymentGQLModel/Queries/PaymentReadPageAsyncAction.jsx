import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { PaymentLargeFragment } from "./PaymentFragments";

const PaymentReadPageQueryStr = `
query PaymentReadPageQuery($skip: Int, $limit: Int, $where: PaymentWhereInputFilter) {
  result: paymentPage(skip: $skip, limit: $limit, where: $where) {
    ...PaymentLarge
  }
}
`
const PaymentReadPageQuery = createQueryStrLazy(`
query PaymentById($id: UUID!) {
  result: paymentById(id: $id) {
    ...PaymentLargeFragment
  }
}
`, PaymentLargeFragment)
export const PaymentReadPageAsyncAction = createAsyncGraphQLAction(PaymentReadPageQuery)