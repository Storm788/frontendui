import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { 
    CreateAsyncActionFromQuery,
//    CreateAsyncQueryValidator,
    GQLQueryLazyVectorAfterFetch as UpdateVectorAfterFetch
} from "@hrbolek/uoisfrontend-shared/src"

//GroupCategoryGQLModel
//["name","description","args","type","isDeprecated","deprecationReason","argByName","targetType","returnType","returnTypeName","returnShortName","isScalar","isVector","isObject","masterType"]
//GroupTypeGQLModel
//["skip","limit","orderby","where"]
//["skip","limit","orderby","where"]

/**
 * Groupcategory.types
 * 
 * returns List[GroupTypeGQLModel]
 * where : GroupTypeInputWhereFilter
 * arguments
 * skip : 
 * limit : 
 * orderby : 
 * where : 
 */
export const GroupcategoryTypesQuery = `
query GroupcategoryTypes($id: UUID!, $skip: Int, $limit: Int, $where: GroupTypeInputWhereFilter) {
    result: groupcategoryById(id: $id) {
        id
        types(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
            created
            lastchange
            name
            nameEn
        }   
    }
}
`
export const GroupcategoryTypesQueryAction = CreateAsyncActionFromQuery(GroupcategoryTypesQuery, {}, UpdateVectorAfterFetch("types"))

export const GroupcategoryTypesLoadMoreButton = ({ groupcategory, limit=10, where, action=GroupcategoryTypesQueryAction, children }) => {
    const [_state, _setState] = useState(
        { skip: 0, limit: limit, more: true, loading: false, errors: null }
    )
    const dispatch = useDispatch()
    const onLoadMore = async () => {
        const jsondata = await dispatch(action({...groupcategory, limit: _state.limit, skip: _state.skip, where: where}))
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

