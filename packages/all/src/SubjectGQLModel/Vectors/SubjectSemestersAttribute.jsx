import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { SemesterMediumCard } from "../../SemesterGQLModel"

/**
 * Inserts a SemesterGQLModel item into a subject’s semesters array and dispatches an update.
 *
 * @param {Object} subject - The current subject object containing a `semesters` array.
 * @param {Object} semesterItem - The item to insert; must have `__typename === "SemesterGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpSubjectSemesterItemInsert = (subject, semesterItem, dispatch) => {
    const { __typename } = semesterItem;
    if (__typename === "SemesterGQLModel") {
        const { semesters, ...others } = subject;
        const newSubjectSemesterItems = [...semesters, semesterItem];
        const newSubject = { ...others, semesters: newSubjectSemesterItems };
        dispatch(ItemActions.item_update(newSubject));
    }
};

/**
 * Replaces an existing SemesterGQLModel item in a subject’s semesters array and dispatches an update.
 *
 * @param {Object} subject - The current subject object containing a `semesters` array.
 * @param {Object} semesterItem - The updated item; must have `__typename === "SemesterGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpSubjectSemesterItemUpdate = (subject, semesterItem, dispatch) => {
    const { __typename } = semesterItem;
    if (__typename === "SemesterGQLModel") {
        const { semesters, ...others } = subject;
        const newSubjectSemesterItems = semesters.map(item =>
            item.id === semesterItem.id ? semesterItem : item
        );
        const newSubject = { ...others, semesters: newSubjectSemesterItems };
        dispatch(ItemActions.item_update(newSubject));
    }
};

/**
 * Removes a SemesterGQLModel item from a subject’s semesters array by its `id` and dispatches an update.
 *
 * @param {Object} subject - The current subject object containing a `semesters` array.
 * @param {Object} semesterItem - The item to delete; must have `__typename === "SemesterGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpSubjectSemesterItemDelete = (subject, semesterItem, dispatch) => {
    const { __typename } = semesterItem;
    if (__typename === "SemesterGQLModel") {
        const { semesters, ...others } = subject;
        const newSubjectSemesterItems = semesters.filter(
            item => item.id !== semesterItem.id
        );
        const newSubject = { ...others, semesters: newSubjectSemesterItems };
        dispatch(ItemActions.item_update(newSubject));
    }
};

const SubjectSemestersAttributeQuery = `
query SubjectQueryRead($id: UUID!, $where: SemesterInputFilter, $skip: Int, $limit: Int) {
    result: subjectById(id: $id) {
        __typename
        id
        semesters(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
            lastchange
            created
            createdbyId
            changedbyId
            rbacobjectId
            classificationtypeId
            subjectId
        }
    }
}
`

const SubjectSemestersAttributeAsyncAction = createAsyncGraphQLAction(
    SubjectSemestersAttributeQuery,
    processVectorAttributeFromGraphQLResult("semesters")
)

/**
 * A component for displaying the `semesters` attribute of an subject entity.
 *
 * This component checks if the `semesters` attribute exists on the `subject` object. If `semesters` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `semesters` array and
 * displays a placeholder message and a JSON representation for each item in the `semesters`.
 *
 * @component
 * @param {Object} props - The props for the SubjectSemestersAttribute component.
 * @param {Object} props.subject - The object representing the subject entity.
 * @param {Array} [props.subject.semesters] - An array of semesters items associated with the subject entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `semesters` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const subjectEntity = { 
 *   semesters: [
 *     { id: 1, name: "Semester Item 1" }, 
 *     { id: 2, name: "Semester Item 2" }
 *   ] 
 * };
 *
 * <SubjectSemestersAttribute subject={subjectEntity} />
 */
export const SubjectSemestersAttribute = ({subject, filter=Boolean}) => {
    const { semesters: unfiltered } = subject
    if (typeof unfiltered === 'undefined') return null
    const semesters = unfiltered.filter(filter)
    if (semesters.length === 0) return null
    // const sorted = semesters.sort((a, b) => a.or
    return (
        <>
            {semesters.map(
                semester => <div id={semester.id} key={semester.id}>
                    <SemesterMediumCard semester={semester} />
                    {/* <SemesterLink semester={semester} /> */}
                    {/* Probably {'<SemesterMediumCard semester=\{semester\} />'} <br /> */}
                    {/* <pre>{JSON.stringify(semester, null, 4)}</pre> */}
                </div>
            )}
        </>
    )
}


export const SubjectSemestersAttributeInfinite = ({subject}) => { 
    const {semesters} = subject

    return (
        <InfiniteScroll 
            Visualiser={'SemesterMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={SubjectSemestersAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `semesters` from a `subject` entity.
 *
 * This component uses the `SubjectSemestersAttributeAsyncAction` to asynchronously fetch
 * the `subject.semesters` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each semester item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.subject - The subject entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `semesters` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered semesters or a loading/error placeholder.
 *
 * @example
 * <SubjectSemestersAttributeLazy subject={{ id: "abc123" }} />
 *
 * 
 * @example
 * <SubjectSemestersAttributeLazy
 *   subject={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const SubjectSemestersAttributeLazy = ({subject, filter=Boolean}) => {
    const {loading, error, entity} = useAsyncAction(SubjectSemestersAttributeAsyncAction, subject)
    const values = entity?.semesters || []
    
    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <SubjectSemestersAttribute subject={entity} filter={filter} />    
}