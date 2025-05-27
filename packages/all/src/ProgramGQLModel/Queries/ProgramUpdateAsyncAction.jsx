import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramLargeFragment } from "./ProgramFragments";

const ProgramUpdateMutationStr = `
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
`

const ProgramUpdateMutation = createQueryStrLazy(`
mutation ProgramUpdate($id: UUID!, $lastchange: DateTime!, $name: String, $nameEn: String, $groupId: UUID, $licencedGroupId: UUID, $typeId: UUID) {
  result: programUpdate(program: { id: $id, lastchange: $lastchange, name: $name, nameEn: $nameEn, groupId: $groupId, licencedGroupId: $licencedGroupId, typeId: $typeId }) {
    __typename
    ... on ProgramGQLModel {
      ...ProgramLargeFragment
    }
    ... on ProgramGQLModelUpdateError {
      Entity {
        ...ProgramLargeFragment
      }
      msg
      failed
      input
    }
  }
}
`, ProgramLargeFragment)
export const ProgramUpdateAsyncAction = createAsyncGraphQLAction(ProgramUpdateMutation)