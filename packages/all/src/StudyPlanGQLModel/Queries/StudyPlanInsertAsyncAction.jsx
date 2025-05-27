import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudyPlanLargeFragment } from "./StudyPlanFragments";


const StudyPlanInsertMutationStr = `
mutation StudyPlanInsertMutation($id: UUID, $semesterId: UUID, $eventId: UUID, $examId: UUID) {
  result: studyPlanInsert(
    studyPlan: {id: $id, semesterId: $semesterId, eventId: $eventId, examId: $examId}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...StudyPlanLargeFragment
  }
}
`

const StudyPlanInsertMutation = createQueryStrLazy(`${StudyPlanInsertMutationStr}`, StudyPlanLargeFragment)
export const StudyPlanInsertAsyncAction = createAsyncGraphQLAction(StudyPlanInsertMutation)