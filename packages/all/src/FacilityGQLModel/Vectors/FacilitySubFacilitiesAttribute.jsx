import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";


/**
 * Inserts a SubfacilitieGQLModel item into a facility’s subfacilities array and dispatches an update.
 *
 * @param {Object} facility - The current facility object containing a `subfacilities` array.
 * @param {Object} subfacilitieItem - The item to insert; must have `__typename === "SubfacilitieGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpFacilitySubfacilitieItemInsert = (facility, subfacilitieItem, dispatch) => {
    const { __typename } = subfacilitieItem;
    if (__typename === "SubfacilitieGQLModel") {
        const { subfacilities, ...others } = facility;
        const newFacilitySubfacilitieItems = [...subfacilities, subfacilitieItem];
        const newFacility = { ...others, subfacilities: newFacilitySubfacilitieItems };
        dispatch(ItemActions.item_update(newFacility));
    }
};

/**
 * Replaces an existing SubfacilitieGQLModel item in a facility’s subfacilities array and dispatches an update.
 *
 * @param {Object} facility - The current facility object containing a `subfacilities` array.
 * @param {Object} subfacilitieItem - The updated item; must have `__typename === "SubfacilitieGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpFacilitySubfacilitieItemUpdate = (facility, subfacilitieItem, dispatch) => {
    const { __typename } = subfacilitieItem;
    if (__typename === "SubfacilitieGQLModel") {
        const { subfacilities, ...others } = facility;
        const newFacilitySubfacilitieItems = subfacilities.map(item =>
            item.id === subfacilitieItem.id ? subfacilitieItem : item
        );
        const newFacility = { ...others, subfacilities: newFacilitySubfacilitieItems };
        dispatch(ItemActions.item_update(newFacility));
    }
};

/**
 * Removes a SubfacilitieGQLModel item from a facility’s subfacilities array by its `id` and dispatches an update.
 *
 * @param {Object} facility - The current facility object containing a `subfacilities` array.
 * @param {Object} subfacilitieItem - The item to delete; must have `__typename === "SubfacilitieGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpFacilitySubfacilitieItemDelete = (facility, subfacilitieItem, dispatch) => {
    const { __typename } = subfacilitieItem;
    if (__typename === "SubfacilitieGQLModel") {
        const { subfacilities, ...others } = facility;
        const newFacilitySubfacilitieItems = subfacilities.filter(
            item => item.id !== subfacilitieItem.id
        );
        const newFacility = { ...others, subfacilities: newFacilitySubfacilitieItems };
        dispatch(ItemActions.item_update(newFacility));
    }
};

const FacilitySubfacilitiesAttributeQuery = `
query FacilityQueryRead($id: UUID!, $where: SubfacilitieInputFilter, $skip: Int, $limit: Int) {
    result: facilityById(id: $id) {
        __typename
        id
        subfacilities(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
            lastchange
            created
            createdbyId
            changedbyId
            rbacobjectId
            startdate
            enddate
            groupId
            facilitytypeId
            masterFacilityId
        }
    }
}
`

const FacilitySubfacilitiesAttributeAsyncAction = createAsyncGraphQLAction(
    FacilitySubfacilitiesAttributeQuery,
    processVectorAttributeFromGraphQLResult("subfacilities")
)

/**
 * A component for displaying the `subfacilities` attribute of a facility entity.
 *
 * This component checks if the `subfacilities` attribute exists on the `facility` object. If `subfacilities` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the (optionally filtered) `subfacilities` array
 * and displays a placeholder message and a JSON representation for each item.
 *
 * @component
 * @param {Object} props - The props for the FacilitySubfacilitiesAttribute component.
 * @param {Object} props.facility - The object representing the facility entity.
 * @param {Array<Object>} [props.facility.subfacilities] - An array of subfacilitie items associated with the facility entity.
 *   Each item is expected to have a unique `id` property.
 * @param {Function} [props.filter=Boolean] - (Optional) A function to filter the subfacilities array before rendering.
 *
 * @returns {JSX.Element|null} A JSX element displaying the (filtered) `subfacilities` items or `null` if the attribute is undefined or empty.
 *
 * @example
 * // Basic usage:
 * const facilityEntity = { 
 *   subfacilities: [
 *     { id: 1, name: "Subfacilitie Item 1" }, 
 *     { id: 2, name: "Subfacilitie Item 2" }
 *   ] 
 * };
 * <FacilitySubfacilitiesAttribute facility={facilityEntity} />
 *
 * @example
 * // With a custom filter:
 * <FacilitySubfacilitiesAttribute 
 *   facility={facilityEntity}
 *   filter={subfacilitie => subfacilitie.name.includes("1")}
 * />
 */
