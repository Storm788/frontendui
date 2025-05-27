import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

export const StateTransitionLinkFragment = createQueryStrLazy(`
fragment StateTransitionLinkFragment on StateTransitionGQLModel {
  __typename
  id
  lastchange
  created
  createdbyId
  changedbyId
  rbacobjectId
  name
  nameEn
  sourceId
  targetId
  statemachineId
}
`);

export const StateTransitionMediumFragment = createQueryStrLazy(`
fragment StateTransitionMediumFragment on StateTransitionGQLModel {
  ...StateTransitionLinkFragment
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
  source {
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
    userCan
  }
  target {
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
    userCan
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
`, StateTransitionLinkFragment);

export const StateTransitionLargeFragment = createQueryStrLazy(`
fragment StateTransitionLargeFragment on StateTransitionGQLModel {
  ...StateTransitionMediumFragment
}
`, StateTransitionMediumFragment);
