import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

export const ProgramLinkFragment = createQueryStrLazy(`
fragment ProgramLinkFragment on ProgramGQLModel {
  __typename
  id
  name
  lastchange
  created
  createdbyId
  changedbyId
  rbacobjectId
  groupId
  licencedGroupId
  typeId
}
`);

export const ProgramMediumFragment = createQueryStrLazy(`
fragment ProgramMediumFragment on ProgramGQLModel {
  ...ProgramLinkFragment
  createdby {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    startdate
    enddate
    typeId
  }
  changedby {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    startdate
    enddate
    typeId
  }
  rbacobject {
    __typename
    id
  }
  guarantors {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    startdate
    enddate
    grouptypeId
    mastergroupId
  }
  licencedGroup {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    startdate
    enddate
    grouptypeId
    mastergroupId
  }
  type {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    levelId
    titleId
    languageId
    formId
  }
}
`, ProgramLinkFragment);

export const ProgramLargeFragment = createQueryStrLazy(`
fragment ProgramLargeFragment on ProgramGQLModel {
  ...ProgramMediumFragment
  su: subjects {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    programId
    groupId
  }
  students {
    __typename
    id
    myId
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    userId
    programId
    stateId
  }
  admissions {
    __typename
    id
    name
    stateId
    state { id name }
    applicationStartDate
    applicationLastDate
  }    
}
`, ProgramMediumFragment);
