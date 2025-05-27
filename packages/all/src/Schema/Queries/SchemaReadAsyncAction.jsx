import { createAsyncGraphQLAction, updateItemsFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared";

export const IntrospectionQuery = `query IntrospectionQuery {
  __schema {
    __typename
    queryType { name }
    mutationType { name }
    types {
      name
      description
      kind
      fields {
        name
        description
        args {
          name
          description
          type {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                }
              }
            }
          }
        }
        type {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
      inputFields {
        name
        description
        type {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
            }
          }
        }
      }
      possibleTypes {
        name
        kind
      }
    }
  }
}`;

export const SchemaReadAsyncAction = createAsyncGraphQLAction(
    IntrospectionQuery,
    (jsonData) => async (dispatch, getState, next = (jsonResult) => jsonResult) => {
        const schema = jsonData?.data?.__schema;
        return next({data: {__schema: {...schema, id: "schema"}}});
    },
    updateItemsFromGraphQLResult
)