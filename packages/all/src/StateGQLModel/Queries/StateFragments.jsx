import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

export const StateLinkFragment = createQueryStrLazy(`
fragment StateLinkFragment on StateGQLModel {
  __typename
  id
  lastchange
  created
  createdbyId
  changedbyId
  rbacobjectId
  name
  nameEn
  statemachineId
  writerslistId
  readerslistId
  order
}
`);

export const StateMediumFragment = createQueryStrLazy(`
fragment StateMediumFragment on StateGQLModel {
  ...StateLinkFragment
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
  }
  statemachine {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    name
    nameEn
    typeId
  }
}
`, StateLinkFragment);

export const StateLargeFragment = createQueryStrLazy(`
fragment StateLargeFragment on StateGQLModel {
  ...StateMediumFragment
}
`, StateMediumFragment);
