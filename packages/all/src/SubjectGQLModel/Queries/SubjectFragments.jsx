import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

export const SubjectLinkFragment = createQueryStrLazy(`
fragment SubjectLinkFragment on SubjectGQLModel {
  __typename
  id
  name
  lastchange
  created
  createdbyId
  changedbyId
  rbacobjectId
  programId
  groupId
}
`);

export const SubjectMediumFragment = createQueryStrLazy(`
fragment SubjectMediumFragment on SubjectGQLModel {
  ...SubjectLinkFragment
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
  program {
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
}
`, SubjectLinkFragment);

export const SubjectLargeFragment = createQueryStrLazy(`
fragment SubjectLargeFragment on SubjectGQLModel {
  ...SubjectMediumFragment
  semesters {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    classificationtypeId
    subjectId
  }
}
`, SubjectMediumFragment);
