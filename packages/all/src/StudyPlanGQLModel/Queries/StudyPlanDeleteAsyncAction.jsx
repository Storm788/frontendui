import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudyPlanLargeFragment } from "./StudyPlanFragments";

const StudyPlanDeleteMutationStr = `
mutation StudyPlanDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: studyplanDelete(
    studyplan: {id: $id, lastchange: $lastchange}
  ) {
    ... on StudyPlanGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...StudyPlanLarge
      }
    }
  }
}
`
const StudyPlanDeleteMutation = createQueryStrLazy(`${StudyPlanDeleteMutationStr}`, StudyPlanLargeFragment)
export const StudyPlanDeleteAsyncAction = createAsyncGraphQLAction(StudyPlanDeleteMutation)