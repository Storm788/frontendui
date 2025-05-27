import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

export const FacilityLinkFragment = createQueryStrLazy(`
fragment FacilityLinkFragment on FacilityGQLModel {
  __typename
  id
  lastchange
  created
  createdbyId
  changedbyId
  rbacobjectId
  name
  nameEn
  label
  startdate
  enddate
  address
  valid
  capacity
  geometry
  geolocation
  groupId
  facilitytypeId
  masterFacilityId
}
`);

export const FacilityMediumFragment = createQueryStrLazy(`
fragment FacilityMediumFragment on FacilityGQLModel {
  ...FacilityLinkFragment
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
  type {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    name
    nameEn
    parentId
  }
  masterFacility {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    name
    nameEn
    label
    startdate
    enddate
    address
    valid
    capacity
    geometry
    geolocation
    groupId
    facilitytypeId
    masterFacilityId
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
`, FacilityLinkFragment);

export const FacilityLargeFragment = createQueryStrLazy(`
fragment FacilityLargeFragment on FacilityGQLModel {
  ...FacilityMediumFragment
  masterFacilities {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    name
    nameEn
    label
    startdate
    enddate
    address
    valid
    capacity
    geometry
    geolocation
    groupId
    facilitytypeId
    masterFacilityId
  }
}
`, FacilityMediumFragment);
