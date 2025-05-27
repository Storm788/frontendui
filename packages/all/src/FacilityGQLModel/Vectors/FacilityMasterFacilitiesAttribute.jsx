import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";


/**
 * Inserts a MasterfacilitieGQLModel item into a facility’s masterfacilities array and dispatches an update.
 *
 * @param {Object} facility - The current facility object containing a `masterfacilities` array.
 * @param {Object} masterfacilitieItem - The item to insert; must have `__typename === "MasterfacilitieGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpFacilityMasterfacilitieItemInsert = (facility, masterfacilitieItem, dispatch) => {
    const { __typename } = masterfacilitieItem;
    if (__typename === "MasterfacilitieGQLModel") {
        const { masterfacilities, ...others } = facility;
        const newFacilityMasterfacilitieItems = [...masterfacilities, masterfacilitieItem];
        const newFacility = { ...others, masterfacilities: newFacilityMasterfacilitieItems };
        dispatch(ItemActions.item_update(newFacility));
    }
};

/**
 * Replaces an existing MasterfacilitieGQLModel item in a facility’s masterfacilities array and dispatches an update.
 *
 * @param {Object} facility - The current facility object containing a `masterfacilities` array.
 * @param {Object} masterfacilitieItem - The updated item; must have `__typename === "MasterfacilitieGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpFacilityMasterfacilitieItemUpdate = (facility, masterfacilitieItem, dispatch) => {
    const { __typename } = masterfacilitieItem;
    if (__typename === "MasterfacilitieGQLModel") {
        const { masterfacilities, ...others } = facility;
        const newFacilityMasterfacilitieItems = masterfacilities.map(item =>
            item.id === masterfacilitieItem.id ? masterfacilitieItem : item
        );
        const newFacility = { ...others, masterfacilities: newFacilityMasterfacilitieItems };
        dispatch(ItemActions.item_update(newFacility));
    }
};

/**
 * Removes a MasterfacilitieGQLModel item from a facility’s masterfacilities array by its `id` and dispatches an update.
 *
 * @param {Object} facility - The current facility object containing a `masterfacilities` array.
 * @param {Object} masterfacilitieItem - The item to delete; must have `__typename === "MasterfacilitieGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpFacilityMasterfacilitieItemDelete = (facility, masterfacilitieItem, dispatch) => {
    const { __typename } = masterfacilitieItem;
    if (__typename === "MasterfacilitieGQLModel") {
        const { masterfacilities, ...others } = facility;
        const newFacilityMasterfacilitieItems = masterfacilities.filter(
            item => item.id !== masterfacilitieItem.id
        );
        const newFacility = { ...others, masterfacilities: newFacilityMasterfacilitieItems };
        dispatch(ItemActions.item_update(newFacility));
    }
};

const FacilityMasterfacilitiesAttributeQuery = `
query FacilityQueryRead($id: UUID!, $where: MasterfacilitieInputFilter, $skip: Int, $limit: Int) {
    result: facilityById(id: $id) {
        __typename
        id
        masterfacilities(skip: $skip, limit: $limit, where: $where) {
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

const FacilityMasterfacilitiesAttributeAsyncAction = createAsyncGraphQLAction(
    FacilityMasterfacilitiesAttributeQuery,
    processVectorAttributeFromGraphQLResult("masterfacilities")
)

/**
 * A component for displaying the `masterfacilities` attribute of a facility entity.
 *
 * This component checks if the `masterfacilities` attribute exists on the `facility` object. If `masterfacilities` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the (optionally filtered) `masterfacilities` array
 * and displays a placeholder message and a JSON representation for each item.
 *
 * @component
 * @param {Object} props - The props for the FacilityMasterfacilitiesAttribute component.
 * @param {Object} props.facility - The object representing the facility entity.
 * @param {Array<Object>} [props.facility.masterfacilities] - An array of masterfacilitie items associated with the facility entity.
 *   Each item is expected to have a unique `id` property.
 * @param {Function} [props.filter=Boolean] - (Optional) A function to filter the masterfacilities array before rendering.
 *
 * @returns {JSX.Element|null} A JSX element displaying the (filtered) `masterfacilities` items or `null` if the attribute is undefined or empty.
 *
 * @example
 * // Basic usage:
 * const facilityEntity = { 
 *   masterfacilities: [
 *     { id: 1, name: "Masterfacilitie Item 1" }, 
 *     { id: 2, name: "Masterfacilitie Item 2" }
 *   ] 
 * };
 * <FacilityMasterfacilitiesAttribute facility={facilityEntity} />
 *
 * @example
 * // With a custom filter:
 * <FacilityMasterfacilitiesAttribute 
 *   facility={facilityEntity}
 *   filter={masterfacilitie => masterfacilitie.name.includes("1")}
 * />
 */
