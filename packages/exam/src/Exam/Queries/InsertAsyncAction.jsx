import { createAsyncGraphQLAction} from "@hrbolek/uoisfrontend-gql-shared";

export const QueryStudentAsyncAction = createAsyncGraphQLAction(`query QueryInstructor($pattern: String!) {
  userPage(
    where: {
      _or: [
        { name: { _ilike: $pattern } },
        { surname: { _ilike: $pattern } }
      ]
    }
    limit: 100
  ) {
    __typename
    id
    name
    surname
    fullname
    studies {
      id
    }
  }
}`)

export const InsertStudentAsyncAction = createAsyncGraphQLAction(`mutation InsertStudent($userId: UUID!, $programId: UUID!) {
  studentInsert(student: {programId: $programId, userId: $userId, stateId: "51d101a0-81f1-44ca-8366-6cf51432e8d6"}) {
  __typename
    ... on StudentGQLModel {
      id
      student {
        __typename
        id
        name
        surname
        fullname
      }
    }
  }
}`)
