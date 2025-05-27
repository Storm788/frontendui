import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

export const RoleLinkFragment = createQueryStrLazy(`
fragment RoleLinkFragment on RoleGQLModel {
  __typename
  id
  lastchange
  created
  createdbyId
  changedbyId
  rbacobjectId
  valid
  deputy
  startdate
  enddate
  roletypeId
  userId
  groupId
}
`);

export const RoleMediumFragment = createQueryStrLazy(`
fragment RoleMediumFragment on RoleGQLModel {
  ...RoleLinkFragment
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
  roletype {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    name
    nameEn
    categoryId
  }
  user {
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
  group {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    name
    nameEn
    email
    abbreviation
    startdate
    enddate
    grouptypeId
    mastergroupId
    path
    valid
  }
}
`, RoleLinkFragment);

export const RoleLargeFragment = createQueryStrLazy(`
fragment RoleLargeFragment on RoleGQLModel {
  ...RoleMediumFragment
}
`, RoleMediumFragment);
