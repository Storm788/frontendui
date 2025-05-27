import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { use, useEffect } from "react";


/**
 * Inserts a EvaluationGQLModel item into a student’s evaluations array and dispatches an update.
 *
 * @param {Object} student - The current student object containing a `evaluations` array.
 * @param {Object} evaluationItem - The item to insert; must have `__typename === "EvaluationGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStudentEvaluationItemInsert = (student, evaluationItem, dispatch) => {
    const { __typename } = evaluationItem;
    if (__typename === "EvaluationGQLModel") {
        const { evaluations, ...others } = student;
        const newStudentEvaluationItems = [...evaluations, evaluationItem];
        const newStudent = { ...others, evaluations: newStudentEvaluationItems };
        dispatch(ItemActions.item_update(newStudent));
    }
};

/**
 * Replaces an existing EvaluationGQLModel item in a student’s evaluations array and dispatches an update.
 *
 * @param {Object} student - The current student object containing a `evaluations` array.
 * @param {Object} evaluationItem - The updated item; must have `__typename === "EvaluationGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStudentEvaluationItemUpdate = (student, evaluationItem, dispatch) => {
    const { __typename } = evaluationItem;
    if (__typename === "EvaluationGQLModel") {
        const { evaluations, ...others } = student;
        const newStudentEvaluationItems = evaluations.map(item =>
            item.id === evaluationItem.id ? evaluationItem : item
        );
        const newStudent = { ...others, evaluations: newStudentEvaluationItems };
        dispatch(ItemActions.item_update(newStudent));
    }
};

/**
 * Removes a EvaluationGQLModel item from a student’s evaluations array by its `id` and dispatches an update.
 *
 * @param {Object} student - The current student object containing a `evaluations` array.
 * @param {Object} evaluationItem - The item to delete; must have `__typename === "EvaluationGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpStudentEvaluationItemDelete = (student, evaluationItem, dispatch) => {
    const { __typename } = evaluationItem;
    if (__typename === "EvaluationGQLModel") {
        const { evaluations, ...others } = student;
        const newStudentEvaluationItems = evaluations.filter(
            item => item.id !== evaluationItem.id
        );
        const newStudent = { ...others, evaluations: newStudentEvaluationItems };
        dispatch(ItemActions.item_update(newStudent));
    }
};

const StudentEvaluationsAttributeQuery = `
query StudentQueryRead($id: UUID!, $where: EvaluationInputFilter, $skip: Int, $limit: Int) {
    result: studentById(id: $id) {
        __typename
        id
        evaluations(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
            lastchange
            created
            createdbyId
            changedbyId
            rbacobjectId
            studentId
            examinerId
            semesterId
            examId
            eventId
            parentId
            classificationlevelId
            classificationplanId
        }
    }
}
`

const StudentEvaluationsAttributeAsyncAction = createAsyncGraphQLAction(
    StudentEvaluationsAttributeQuery,
    processVectorAttributeFromGraphQLResult("evaluations")
)

/**
 * A component for displaying the `evaluations` attribute of an student entity.
 *
 * This component checks if the `evaluations` attribute exists on the `student` object. If `evaluations` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `evaluations` array and
 * displays a placeholder message and a JSON representation for each item in the `evaluations`.
 *
 * @component
 * @param {Object} props - The props for the StudentEvaluationsAttribute component.
 * @param {Object} props.student - The object representing the student entity.
 * @param {Array} [props.student.evaluations] - An array of evaluations items associated with the student entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `evaluations` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studentEntity = { 
 *   evaluations: [
 *     { id: 1, name: "Evaluation Item 1" }, 
 *     { id: 2, name: "Evaluation Item 2" }
 *   ] 
 * };
 *
 * <StudentEvaluationsAttribute student={studentEntity} />
 */
export const StudentEvaluationsAttribute = ({student, filter=Boolean}) => {
    const { evaluations: unfiltered } = student
    if (typeof unfiltered === 'undefined') return null
    const evaluations = unfiltered.filter(filter)
    if (evaluations.length === 0) return null
    return (
        <>
            {evaluations.map(
                evaluation => <div id={evaluation.id} key={evaluation.id}>
                    {/* <EvaluationMediumCard evaluation={evaluation} /> */}
                    {/* <EvaluationLink evaluation={evaluation} /> */}
                    Probably {'<EvaluationMediumCard evaluation=\{evaluation\} />'} <br />
                    <pre>{JSON.stringify(evaluation, null, 4)}</pre>
                </div>
            )}
        </>
    )
}


export const StudentEvaluationsAttributeInfinite = ({student}) => { 
    const {evaluations} = student

    return (
        <InfiniteScroll 
            Visualiser={'EvaluationMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={StudentEvaluationsAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `evaluations` from a `student` entity.
 *
 * This component uses the `StudentEvaluationsAttributeAsyncAction` to asynchronously fetch
 * the `student.evaluations` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each evaluation item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.student - The student entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `evaluations` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered evaluations or a loading/error placeholder.
 *
 * @example
 * <StudentEvaluationsAttributeLazy student={{ id: "abc123" }} />
 *
 * 
 * @example
 * <StudentEvaluationsAttributeLazy
 *   student={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const StudentEvaluationsAttributeLazy = ({student, filter=Boolean}) => {
    const {loading, error, entity, fetch} = useAsyncAction(StudentEvaluationsAttributeAsyncAction, student, {deferred: true})
    useEffect(() => {
        fetch(student)
    }, [student])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <StudentEvaluationsAttribute student={entity} filter={filter} />    
}