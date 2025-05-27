import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

export const PaymentLinkFragment = createQueryStrLazy(`
fragment PaymentLinkFragment on PaymentGQLModel {
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
`);

export const PaymentMediumFragment = createQueryStrLazy(`
fragment PaymentMediumFragment on PaymentGQLModel {
  ...PaymentLinkFragment
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
  paymentInfo {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    accountNumber
    specificSymbol
    constantSymbol
    IBAN
    SWIFT
    amount
  }
  student {
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
}
`, PaymentLinkFragment);

export const PaymentLargeFragment = createQueryStrLazy(`
fragment PaymentLargeFragment on PaymentGQLModel {
  ...PaymentMediumFragment
}
`, PaymentMediumFragment);
