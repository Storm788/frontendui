import { AppCanvas, createAsyncGraphQLAction, useAsyncAction } from '@hrbolek/uoisfrontend-gql-shared'
// import { AppRouter } from './AppRouter';
const Value = ({value}) => {
    return <span>{value}</span>
}

const Name = ({name}) => {
    return (
        <span>Name: {name}</span>
    )
}

const User = ({name, surname, children}) => {
    return (
        <div>{name}, {surname} <br/> {children}</div>
    )
}

const Envelope = ({children}) => {
    return (
        <div>{children}</div>
    )
}

const readUserPageAsyncAction = createAsyncGraphQLAction(`{
  userPage {
    __typename
    id
    name
    surname
  }
}`)

export const FirstEntity = () => {
    const { loading, error, entity, dispatchResult } = useAsyncAction(readUserPageAsyncAction, { });

    if (loading) return <p>Loading...</p>;
    return <div>User: <div>{JSON.stringify(dispatchResult)}</div></div>;
}