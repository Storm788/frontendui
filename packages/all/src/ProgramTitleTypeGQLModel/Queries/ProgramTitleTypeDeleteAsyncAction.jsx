import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramTitleTypeLargeFragment } from "./ProgramTitleTypeFragments";

const ProgramTitleTypeDeleteMutationStr = `
mutation ProgramTitleTypeDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: programtitletypeDelete(
    programtitletype: {id: $id, lastchange: $lastchange}
  ) {
    ... on ProgramTitleTypeGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...ProgramTitleTypeLarge
      }
    }
  }
}
`
const ProgramTitleTypeDeleteMutation = createQueryStrLazy(`${ProgramTitleTypeDeleteMutationStr}`, ProgramTitleTypeLargeFragment)
export const ProgramTitleTypeDeleteAsyncAction = createAsyncGraphQLAction(ProgramTitleTypeDeleteMutation)