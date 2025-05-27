import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramTitleTypeLargeFragment } from "./ProgramTitleTypeFragments";

const ProgramTitleTypeUpdateMutationStr = `
mutation ProgramTitleTypeUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: programtitletypeUpdate(
    programtitletype: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on ProgramTitleTypeGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...ProgramTitleTypeLarge
      }      
    }
    ...ProgramTitleTypeLarge
  }
}
`

const ProgramTitleTypeUpdateMutation = createQueryStrLazy(`${ProgramTitleTypeUpdateMutationStr}`, ProgramTitleTypeLargeFragment)
export const ProgramTitleTypeUpdateAsyncAction = createAsyncGraphQLAction(ProgramTitleTypeUpdateMutation)