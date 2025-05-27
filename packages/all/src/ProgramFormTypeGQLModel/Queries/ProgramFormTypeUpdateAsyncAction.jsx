import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramFormTypeLargeFragment } from "./ProgramFormTypeFragments";

const ProgramFormTypeUpdateMutationStr = `
mutation ProgramFormTypeUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: programformtypeUpdate(
    programformtype: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on ProgramFormTypeGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...ProgramFormTypeLarge
      }      
    }
    ...ProgramFormTypeLarge
  }
}
`

const ProgramFormTypeUpdateMutation = createQueryStrLazy(`${ProgramFormTypeUpdateMutationStr}`, ProgramFormTypeLargeFragment)
export const ProgramFormTypeUpdateAsyncAction = createAsyncGraphQLAction(ProgramFormTypeUpdateMutation)