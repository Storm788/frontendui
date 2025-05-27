import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramFormTypeLargeFragment } from "./ProgramFormTypeFragments";


const ProgramFormTypeInsertMutationStr = `
mutation ProgramFormTypeInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: programformtypeInsert(
    programformtype: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...ProgramFormTypeLarge
  }
}
`

const ProgramFormTypeInsertMutation = createQueryStrLazy(`${ProgramFormTypeInsertMutationStr}`, ProgramFormTypeLargeFragment)
export const ProgramFormTypeInsertAsyncAction = createAsyncGraphQLAction(ProgramFormTypeInsertMutation)