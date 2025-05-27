import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

export const ProgramTitleTypeLinkFragment = createQueryStrLazy(`
fragment ProgramTitleTypeLinkFragment on ProgramTitleTypeGQLModel {
  __typename
  id
  lastchange
  created
  createdbyId
  changedbyId
  rbacobjectId
  name
  nameEn
}
`);

export const ProgramTitleTypeMediumFragment = createQueryStrLazy(`
fragment ProgramTitleTypeMediumFragment on ProgramTitleTypeGQLModel {
  ...ProgramTitleTypeLinkFragment
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
`, ProgramTitleTypeLinkFragment);

export const ProgramTitleTypeLargeFragment = createQueryStrLazy(`
fragment ProgramTitleTypeLargeFragment on ProgramTitleTypeGQLModel {
  ...ProgramTitleTypeMediumFragment
}
`, ProgramTitleTypeMediumFragment);
