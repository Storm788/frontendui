import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { FacilityLargeFragment } from "./FacilityFragments";

const FacilityDeleteMutationStr = `
mutation FacilityDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: facilityDelete(
    facility: {id: $id, lastchange: $lastchange}
  ) {
    ... on FacilityGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...FacilityLarge
      }
    }
  }
}
`
const FacilityDeleteMutation = createQueryStrLazy(`
mutation FacilityDelete($id: UUID!, $lastchange: DateTime!) {
  result: facilityDelete(facility: { id: $id, lastchange: $lastchange }) {
    ...FacilityLargeFragment
  }
}
`, FacilityLargeFragment)
export const FacilityDeleteAsyncAction = createAsyncGraphQLAction(FacilityDeleteMutation)