import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

export const PaymentInfoLinkFragment = createQueryStrLazy(`
fragment PaymentInfoLinkFragment on PaymentInfoGQLModel {
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
`);

export const PaymentInfoMediumFragment = createQueryStrLazy(`
fragment PaymentInfoMediumFragment on PaymentInfoGQLModel {
  ...PaymentInfoLinkFragment
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
  admission {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    name
    nameEn
    stateId
    programId
    paymentInfoId
    applicationStartDate
    applicationLastDate
    endDate
    conditionDate
    paymentDate
    conditionExtendedDate
    requestConditionExtendDate
    requestExtraConditionsDate
    requestExtraDateDate
    examStartDate
    examLastDate
    studentEntryDate
  }
}
`, PaymentInfoLinkFragment);

export const PaymentInfoLargeFragment = createQueryStrLazy(`
fragment PaymentInfoLargeFragment on PaymentInfoGQLModel {
  ...PaymentInfoMediumFragment
  payments {
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
}
`, PaymentInfoMediumFragment);
