import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramLanguageTypeLargeFragment } from "./ProgramLanguageTypeFragments";

const ProgramLanguageTypeUpdateMutationStr = `
mutation ProgramLanguageTypeUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: programlanguagetypeUpdate(
    programlanguagetype: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on ProgramLanguageTypeGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...ProgramLanguageTypeLarge
      }      
    }
    ...ProgramLanguageTypeLarge
  }
}
`

const ProgramLanguageTypeUpdateMutation = createQueryStrLazy(`${ProgramLanguageTypeUpdateMutationStr}`, ProgramLanguageTypeLargeFragment)
export const ProgramLanguageTypeUpdateAsyncAction = createAsyncGraphQLAction(ProgramLanguageTypeUpdateMutation)