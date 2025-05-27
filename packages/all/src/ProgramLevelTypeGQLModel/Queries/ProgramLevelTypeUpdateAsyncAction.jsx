import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramLevelTypeLargeFragment } from "./ProgramLevelTypeFragments";

const ProgramLevelTypeUpdateMutationStr = `
mutation ProgramLevelTypeUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: programleveltypeUpdate(
    programleveltype: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on ProgramLevelTypeGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...ProgramLevelTypeLarge
      }      
    }
    ...ProgramLevelTypeLarge
  }
}
`

const ProgramLevelTypeUpdateMutation = createQueryStrLazy(`${ProgramLevelTypeUpdateMutationStr}`, ProgramLevelTypeLargeFragment)
export const ProgramLevelTypeUpdateAsyncAction = createAsyncGraphQLAction(ProgramLevelTypeUpdateMutation)