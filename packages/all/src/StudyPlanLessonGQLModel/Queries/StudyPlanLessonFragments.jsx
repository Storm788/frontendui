import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

export const StudyPlanLessonLinkFragment = createQueryStrLazy(`
fragment StudyPlanLessonLinkFragment on StudyPlanLessonGQLModel {
  __typename
  id
  lastchange
  created
  createdbyId
  changedbyId
  rbacobjectId
  order
  name
  nameEn
  length
  eventId
  topicId
  lessontypeId
  linkedWithId
  planId
}
`);

export const StudyPlanLessonMediumFragment = createQueryStrLazy(`
fragment StudyPlanLessonMediumFragment on StudyPlanLessonGQLModel {
  ...StudyPlanLessonLinkFragment
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
  event {
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
    duration
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
  plan {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    semesterId
    classificationplanId
    examId
    eventId
  }
}
`, StudyPlanLessonLinkFragment);

export const StudyPlanLessonLargeFragment = createQueryStrLazy(`
fragment StudyPlanLessonLargeFragment on StudyPlanLessonGQLModel {
  ...StudyPlanLessonMediumFragment
  linkedWith {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    order
    name
    nameEn
    length
    eventId
    topicId
    lessontypeId
    linkedWithId
    planId
  }
  instructors {
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
  studyGroups {
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
  facilities {
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
`, StudyPlanLessonMediumFragment);
