import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

export const EventLinkFragment = createQueryStrLazy(`
fragment EventLinkFragment on EventGQLModel {
  __typename
  id
  lastchange
  created
  createdbyId
  changedbyId
  rbacobjectId
  name
  nameEn
  description
  startdate
  enddate
  duration_raw
  place
  facilityId
  mastereventId
  typeId
}
`);

export const EventMediumFragment = createQueryStrLazy(`
fragment EventMediumFragment on EventGQLModel {
  ...EventLinkFragment
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
  facility {
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
    description
    parentId
  }
}
`, EventLinkFragment);

export const EventLargeFragment = createQueryStrLazy(`
fragment EventLargeFragment on EventGQLModel {
  ...EventMediumFragment
}
`, EventMediumFragment);
