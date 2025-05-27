import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramLanguageTypeLargeFragment } from "./ProgramLanguageTypeFragments";


const ProgramLanguageTypeInsertMutationStr = `
mutation ProgramLanguageTypeInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: programlanguagetypeInsert(
    programlanguagetype: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...ProgramLanguageTypeLarge
  }
}
`

const ProgramLanguageTypeInsertMutation = createQueryStrLazy(`${ProgramLanguageTypeInsertMutationStr}`, ProgramLanguageTypeLargeFragment)
export const ProgramLanguageTypeInsertAsyncAction = createAsyncGraphQLAction(ProgramLanguageTypeInsertMutation)