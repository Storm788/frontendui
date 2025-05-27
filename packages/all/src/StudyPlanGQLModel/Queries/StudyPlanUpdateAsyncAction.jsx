import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudyPlanLargeFragment } from "./StudyPlanFragments";

const StudyPlanUpdateMutationStr = `
mutation StudyPlanUpdateMutation($id: UUID!, $lastchange: DateTime!, $semesterId: UUID, $eventId: UUID, $examId: UUID) {
  result: studyPlanUpdate(
    studyPlan: {id: $id, lastchange: $lastchange, semesterId: $semesterId, eventId: $eventId, examId: $examId}
  ) {
    ... on StudyPlanGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...StudyPlanLargeFragment
      }      
    }
    ...StudyPlanLargeFragment
  }
}
`

const StudyPlanUpdateMutation = createQueryStrLazy(`${StudyPlanUpdateMutationStr}`, StudyPlanLargeFragment)
export const StudyPlanUpdateAsyncAction = createAsyncGraphQLAction(StudyPlanUpdateMutation)