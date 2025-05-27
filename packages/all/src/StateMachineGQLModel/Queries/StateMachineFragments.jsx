import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

export const StateMachineLinkFragment = createQueryStrLazy(`
fragment StateMachineLinkFragment on StateMachineGQLModel {
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
`);

export const StateMachineMediumFragment = createQueryStrLazy(`
fragment StateMachineMediumFragment on StateMachineGQLModel {
  ...StateMachineLinkFragment
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
`, StateMachineLinkFragment);

export const StateMachineLargeFragment = createQueryStrLazy(`
fragment StateMachineLargeFragment on StateMachineGQLModel {
  ...StateMachineMediumFragment
  states {
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
  transitions {
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
}
`, StateMachineMediumFragment);
