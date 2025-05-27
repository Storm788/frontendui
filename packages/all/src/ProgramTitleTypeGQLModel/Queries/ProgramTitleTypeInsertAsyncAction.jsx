import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramTitleTypeLargeFragment } from "./ProgramTitleTypeFragments";


const ProgramTitleTypeInsertMutationStr = `
mutation ProgramTitleTypeInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: programtitletypeInsert(
    programtitletype: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...ProgramTitleTypeLarge
  }
}
`

const ProgramTitleTypeInsertMutation = createQueryStrLazy(`${ProgramTitleTypeInsertMutationStr}`, ProgramTitleTypeLargeFragment)
export const ProgramTitleTypeInsertAsyncAction = createAsyncGraphQLAction(ProgramTitleTypeInsertMutation)