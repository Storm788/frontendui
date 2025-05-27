import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

export const TopicLinkFragment = createQueryStrLazy(`
fragment TopicLinkFragment on TopicGQLModel {
  __typename
  id
  lastchange
  created
  createdbyId
  changedbyId
  rbacobjectId
  name
  nameEn
  order
  description
  semesterId
}
`);

export const TopicMediumFragment = createQueryStrLazy(`
fragment TopicMediumFragment on TopicGQLModel {
  ...TopicLinkFragment
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
  semester {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    order
    mandatory
    credits
    classificationtypeId
    subjectId
  }
}
`, TopicLinkFragment);

export const TopicLargeFragment = createQueryStrLazy(`
fragment TopicLargeFragment on TopicGQLModel {
  ...TopicMediumFragment
}
`, TopicMediumFragment);