export const FacilityMasterfacilitiesAttribute = ({facility, filter=Boolean}) => {
    const { masterfacilities: unfiltered } = facility
    if (typeof unfiltered === 'undefined') return null
    const masterfacilities = unfiltered.filter(filter)
    if (masterfacilities.length === 0) return null
    return (
        <>
            {masterfacilities.map(
                masterfacilitie => <div id={masterfacilitie.id} key={masterfacilitie.id}>
                    {/* <MasterfacilitieMediumCard masterfacilitie={masterfacilitie} /> */}
                    {/* <MasterfacilitieLink masterfacilitie={masterfacilitie} /> */}
                    Probably {'<MasterfacilitieMediumCard masterfacilitie={masterfacilitie} />'} <br />
                    <pre>{JSON.stringify(masterfacilitie, null, 4)}</pre>
                </div>
            )}
        </>
    )
}

/**
 * Visualiser component for displaying a list of masterfacilitie items using `FacilityMasterfacilitiesAttribute`.
 *
 * Wraps the `FacilityMasterfacilitiesAttribute` component, passing the given `items` as the `masterfacilities` attribute
 * on a synthetic `facility` object. All other props are forwarded.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - The array of masterfacilitie items to be visualized.
 * @param {...any} [props] - Additional props forwarded to `FacilityMasterfacilitiesAttribute` (e.g., `filter`).
 *
 * @returns {JSX.Element|null} Rendered list of masterfacilities or `null` if none are provided.
 *
 * @example
 * <MasterfacilitiesVisualiser
 *   items={[
 *     { id: 1, name: "Masterfacilitie 1" },
 *     { id: 2, name: "Masterfacilitie 2" }
 *   ]}
 *   filter={v => v.name.includes("1")}
 * />
 */
const MasterfacilitiesVisualiser = ({ items, ...props }) => 
    <FacilityMasterfacilitiesAttribute {...props} facility={{ masterfacilities: items }} />

/**
 * Infinite-scrolling component for the `masterfacilities` attribute of a facility entity.
 *
 * Uses the generic `InfiniteScroll` component to fetch, merge, and display the `masterfacilities` array
 * associated with the provided `facility` object. It utilizes `MasterfacilitiesVisualiser` for rendering,
 * and handles pagination, lazy-loading, and merging of items as the user scrolls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.facility - The facility entity containing the `masterfacilities` array.
 * @param {Array<Object>} [props.facility.masterfacilities] - (Optional) Preloaded masterfacilitie items.
 * @param {Object} [props.actionParams={}] - Optional extra parameters for the async fetch action (merged with pagination).
 * @param {...any} [props] - Additional props passed to `InfiniteScroll` or `MasterfacilitiesVisualiser`.
 *
 * @returns {JSX.Element} An infinite-scrolling list of masterfacilities.
 *
 * @example
 * <FacilityMasterfacilitiesAttributeInfinite
 *   facility={{
 *     masterfacilities: [
 *       { id: 1, name: "Masterfacilitie 1" },
 *       { id: 2, name: "Masterfacilitie 2" }
 *     ]
 *   }}
 * />
 */
export const FacilityMasterfacilitiesAttributeInfinite = ({facility, actionParams={}, ...props}) => { 
    const {masterfacilities} = facility

    return (
        <InfiniteScroll 
            {...props}
            Visualiser={MasterfacilitiesVisualiser} 
            preloadedItems={masterfacilities}
            actionParams={{...actionParams, skip: 0, limit: 10}}
            asyncAction={FacilityMasterfacilitiesAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `masterfacilities` from a `facility` entity.
 *
 * This component uses the `FacilityMasterfacilitiesAttributeAsyncAction` to asynchronously fetch
 * the `facility.masterfacilities` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each masterfacilitie item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.facility - The facility entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `masterfacilities` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered masterfacilities or a loading/error placeholder.
 *
 * @example
 * <FacilityMasterfacilitiesAttributeLazy facility={{ id: "abc123" }} />
 *
 * 
 * @example
 * <FacilityMasterfacilitiesAttributeLazy
 *   facility={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const FacilityMasterfacilitiesAttributeLazy = ({facility, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(FacilityMasterfacilitiesAttributeAsyncAction, facility, {deferred: true})
    useEffect(() => {
        fetch(facility)
    }, [facility])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <FacilityMasterfacilitiesAttribute facility={entity} filter={filter} />    
}