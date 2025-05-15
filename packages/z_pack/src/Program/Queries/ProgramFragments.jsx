import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const ProgramLinkFragment = createQueryStrLazy(
`
fragment ProgramLink on ProgramGQLModel {
  __typename
  id
  lastchange
  name
  nameEn
}
`)


export const ProgramMediumFragment = createQueryStrLazy(
`
fragment ProgramMedium on ProgramGQLModel {
  ...ProgramLink
}
`, ProgramLinkFragment)

export const ProgramLargeFragment = createQueryStrLazy(
`
fragment ProgramLarge on ProgramGQLModel {
  ...ProgramMedium
  subjects {
    __typename
    id
    name
  }

}
`, ProgramMediumFragment)
  