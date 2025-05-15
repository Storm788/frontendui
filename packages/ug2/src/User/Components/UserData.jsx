import { createAsyncGraphQLAction, ItemActions, useAsyncAction } from '@hrbolek/uoisfrontend-gql-shared';
import { CreateDelayer, DeleteButton, Input } from '@hrbolek/uoisfrontend-shared';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserUpdateAsyncAction, UserReadAsyncAction } from '../Queries';
import { UserMediumEditableContent } from './UserMediumEditableContent';
let value = 0;

const QueryGroupAsyncAction = createAsyncGraphQLAction(`query ($pattern: String!){
  groupPage(where: {name :{_ilike: $pattern}}) {
    __typename
    id
    name
  }
}`)


export const updateMembershipsForUser = (jsonData) => async (dispatch, getState, next = (jsonResult) => jsonResult) => {
    console.log("updateMembershipsForUser.jsonData", jsonData)
    const membership = jsonData?.data?.membershipInsert;
    if (membership) {
        const {__typename} = membership
        if (__typename === "MembershipGQLModel") {
            const {user} = membership
            dispatch(ItemActions.item_update(user));
        } 
    }
}

const MembeshipInsertAsyncAction = createAsyncGraphQLAction(`mutation membershipInsert($userId: UUID!, $groupId: UUID!, $id: UUID, $startdate: DateTime, $enddate: DateTime) {
  membershipInsert(membership: {userId: $userId, groupId: $groupId, id: $id, startdate: $startdate, enddate: $enddate}) {
    ... on MembershipGQLModel { ...Membership }
    ... on InsertError { ...InsertError }
  }
}

fragment InsertError on InsertError {
  __typename
  input
  failed
  msg
}

fragment Membership on MembershipGQLModel {
  __typename
  id
  user {
    id
    name
    surname
    memberships {
      id
      group {
        id
        name
        grouptype {
          id
          name
        }
      }
    }
  }
  group {
    id
    name
    grouptype { 
        id
        name
    }

  }
  startdate
  enddate
}`
// , updateMembershipsForUser
)

const LocalGroup = ({group, onSelect}) => {
    const onClick = () => {
        console.log("LocalGroup.onClick", group.id, group.name)
        onSelect(group)
    }
    return (
        <div>
            <a onClick={onClick} href="#">{group.name} [{group.id}]</a>
        </div>
    )
}

const followUpUserUpdate = (user, membership, dispatch) => {
    const {__typename} = membership
    if (__typename === "MembershipGQLModel") {
        const {memberships} = user
        const newMemberships = [...memberships, membership]
        const newUser = {...user, memberships: newMemberships}
        dispatch(ItemActions.item_update(newUser));
    } 
}

export const UserData = ({user}) => {
    const {loading, error, fetch } = useAsyncAction(QueryGroupAsyncAction, {}, {deferred: true});
    const {loading: loadingInsert, error: errorInsert, fetch: fetchInsert} = useAsyncAction(MembeshipInsertAsyncAction, {}, {deferred: true});
    
    const {fetch: refetchUser} = useAsyncAction(UserReadAsyncAction, {}, {deferred: true});

    const [state, setState] = useState(value);
    const [groups, setGroups] = useState([]);
    const [delayer, setDelayer] = useState(() => CreateDelayer(1000));
    const dispatch = useDispatch()

    const onClick = () => {
        value = value + 1;
        const newState = state + 1;
        setState(newState);
    }
    const onSelect = (group) => {
        console.log("UserData.onSelect", group.id, group.name)
        
        const insertParams = {
            userId: user.id,
            groupId: group.id,
            id: crypto.randomUUID(),
            startdate: new Date().toISOString().replace("Z", ""),
            enddate: null
        }

        console.log("UserData.onSelect.insertParams", insertParams)

        fetchInsert(insertParams).then(
            // json => refetchUser({id: user.id})
            // json => {
            //     console.log("UserData.onSelect.json", json)
            //     const membership = json;
            //     if (membership) {
            //         const {__typename} = membership
            //         if (__typename === "MembershipGQLModel") {
            //             const {memberships} = user
            //             const newMemberships = [...memberships, membership]
            //             const newUser = {...user, memberships: newMemberships}
            //             dispatch(ItemActions.item_update(newUser));
            //         } 
            //     } else {
            //         console.error("UserData.onSelect.membershipInsert.error", json)
            //     }
            // }
            json => followUpUserUpdate(user, json, dispatch)
        )
        .catch((error) => {
            console.error("UserData.onSelect.membership.error", error)
        })
    }
    const onChange = (e) => {
        const data = e.target.value;
        if (data.length > 2) {
            delayer(() => fetch({ pattern: `%${data}%` }).then(
                json => {
                    const groups = json?.data?.groupPage || []
                    setGroups(groups)
                    console.log(json)
                    return json
                }
            ))
        }
        console.log("UserData.onChange.data", data)
    }
    const onDelete = () => {
        console.log("UserData.onDelete")
    }
    
    return (
        <div>
            UserData {value}, {state}
            <button className="btn btn-success" onClick={onClick}>Increment</button><br />
            <input className='form-control' type="text" defaultValue={"demo"} onChange={onChange}/>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {JSON.stringify(error)}</div>}
            {groups && groups.map((group) => {
                return <LocalGroup key={group.id} group={group} onSelect={onSelect}/>
            })}
            <UserEmailEdit user={user} />
            <DeleteButton onClick={onDelete}>D</DeleteButton>
        </div>
    )
}


export const UserEmailEdit = ({user}) => {
    const {loading, error, fetch } = useAsyncAction(UserUpdateAsyncAction, {}, {deferred: true});
    const onChange = (e) => {
        const email = e.target.value;
        const newUser = {...user, email: email}
        fetch(newUser)

    }
    const onChange2 = (e) => {
        const newValue = e.target.value;
        const id = e.target.id;
        const newUser = {...user, [id]: newValue}
        fetch(newUser)
    }   
    return (
        <div>
            {loading && <div>Ukládám...</div>}
            {error && <div>Došlo k chybě: {JSON.stringify(error)}</div>}
            <input type="text" className='form-control' defaultValue={user.email} onChange={onChange} />
            
            <UserMediumEditableContent user={user} onChange={onChange2} />
        </div>
    )
}