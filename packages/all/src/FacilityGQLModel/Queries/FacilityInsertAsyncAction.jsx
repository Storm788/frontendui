import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { FacilityLargeFragment } from "./FacilityFragments";


const FacilityInsertMutationStr = `
mutation FacilityInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: facilityInsert(
    facility: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...FacilityLarge
  }
}
`

const FacilityInsertMutation = createQueryStrLazy(`
mutation FacilityInsert($name: String!, $facilitytypeId: UUID, $id: UUID, $nameEn: String, $label: String, $address: String, $valid: Boolean, $capacity: Int, $geometry: String, $geolocation: String, $groupId: UUID, $masterFacilityId: UUID, $rbacobjectId: UUID) {
  result: facilityInsert(facility: { name: $name, facilitytypeId: $facilitytypeId, id: $id, nameEn: $nameEn, label: $label, address: $address, valid: $valid, capacity: $capacity, geometry: $geometry, geolocation: $geolocation, groupId: $groupId, masterFacilityId: $masterFacilityId, rbacobjectId: $rbacobjectId }) {
    __typename
    ... on FacilityGQLModel {
      ...FacilityLargeFragment
    }
    ... on InsertError {
      msg
      failed
      input
    }
  }
}
`, FacilityLargeFragment)
export const FacilityInsertAsyncAction = createAsyncGraphQLAction(FacilityInsertMutation)