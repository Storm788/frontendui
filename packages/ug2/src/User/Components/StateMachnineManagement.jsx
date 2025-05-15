import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"

const InsertStateMachineAsyncAction = createAsyncGraphQLAction(
    `mutation statemachineinsert($name: String!) {
  statemachineInsert(statemachine: {name: $name}) {
    __typename
    ...on InsertError {
      failed
      msg
      input
    }
    ...StateMachineMedium
  }
}

fragment StateMachineMedium on StateMachineGQLModel {
  id
  name
}`
)

export const StateMachnineManagement = () => {
    const { loading, error, entity, fetch } = useAsyncAction(InsertStateMachineAsyncAction, {name: "Test"}, {deffered: true})
    const Insert5 = () => {
        for(let i = 0; i < 5; i++) {
            fetch({name: "Test" + i})
        }
    }
    return ( 
    <div>
        Tlacitko< br />
        Tlacitko <br />
        <button onClick={Insert5}>Insert</button><br />
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {entity && <div>Inserted: {JSON.stringify(entity)}</div>}
    </div>)
}