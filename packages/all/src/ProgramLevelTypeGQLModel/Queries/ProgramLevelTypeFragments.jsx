import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

export const ProgramLevelTypeLinkFragment = createQueryStrLazy(`
fragment ProgramLevelTypeLinkFragment on ProgramLevelTypeGQLModel {
  __typename
  id
  lastchange
  created
  createdbyId
  changedbyId
  rbacobjectId
  name
  nameEn
  length
  priority
}
`);

export const ProgramLevelTypeMediumFragment = createQueryStrLazy(`
fragment ProgramLevelTypeMediumFragment on ProgramLevelTypeGQLModel {
  ...ProgramLevelTypeLinkFragment
  createdby {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    name
    givenname
    middlename
    email
    firstname
    surname
    valid
    startdate
    enddate
    typeId
    isThisMe
    gdpr
    fullname
  }
  changedby {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    name
    givenname
    middlename
    email
    firstname
    surname
    valid
    startdate
    enddate
    typeId
    isThisMe
    gdpr
    fullname
  }
  rbacobject {
    __typename
    id
    userCanWithState
    userCanWithoutState
  }
}
`, ProgramLevelTypeLinkFragment);

export const ProgramLevelTypeLargeFragment = createQueryStrLazy(`
fragment ProgramLevelTypeLargeFragment on ProgramLevelTypeGQLModel {
  ...ProgramLevelTypeMediumFragment
}
`, ProgramLevelTypeMediumFragment);
