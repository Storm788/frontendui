import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

export const LessonTypeLinkFragment = createQueryStrLazy(`
fragment LessonTypeLinkFragment on LessonTypeGQLModel {
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
`);

export const LessonTypeMediumFragment = createQueryStrLazy(`
fragment LessonTypeMediumFragment on LessonTypeGQLModel {
  ...LessonTypeLinkFragment
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
}
`, LessonTypeLinkFragment);

export const LessonTypeLargeFragment = createQueryStrLazy(`
fragment LessonTypeLargeFragment on LessonTypeGQLModel {
  ...LessonTypeMediumFragment
}
`, LessonTypeMediumFragment);
