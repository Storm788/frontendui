import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

export const LessonLinkFragment = createQueryStrLazy(`
fragment LessonLinkFragment on LessonGQLModel {
  __typename
  id
  lastchange
  created
  createdbyId
  changedbyId
  rbacobjectId
  count
  topicId
  typeId
}
`);

export const LessonMediumFragment = createQueryStrLazy(`
fragment LessonMediumFragment on LessonGQLModel {
  ...LessonLinkFragment
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
  topic {
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
    abbr
  }
}
`, LessonLinkFragment);

export const LessonLargeFragment = createQueryStrLazy(`
fragment LessonLargeFragment on LessonGQLModel {
  ...LessonMediumFragment
}
`, LessonMediumFragment);
