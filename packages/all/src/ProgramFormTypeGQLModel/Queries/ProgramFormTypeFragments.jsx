import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

export const ProgramFormTypeLinkFragment = createQueryStrLazy(`
fragment ProgramFormTypeLinkFragment on ProgramFormTypeGQLModel {
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

export const ProgramFormTypeMediumFragment = createQueryStrLazy(`
fragment ProgramFormTypeMediumFragment on ProgramFormTypeGQLModel {
  ...ProgramFormTypeLinkFragment
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
`, ProgramFormTypeLinkFragment);

export const ProgramFormTypeLargeFragment = createQueryStrLazy(`
fragment ProgramFormTypeLargeFragment on ProgramFormTypeGQLModel {
  ...ProgramFormTypeMediumFragment
}
`, ProgramFormTypeMediumFragment);