export const FacilitySubfacilitiesAttribute = ({facility, filter=Boolean}) => {
    const { subfacilities: unfiltered } = facility
    if (typeof unfiltered === 'undefined') return null
    const subfacilities = unfiltered.filter(filter)
    if (subfacilities.length === 0) return null
    return (
        <>
            {subfacilities.map(
                subfacilitie => <div id={subfacilitie.id} key={subfacilitie.id}>
                    {/* <SubfacilitieMediumCard subfacilitie={subfacilitie} /> */}
                    {/* <SubfacilitieLink subfacilitie={subfacilitie} /> */}
                    Probably {'<SubfacilitieMediumCard subfacilitie={subfacilitie} />'} <br />
                    <pre>{JSON.stringify(subfacilitie, null, 4)}</pre>
                </div>
            )}
        </>
    )
}

/**
 * Visualiser component for displaying a list of subfacilitie items using `FacilitySubfacilitiesAttribute`.
 *
 * Wraps the `FacilitySubfacilitiesAttribute` component, passing the given `items` as the `subfacilities` attribute
 * on a synthetic `facility` object. All other props are forwarded.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - The array of subfacilitie items to be visualized.
 * @param {...any} [props] - Additional props forwarded to `FacilitySubfacilitiesAttribute` (e.g., `filter`).
 *
 * @returns {JSX.Element|null} Rendered list of subfacilities or `null` if none are provided.
 *
 * @example
 * <SubfacilitiesVisualiser
 *   items={[
 *     { id: 1, name: "Subfacilitie 1" },
 *     { id: 2, name: "Subfacilitie 2" }
 *   ]}
 *   filter={v => v.name.includes("1")}
 * />
 */
const SubfacilitiesVisualiser = ({ items, ...props }) => 
    <FacilitySubfacilitiesAttribute {...props} facility={{ subfacilities: items }} />

/**
 * Infinite-scrolling component for the `subfacilities` attribute of a facility entity.
 *
 * Uses the generic `InfiniteScroll` component to fetch, merge, and display the `subfacilities` array
 * associated with the provided `facility` object. It utilizes `SubfacilitiesVisualiser` for rendering,
 * and handles pagination, lazy-loading, and merging of items as the user scrolls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.facility - The facility entity containing the `subfacilities` array.
 * @param {Array<Object>} [props.facility.subfacilities] - (Optional) Preloaded subfacilitie items.
 * @param {Object} [props.actionParams={}] - Optional extra parameters for the async fetch action (merged with pagination).
 * @param {...any} [props] - Additional props passed to `InfiniteScroll` or `SubfacilitiesVisualiser`.
 *
 * @returns {JSX.Element} An infinite-scrolling list of subfacilities.
 *
 * @example
 * <FacilitySubfacilitiesAttributeInfinite
 *   facility={{
 *     subfacilities: [
 *       { id: 1, name: "Subfacilitie 1" },
 *       { id: 2, name: "Subfacilitie 2" }
 *     ]
 *   }}
 * />
 */
export const FacilitySubfacilitiesAttributeInfinite = ({facility, actionParams={}, ...props}) => { 
    const {subfacilities} = facility

    return (
        <InfiniteScroll 
            {...props}
            Visualiser={SubfacilitiesVisualiser} 
            preloadedItems={subfacilities}
            actionParams={{...actionParams, skip: 0, limit: 10}}
            asyncAction={FacilitySubfacilitiesAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `subfacilities` from a `facility` entity.
 *
 * This component uses the `FacilitySubfacilitiesAttributeAsyncAction` to asynchronously fetch
 * the `facility.subfacilities` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each subfacilitie item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.facility - The facility entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `subfacilities` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered subfacilities or a loading/error placeholder.
 *
 * @example
 * <FacilitySubfacilitiesAttributeLazy facility={{ id: "abc123" }} />
 *
 * 
 * @example
 * <FacilitySubfacilitiesAttributeLazy
 *   facility={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const FacilitySubfacilitiesAttributeLazy = ({facility, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(FacilitySubfacilitiesAttributeAsyncAction, facility, {deferred: true})
    useEffect(() => {
        fetch(facility)
    }, [facility])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <FacilitySubfacilitiesAttribute facility={entity} filter={filter} />    
}