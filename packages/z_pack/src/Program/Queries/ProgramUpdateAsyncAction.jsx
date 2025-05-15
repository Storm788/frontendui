import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramLargeFragment } from "./ProgramFragments";

const ProgramUpdateMutation = createQueryStrLazy(
`
mutation ProgramUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: programUpdate(
    program: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on ProgramGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...ProgramLarge
      }      
    }
    ...ProgramLarge
  }
}
`, ProgramLargeFragment)

export const ProgramUpdateAsyncAction = createAsyncGraphQLAction(ProgramUpdateMutation)