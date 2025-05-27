import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

export const StudentLinkFragment = createQueryStrLazy(`
fragment StudentLinkFragment on StudentGQLModel {
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
  semesterNumber
}
`);

export const StudentMediumFragment = createQueryStrLazy(`
fragment StudentMediumFragment on StudentGQLModel {
  ...StudentLinkFragment
  payment {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    bankUniqueData
    variableSymbol
    amount
    paymentInfoId
    studentId
  }
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
  student {
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
  program {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    name
    nameEn
    groupId
    licencedGroupId
    typeId
  }
  state {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    name
    nameEn
    statemachineId
    writerslistId
    readerslistId
    order

  }
}
`, StudentLinkFragment);

export const StudentLargeFragment = createQueryStrLazy(`
fragment StudentLargeFragment on StudentGQLModel {
  ...StudentMediumFragment
  evaluations {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    order
    points
    passed
    description
    grade
    studentId
    examinerId
    semesterId
    examId
    eventId
    parentId
    classificationlevelId
    classificationplanId
  }
}
`, StudentMediumFragment);
