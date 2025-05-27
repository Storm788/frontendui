import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { FacilityLargeFragment } from "./FacilityFragments";

const FacilityUpdateMutationStr = `
mutation FacilityUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: facilityUpdate(
    facility: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on FacilityGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...FacilityLarge
      }      
    }
    ...FacilityLarge
  }
}
`

const FacilityUpdateMutation = createQueryStrLazy(`
mutation FacilityUpdate($id: UUID!, $lastchange: DateTime!, $name: String, $nameEn: String, $label: String, $address: String, $valid: Boolean, $capacity: Int, $geometry: String, $geolocation: String) {
  result: facilityUpdate(facility: { id: $id, lastchange: $lastchange, name: $name, nameEn: $nameEn, label: $label, address: $address, valid: $valid, capacity: $capacity, geometry: $geometry, geolocation: $geolocation }) {
    __typename
    ... on FacilityGQLModel {
      ...FacilityLargeFragment
    }
    ... on FacilityGQLModelUpdateError {
      Entity {
        ...FacilityLargeFragment
      }
      msg
      failed
      input
    }
  }
}
`, FacilityLargeFragment)
export const FacilityUpdateAsyncAction = createAsyncGraphQLAction(FacilityUpdateMutation)