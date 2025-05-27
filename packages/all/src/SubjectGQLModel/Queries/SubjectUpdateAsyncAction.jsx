import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { SubjectLargeFragment } from "./SubjectFragments";

const SubjectUpdateMutationStr = `
mutation SubjectUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: subjectUpdate(
    subject: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on SubjectGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...SubjectLarge
      }      
    }
    ...SubjectLarge
  }
}
`

const SubjectUpdateMutation = createQueryStrLazy(`
mutation SubjectUpdate($id: UUID!, $lastchange: DateTime!, $name: String, $nameEn: String, $description: String, $descriptionEn: String, $programId: UUID, $groupId: UUID) {
  result: subjectUpdate(subject: { id: $id, lastchange: $lastchange, name: $name, nameEn: $nameEn, description: $description, descriptionEn: $descriptionEn, programId: $programId, groupId: $groupId }) {
    __typename
    ... on SubjectGQLModel {
      ...SubjectLargeFragment
    }
    ... on SubjectGQLModelUpdateError {
      Entity {
        ...SubjectLargeFragment
      }
      msg
      failed
      input
    }
  }
}
`, SubjectLargeFragment)
export const SubjectUpdateAsyncAction = createAsyncGraphQLAction(SubjectUpdateMutation)