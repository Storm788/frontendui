import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramLevelTypeLargeFragment } from "./ProgramLevelTypeFragments";

const ProgramLevelTypeDeleteMutationStr = `
mutation ProgramLevelTypeDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: programleveltypeDelete(
    programleveltype: {id: $id, lastchange: $lastchange}
  ) {
    ... on ProgramLevelTypeGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...ProgramLevelTypeLarge
      }
    }
  }
}
`
const ProgramLevelTypeDeleteMutation = createQueryStrLazy(`${ProgramLevelTypeDeleteMutationStr}`, ProgramLevelTypeLargeFragment)
export const ProgramLevelTypeDeleteAsyncAction = createAsyncGraphQLAction(ProgramLevelTypeDeleteMutation)