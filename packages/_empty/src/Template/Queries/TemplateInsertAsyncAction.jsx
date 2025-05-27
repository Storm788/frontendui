import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { TemplateLargeFragment } from "./TemplateFragments";


const TemplateInsertMutationStr = `
mutation TemplateInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: templateInsert(
    template: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...TemplateLarge
  }
}
`

const TemplateInsertMutation = createQueryStrLazy(`${TemplateInsertMutationStr}`, TemplateLargeFragment)
export const TemplateInsertAsyncAction = createAsyncGraphQLAction(TemplateInsertMutation)