import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { 
    CreateAsyncActionFromQuery,
//    CreateAsyncQueryValidator,
    GQLQueryLazyVectorAfterFetch as UpdateVectorAfterFetch
} from "@hrbolek/uoisfrontend-shared/src"

//EventGQLModel
//["name","description","args","type","isDeprecated","deprecationReason","argByName","targetType","returnType","returnTypeName","returnShortName","isScalar","isVector","isObject","masterType"]
//EventGQLModel
//["skip","limit","where","orderby","desc"]
//["skip","limit","where","orderby","desc"]

/**
 * Event.subEvents
 * events which are contained by this event (aka all lessons for the semester)
 * returns List[EventGQLModel]
 * where : EventInputFilter
 * arguments
 * skip : 
 * limit : 
 * where : 
 * orderby : 
 * desc : 
 */
export const EventSubeventsQuery = `
query EventSubevents($id: UUID!, $skip: Int, $limit: Int, $where: EventInputFilter) {
    result: eventById(id: $id) {
        id
        subEvents(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
            name
            nameEn
            lastchange
            created
            duration
            description
            place
            placeId
            startdate
            enddate
        }   
    }
}
`
export const EventSubeventsQueryAction = CreateAsyncActionFromQuery(EventSubeventsQuery, {}, UpdateVectorAfterFetch("subEvents"))

export const EventSubeventsLoadMoreButton = ({ event, limit=10, where, action=EventSubeventsQueryAction, children }) => {
    const [_state, _setState] = useState(
        { skip: 0, limit: limit, more: true, loading: false, errors: null }
    )
    const dispatch = useDispatch()
    const onLoadMore = async () => {
        const jsondata = await dispatch(action({...event, limit: _state.limit, skip: _state.skip, where: where}))
        const {data, errors} = jsondata
        if (errors) {
            const newState = {..._state, errors: errors, loading: false }
            _setState(newState)
        } else {
            const result = data?.result || {}
            const vector = Object.values(result) || []
            const newState = {
                more: vector?.length === _state.limit,
                limit: _state.limit,
                skip: (vector?.length === _state.limit)?_state.limit+_state.skip:(_state.limit + vector?.length || 0),
                loading: false
            }
            _setState(newState)
        }
    }
    const className = "btn btn-outline-success w-100";
    if (_state.errors) {
        return (<>
            <button className={className} onClick={onLoadMore}>{children || "Načíst více (neimplementováno)"} </button>
            Došlo k chybě:<hr/>
            {JSON.stringify(_state.errors)}
            <hr/>
        </>)
    }
    if (_state.loading) {
        return <button className={className}>Nahrávám</button>
    }
    if (_state.more) {
        return <button className={className} onClick={onLoadMore}>{children || "Načíst více (neimplementováno)"}</button>
    } else {
        return <button className={className} onClick={(e)=>{e.target.innerHTML = 'Více už toho opravdu není.'} }>{children || "Více toho není"}</button>            
    }
    
}

