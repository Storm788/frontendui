import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const SubjectLinkFragment = createQueryStrLazy(
`
fragment SubjectLink on SubjectGQLModel {
  __typename
  id
  lastchange
  name
  nameEn
}
`)


export const SubjectMediumFragment = createQueryStrLazy(
`
fragment SubjectMedium on SubjectGQLModel {
  ...SubjectLink
}
`, SubjectLinkFragment)

export const SubjectLargeFragment = createQueryStrLazy(
`
fragment SubjectLarge on SubjectGQLModel {
  ...SubjectMedium
  program {
    __typename
    id
    name
    nameEn
  }
}
`, SubjectMediumFragment)
  