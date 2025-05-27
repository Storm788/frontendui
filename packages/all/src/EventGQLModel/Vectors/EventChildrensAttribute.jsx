import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";


/**
 * Inserts a ChildrenGQLModel item into a event’s childrens array and dispatches an update.
 *
 * @param {Object} event - The current event object containing a `childrens` array.
 * @param {Object} childrenItem - The item to insert; must have `__typename === "ChildrenGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpEventChildrenItemInsert = (event, childrenItem, dispatch) => {
    const { __typename } = childrenItem;
    if (__typename === "ChildrenGQLModel") {
        const { childrens, ...others } = event;
        const newEventChildrenItems = [...childrens, childrenItem];
        const newEvent = { ...others, childrens: newEventChildrenItems };
        dispatch(ItemActions.item_update(newEvent));
    }
};

/**
 * Replaces an existing ChildrenGQLModel item in a event’s childrens array and dispatches an update.
 *
 * @param {Object} event - The current event object containing a `childrens` array.
 * @param {Object} childrenItem - The updated item; must have `__typename === "ChildrenGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpEventChildrenItemUpdate = (event, childrenItem, dispatch) => {
    const { __typename } = childrenItem;
    if (__typename === "ChildrenGQLModel") {
        const { childrens, ...others } = event;
        const newEventChildrenItems = childrens.map(item =>
            item.id === childrenItem.id ? childrenItem : item
        );
        const newEvent = { ...others, childrens: newEventChildrenItems };
        dispatch(ItemActions.item_update(newEvent));
    }
};

/**
 * Removes a ChildrenGQLModel item from a event’s childrens array by its `id` and dispatches an update.
 *
 * @param {Object} event - The current event object containing a `childrens` array.
 * @param {Object} childrenItem - The item to delete; must have `__typename === "ChildrenGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpEventChildrenItemDelete = (event, childrenItem, dispatch) => {
    const { __typename } = childrenItem;
    if (__typename === "ChildrenGQLModel") {
        const { childrens, ...others } = event;
        const newEventChildrenItems = childrens.filter(
            item => item.id !== childrenItem.id
        );
        const newEvent = { ...others, childrens: newEventChildrenItems };
        dispatch(ItemActions.item_update(newEvent));
    }
};

const EventChildrensAttributeQuery = `
query EventQueryRead($id: UUID!, $where: ChildrenInputFilter, $skip: Int, $limit: Int) {
    result: eventById(id: $id) {
        __typename
        id
        childrens(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
            lastchange
            created
            createdbyId
            changedbyId
            rbacobjectId
            startdate
            enddate
            duration_raw
            facilityId
            mastereventId
            typeId
        }
    }
}
`

const EventChildrensAttributeAsyncAction = createAsyncGraphQLAction(
    EventChildrensAttributeQuery,
    processVectorAttributeFromGraphQLResult("childrens")
)

/**
 * A component for displaying the `childrens` attribute of a event entity.
 *
 * This component checks if the `childrens` attribute exists on the `event` object. If `childrens` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the (optionally filtered) `childrens` array
 * and displays a placeholder message and a JSON representation for each item.
 *
 * @component
 * @param {Object} props - The props for the EventChildrensAttribute component.
 * @param {Object} props.event - The object representing the event entity.
 * @param {Array<Object>} [props.event.childrens] - An array of children items associated with the event entity.
 *   Each item is expected to have a unique `id` property.
 * @param {Function} [props.filter=Boolean] - (Optional) A function to filter the childrens array before rendering.
 *
 * @returns {JSX.Element|null} A JSX element displaying the (filtered) `childrens` items or `null` if the attribute is undefined or empty.
 *
 * @example
 * // Basic usage:
 * const eventEntity = { 
 *   childrens: [
 *     { id: 1, name: "Children Item 1" }, 
 *     { id: 2, name: "Children Item 2" }
 *   ] 
 * };
 * <EventChildrensAttribute event={eventEntity} />
 *
 * @example
 * // With a custom filter:
 * <EventChildrensAttribute 
 *   event={eventEntity}
 *   filter={children => children.name.includes("1")}
 * />
 */
export const EventChildrensAttribute = ({event, filter=Boolean}) => {
    const { childrens: unfiltered } = event
    if (typeof unfiltered === 'undefined') return null
    const childrens = unfiltered.filter(filter)
    if (childrens.length === 0) return null
    return (
        <>
            {childrens.map(
                children => <div id={children.id} key={children.id}>
                    {/* <ChildrenMediumCard children={children} /> */}
                    {/* <ChildrenLink children={children} /> */}
                    Probably {'<ChildrenMediumCard children={children} />'} <br />
                    <pre>{JSON.stringify(children, null, 4)}</pre>
                </div>
            )}
        </>
    )
}

/**
 * Visualiser component for displaying a list of children items using `EventChildrensAttribute`.
 *
 * Wraps the `EventChildrensAttribute` component, passing the given `items` as the `childrens` attribute
 * on a synthetic `event` object. All other props are forwarded.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.items - The array of children items to be visualized.
 * @param {...any} [props] - Additional props forwarded to `EventChildrensAttribute` (e.g., `filter`).
 *
 * @returns {JSX.Element|null} Rendered list of childrens or `null` if none are provided.
 *
 * @example
 * <ChildrensVisualiser
 *   items={[
 *     { id: 1, name: "Children 1" },
 *     { id: 2, name: "Children 2" }
 *   ]}
 *   filter={v => v.name.includes("1")}
 * />
 */
const ChildrensVisualiser = ({ items, ...props }) => 
    <EventChildrensAttribute {...props} event={{ childrens: items }} />

/**
 * Infinite-scrolling component for the `childrens` attribute of a event entity.
 *
 * Uses the generic `InfiniteScroll` component to fetch, merge, and display the `childrens` array
 * associated with the provided `event` object. It utilizes `ChildrensVisualiser` for rendering,
 * and handles pagination, lazy-loading, and merging of items as the user scrolls.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.event - The event entity containing the `childrens` array.
 * @param {Array<Object>} [props.event.childrens] - (Optional) Preloaded children items.
 * @param {Object} [props.actionParams={}] - Optional extra parameters for the async fetch action (merged with pagination).
 * @param {...any} [props] - Additional props passed to `InfiniteScroll` or `ChildrensVisualiser`.
 *
 * @returns {JSX.Element} An infinite-scrolling list of childrens.
 *
 * @example
 * <EventChildrensAttributeInfinite
 *   event={{
 *     childrens: [
 *       { id: 1, name: "Children 1" },
 *       { id: 2, name: "Children 2" }
 *     ]
 *   }}
 * />
 */
export const EventChildrensAttributeInfinite = ({event, actionParams={}, ...props}) => { 
    const {childrens} = event

    return (
        <InfiniteScroll 
            {...props}
            Visualiser={ChildrensVisualiser} 
            preloadedItems={childrens}
            actionParams={{...actionParams, skip: 0, limit: 10}}
            asyncAction={EventChildrensAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `childrens` from a `event` entity.
 *
 * This component uses the `EventChildrensAttributeAsyncAction` to asynchronously fetch
 * the `event.childrens` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each children item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.event - The event entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `childrens` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered childrens or a loading/error placeholder.
 *
 * @example
 * <EventChildrensAttributeLazy event={{ id: "abc123" }} />
 *
 * 
 * @example
 * <EventChildrensAttributeLazy
 *   event={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const EventChildrensAttributeLazy = ({event, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(EventChildrensAttributeAsyncAction, event, {deferred: true})
    useEffect(() => {
        fetch(event)
    }, [event])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <EventChildrensAttribute event={entity} filter={filter} />    
}