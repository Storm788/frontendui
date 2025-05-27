import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

export const ProgramLanguageTypeLinkFragment = createQueryStrLazy(`
fragment ProgramLanguageTypeLinkFragment on ProgramLanguageTypeGQLModel {
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

export const ProgramLanguageTypeMediumFragment = createQueryStrLazy(`
fragment ProgramLanguageTypeMediumFragment on ProgramLanguageTypeGQLModel {
  ...ProgramLanguageTypeLinkFragment
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
`, ProgramLanguageTypeLinkFragment);

export const ProgramLanguageTypeLargeFragment = createQueryStrLazy(`
fragment ProgramLanguageTypeLargeFragment on ProgramLanguageTypeGQLModel {
  ...ProgramLanguageTypeMediumFragment
}
`, ProgramLanguageTypeMediumFragment);
