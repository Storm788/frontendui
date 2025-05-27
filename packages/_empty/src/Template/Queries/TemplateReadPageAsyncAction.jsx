import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { TemplateLargeFragment } from "./TemplateFragments";

const TemplateReadPageQueryStr = `
query TemplateReadPageQuery($skip: Int, $limit: Int, $where: TemplateWhereInputFilter) {
  result: templatePage(skip: $skip, limit: $limit, where: $where) {
    ...TemplateLarge
  }
}
`
const TemplateReadPageQuery = createQueryStrLazy(`${TemplateReadPageQueryStr}`, TemplateLargeFragment)
export const TemplateReadPageAsyncAction = createAsyncGraphQLAction(TemplateReadPageQuery)