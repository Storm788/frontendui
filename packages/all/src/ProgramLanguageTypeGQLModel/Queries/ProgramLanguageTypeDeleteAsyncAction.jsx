import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramLanguageTypeLargeFragment } from "./ProgramLanguageTypeFragments";

const ProgramLanguageTypeDeleteMutationStr = `
mutation ProgramLanguageTypeDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: programlanguagetypeDelete(
    programlanguagetype: {id: $id, lastchange: $lastchange}
  ) {
    ... on ProgramLanguageTypeGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...ProgramLanguageTypeLarge
      }
    }
  }
}
`
const ProgramLanguageTypeDeleteMutation = createQueryStrLazy(`${ProgramLanguageTypeDeleteMutationStr}`, ProgramLanguageTypeLargeFragment)
export const ProgramLanguageTypeDeleteAsyncAction = createAsyncGraphQLAction(ProgramLanguageTypeDeleteMutation)