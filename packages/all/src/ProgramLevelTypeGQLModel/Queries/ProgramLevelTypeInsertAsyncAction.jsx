import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramLevelTypeLargeFragment } from "./ProgramLevelTypeFragments";


const ProgramLevelTypeInsertMutationStr = `
mutation ProgramLevelTypeInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: programleveltypeInsert(
    programleveltype: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...ProgramLevelTypeLarge
  }
}
`

const ProgramLevelTypeInsertMutation = createQueryStrLazy(`${ProgramLevelTypeInsertMutationStr}`, ProgramLevelTypeLargeFragment)
export const ProgramLevelTypeInsertAsyncAction = createAsyncGraphQLAction(ProgramLevelTypeInsertMutation)