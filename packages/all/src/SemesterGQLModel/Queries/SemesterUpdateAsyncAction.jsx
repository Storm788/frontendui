import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { SemesterLargeFragment } from "./SemesterFragments";

const SemesterUpdateMutationStr = `
mutation SemesterUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: semesterUpdate(
    semester: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on SemesterGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...SemesterLarge
      }      
    }
    ...SemesterLarge
  }
}
`

const SemesterUpdateMutation = createQueryStrLazy(`
mutation SemesterUpdate($id: UUID!, $lastchange: DateTime!, $order: Int, $mandatory: Boolean, $credits: Int, $classificationtypeId: UUID, $subjectId: UUID) {
  result: semesterUpdate(semester: { id: $id, lastchange: $lastchange, order: $order, mandatory: $mandatory, credits: $credits, classificationtypeId: $classificationtypeId, subjectId: $subjectId }) {
    __typename
    ... on SemesterGQLModel {
      ...SemesterLargeFragment
    }
    ... on SemesterGQLModelUpdateError {
      Entity {
        ...SemesterLargeFragment
      }
      msg
      failed
      input
    }
  }
}
`, SemesterLargeFragment)
export const SemesterUpdateAsyncAction = createAsyncGraphQLAction(SemesterUpdateMutation)