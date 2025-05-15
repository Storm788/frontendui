import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramLargeFragment } from "./ProgramFragments";

const ProgramDeleteMutation = createQueryStrLazy(
`
mutation ProgramDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: programDelete(
    program: {id: $id, lastchange: $lastchange}
  ) {
    ... on ProgramGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...ProgramLarge
      }
    }
  }
}
`,
    ProgramLargeFragment)

export const ProgramDeleteAsyncAction = createAsyncGraphQLAction(ProgramDeleteMutation)