import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramLargeFragment } from "./ProgramFragments";

const ProgramInsertMutation = createQueryStrLazy(
`
mutation ProgramInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: programInsert(
    program: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...ProgramLarge
  }
}
`,
    ProgramLargeFragment)


export const ProgramInsertAsyncAction = createAsyncGraphQLAction(ProgramInsertMutation)