import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

export const SemesterLinkFragment = createQueryStrLazy(`
fragment SemesterLinkFragment on SemesterGQLModel {
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
`);

export const SemesterMediumFragment = createQueryStrLazy(`
fragment SemesterMediumFragment on SemesterGQLModel {
  ...SemesterLinkFragment
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
  subject {
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
    descriptionEn
    programId
    program {
      __typename
      id
      name
    }
    groupId
    semesters(limit: 100) {
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
    }
  }
}
`, SemesterLinkFragment);

export const SemesterLargeFragment = createQueryStrLazy(`
fragment SemesterLargeFragment on SemesterGQLModel {
  ...SemesterMediumFragment
  prerequisites {
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
    descriptionEn
    programId
    groupId
  }
  topics {
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
  plans {
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
`, SemesterMediumFragment);
