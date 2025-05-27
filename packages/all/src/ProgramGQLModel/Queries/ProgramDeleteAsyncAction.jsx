import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramLargeFragment } from "./ProgramFragments";

const ProgramDeleteMutationStr = `
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
`
const ProgramDeleteMutation = createQueryStrLazy(`
mutation ProgramDelete($id: UUID!, $lastchange: DateTime!) {
  result: programDelete(program: { id: $id, lastchange: $lastchange }) {
    ...ProgramLargeFragment
  }
}
`, ProgramLargeFragment)
export const ProgramDeleteAsyncAction = createAsyncGraphQLAction(ProgramDeleteMutation)