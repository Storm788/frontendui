import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { SubjectLargeFragment } from "./SubjectFragments";

const SubjectUpdateMutation = createQueryStrLazy(
`
mutation SubjectUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: subjectUpdate(
    subject: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on SubjectGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...SubjectLarge
      }      
    }
    ...SubjectLarge
  }
}
`, SubjectLargeFragment)

export const SubjectUpdateAsyncAction = createAsyncGraphQLAction(SubjectUpdateMutation)