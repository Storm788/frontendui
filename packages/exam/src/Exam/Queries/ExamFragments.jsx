import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const ExamLinkFragment = createQueryStrLazy(
`
fragment ExamLink on ExamGQLModel {
  __typename
  id
}
`)


export const ExamMediumFragment = createQueryStrLazy(
`
fragment ExamMedium on ExamGQLModel {
  ...ExamLink
}
`, ExamLinkFragment)

export const ExamLargeFragment = createQueryStrLazy(
`
fragment ExamLarge on ExamGQLModel {
  ...ExamMedium
  id  
  name
  maxScore
  minScore
}
`, ExamMediumFragment)
  