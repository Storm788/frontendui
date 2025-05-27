import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"


/**
 * Inserts a AccreditedprogramGQLModel item into a group’s accreditedprograms array and dispatches an update.
 *
 * @param {Object} group - The current group object containing a `accreditedprograms` array.
 * @param {Object} accreditedprogramItem - The item to insert; must have `__typename === "AccreditedprogramGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpGroupAccreditedprogramItemInsert = (group, accreditedprogramItem, dispatch) => {
    const { __typename } = accreditedprogramItem;
    if (__typename === "AccreditedprogramGQLModel") {
        const { accreditedprograms, ...others } = group;
        const newGroupAccreditedprogramItems = [...accreditedprograms, accreditedprogramItem];
        const newGroup = { ...others, accreditedprograms: newGroupAccreditedprogramItems };
        dispatch(ItemActions.item_update(newGroup));
    }
};

/**
 * Replaces an existing AccreditedprogramGQLModel item in a group’s accreditedprograms array and dispatches an update.
 *
 * @param {Object} group - The current group object containing a `accreditedprograms` array.
 * @param {Object} accreditedprogramItem - The updated item; must have `__typename === "AccreditedprogramGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpGroupAccreditedprogramItemUpdate = (group, accreditedprogramItem, dispatch) => {
    const { __typename } = accreditedprogramItem;
    if (__typename === "AccreditedprogramGQLModel") {
        const { accreditedprograms, ...others } = group;
        const newGroupAccreditedprogramItems = accreditedprograms.map(item =>
            item.id === accreditedprogramItem.id ? accreditedprogramItem : item
        );
        const newGroup = { ...others, accreditedprograms: newGroupAccreditedprogramItems };
        dispatch(ItemActions.item_update(newGroup));
    }
};

/**
 * Removes a AccreditedprogramGQLModel item from a group’s accreditedprograms array by its `id` and dispatches an update.
 *
 * @param {Object} group - The current group object containing a `accreditedprograms` array.
 * @param {Object} accreditedprogramItem - The item to delete; must have `__typename === "AccreditedprogramGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpGroupAccreditedprogramItemDelete = (group, accreditedprogramItem, dispatch) => {
    const { __typename } = accreditedprogramItem;
    if (__typename === "AccreditedprogramGQLModel") {
        const { accreditedprograms, ...others } = group;
        const newGroupAccreditedprogramItems = accreditedprograms.filter(
            item => item.id !== accreditedprogramItem.id
        );
        const newGroup = { ...others, accreditedprograms: newGroupAccreditedprogramItems };
        dispatch(ItemActions.item_update(newGroup));
    }
};


/**
 * A component for displaying the `accreditedprograms` attribute of an group entity.
 *
 * This component checks if the `accreditedprograms` attribute exists on the `group` object. If `accreditedprograms` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `accreditedprograms` array and
 * displays a placeholder message and a JSON representation for each item in the `accreditedprograms`.
 *
 * @component
 * @param {Object} props - The props for the GroupAccreditedprogramsAttribute component.
 * @param {Object} props.group - The object representing the group entity.
 * @param {Array} [props.group.accreditedprograms] - An array of accreditedprograms items associated with the group entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `accreditedprograms` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const groupEntity = { 
 *   accreditedprograms: [
 *     { id: 1, name: "Accreditedprogram Item 1" }, 
 *     { id: 2, name: "Accreditedprogram Item 2" }
 *   ] 
 * };
 *
 * <GroupAccreditedprogramsAttribute group={groupEntity} />
 */
export const GroupAccreditedprogramsAttribute = ({group}) => {
    const { accreditedprograms } = group
    if (typeof accreditedprograms === 'undefined') return null
    return (
        <>
            {accreditedprograms.map(
                accreditedprogram => <div id={accreditedprogram.id} key={accreditedprogram.id}>
                    Probably {'<AccreditedprogramMediumCard accreditedprogram=\{accreditedprogram\} />'} <br />
                    <pre>{JSON.stringify(accreditedprogram, null, 4)}</pre>
                </div>
            )}
        </>
    )
}

const GroupAccreditedprogramsAttributeQuery = `
query GroupQueryRead($id: UUID!, $where: AccreditedprogramInputFilter, $skip: Int, $limit: Int) {
    result: groupById(id: $id) {
        __typename
        id
        accreditedprograms(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
            name
            lastchange
            created
            createdbyId
            changedbyId
            rbacobjectId
            groupId
            group {
                id
                name
            }
            licencedGroupId
            typeId {
                id
                name
            }
        }
    }
}
`

const GroupAccreditedprogramsAttributeAsyncAction = createAsyncGraphQLAction(
    GroupAccreditedprogramsAttributeQuery,
    processVectorAttributeFromGraphQLResult("accreditedprograms")
)

export const GroupAccreditedprogramsAttributeInfinite = ({group}) => { 
    const {accreditedprograms} = group

    return (
        <InfiniteScroll 
            Visualiser={'AccreditedprogramMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={GroupAccreditedprogramsAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `accreditedprograms` from a `group` entity.
 *
 * This component uses the `GroupAccreditedprogramsAttributeAsyncAction` to asynchronously fetch
 * the `group.accreditedprograms` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each accreditedprogram item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.group - The group entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `accreditedprograms` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered accreditedprograms or a loading/error placeholder.
 *
 * @example
 * <GroupAccreditedprogramsAttributeLazy group={{ id: "abc123" }} />
 *
 * 
 * @example
 * <GroupAccreditedprogramsAttributeLazy
 *   group={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const GroupAccreditedProgramsAttributeLazy = ({group, filter=Boolean}) => {
    const {loading, error, entity} = useAsyncAction(GroupAccreditedprogramsAttributeAsyncAction, group)
    const values = entity?.accreditedprograms || []
    
    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    const valuesToDisplay = values.filter(filter)
    return (<>
        {valuesToDisplay.map(value => <div key={value.id} id={value.id}>
            {value?.name}
            <pre>{JSON.stringify(value, null, 4)}</pre>
        </div>)}
    </>)
}