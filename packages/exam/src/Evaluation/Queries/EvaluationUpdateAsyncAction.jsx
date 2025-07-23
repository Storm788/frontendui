import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { EvaluationLargeFragment } from "./EvaluationFragments";

const EvaluationUpdateMutation = createQueryStrLazy(
`
mutation evaluationUpdate($id: UUID!, $lastchange: DateTime!, $semesterId: UUID, $userId: UUID, $order: Int, $points: Int, $passed: Boolean, $description: String, $grade: String, $classificationlevelId: UUID, $examId: UUID, $eventId: UUID, $parentId: UUID, $studentId: UUID, $examinerId: UUID) {
  evaluationUpdate(evaluation: {id: $id, lastchange: $lastchange, semesterId: $semesterId, userId: $userId, order: $order, points: $points, passed: $passed, description: $description, grade: $grade, classificationlevelId: $classificationlevelId, examId: $examId, eventId: $eventId, parentId: $parentId, studentId: $studentId, examinerId: $examinerId}) {
    ... on EvaluationGQLModel { 
      ...EvaluationLarge
    }
    ... on EvaluationGQLModelUpdateError { 
    	msg
    }
  }
}
`, EvaluationLargeFragment)

export const EvaluationUpdateAsyncAction = createAsyncGraphQLAction(EvaluationUpdateMutation)