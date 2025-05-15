import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { AdmissionLargeFragment } from "./AdmissionFragments";

const AdmissionReadPageQuery = createQueryStrLazy(`
query AdmissionPage($skip: Int, $limit: Int, $orderby: String, $where: AdmissionInputFilter) {
    result: admissionPage(skip: $skip, limit: $limit, orderby: $orderby, where: $where) {
        ...AdmissionLargeFragment
    }
}
`, AdmissionLargeFragment)

export const AdmissionReadPageAsyncAction = createAsyncGraphQLAction(AdmissionReadPageQuery)