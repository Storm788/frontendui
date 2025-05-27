import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramFormTypeLargeFragment } from "./ProgramFormTypeFragments";

const ProgramFormTypeDeleteMutationStr = `
mutation ProgramFormTypeDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: programformtypeDelete(
    programformtype: {id: $id, lastchange: $lastchange}
  ) {
    ... on ProgramFormTypeGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...ProgramFormTypeLarge
      }
    }
  }
}
`
const ProgramFormTypeDeleteMutation = createQueryStrLazy(`${ProgramFormTypeDeleteMutationStr}`, ProgramFormTypeLargeFragment)
export const ProgramFormTypeDeleteAsyncAction = createAsyncGraphQLAction(ProgramFormTypeDeleteMutation)