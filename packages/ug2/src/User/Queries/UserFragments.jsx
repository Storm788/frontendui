import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const UserLinkFragment = createQueryStrLazy(
`
fragment UserLink on UserGQLModel {
  __typename
  id
  lastchange
  name
  surname
  email
}
`)


export const UserMediumFragment = createQueryStrLazy(
`
fragment UserMedium on UserGQLModel {
  ...UserLink
}
`, UserLinkFragment)

export const UserLargeFragment = createQueryStrLazy(
`
fragment UserLarge on UserGQLModel {
  ...UserMedium  
  memberships(where: {valid: {_eq: true}}) {
    __typename
    id
    valid
    startdate
    enddate
    group {
      id
      name
      grouptype {
        id
        name
      }
    }
  }
}
`, UserMediumFragment)
  