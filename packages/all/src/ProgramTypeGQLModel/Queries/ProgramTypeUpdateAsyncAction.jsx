import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramTypeLargeFragment } from "./ProgramTypeFragments";

const ProgramTypeUpdateMutationStr = `
mutation ProgramTypeUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: programtypeUpdate(
    programtype: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on ProgramTypeGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...ProgramTypeLarge
      }      
    }
    ...ProgramTypeLarge
  }
}
`

const ProgramTypeUpdateMutation = createQueryStrLazy(`${ProgramTypeUpdateMutationStr}`, ProgramTypeLargeFragment)
export const ProgramTypeUpdateAsyncAction = createAsyncGraphQLAction(ProgramTypeUpdateMutation)