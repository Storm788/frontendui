import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"

import { UserLink } from "../../UserGQLModel/Components/UserLink"
import { StudentLink } from "../../StudentGQLModel/Components/StudentLink"

/**
 * Inserts a StudentGQLModel item into a program’s students array and dispatches an update.
 *
 * @param {Object} program - The current program object containing a `students` array.
 * @param {Object} studentItem - The item to insert; must have `__typename === "StudentGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpProgramStudentItemInsert = (program, studentItem, dispatch) => {
    const { __typename } = studentItem;
    if (__typename === "StudentGQLModel") {
        const { students, ...others } = program;
        const newProgramStudentItems = [...students, studentItem];
        const newProgram = { ...others, students: newProgramStudentItems };
        dispatch(ItemActions.item_update(newProgram));
    }
};

/**
 * Replaces an existing StudentGQLModel item in a program’s students array and dispatches an update.
 *
 * @param {Object} program - The current program object containing a `students` array.
 * @param {Object} studentItem - The updated item; must have `__typename === "StudentGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpProgramStudentItemUpdate = (program, studentItem, dispatch) => {
    const { __typename } = studentItem;
    if (__typename === "StudentGQLModel") {
        const { students, ...others } = program;
        const newProgramStudentItems = students.map(item =>
            item.id === studentItem.id ? studentItem : item
        );
        const newProgram = { ...others, students: newProgramStudentItems };
        dispatch(ItemActions.item_update(newProgram));
    }
};

/**
 * Removes a StudentGQLModel item from a program’s students array by its `id` and dispatches an update.
 *
 * @param {Object} program - The current program object containing a `students` array.
 * @param {Object} studentItem - The item to delete; must have `__typename === "StudentGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpProgramStudentItemDelete = (program, studentItem, dispatch) => {
    const { __typename } = studentItem;
    if (__typename === "StudentGQLModel") {
        const { students, ...others } = program;
        const newProgramStudentItems = students.filter(
            item => item.id !== studentItem.id
        );
        const newProgram = { ...others, students: newProgramStudentItems };
        dispatch(ItemActions.item_update(newProgram));
    }
};

const ProgramStudentsAttributeQuery = `
query ProgramQueryRead($id: UUID!, $where: StudentInputFilter, $skip: Int, $limit: Int) {
    result: programById(id: $id) {
        __typename
        id
        students(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
            myId
            lastchange
            created
            createdbyId
            changedbyId
            rbacobjectId
            userId
            student {
                __typename
                id
                fullname
                email
            }
            programId
            program {
                __typename
                id
                name
            }
            stateId
            state {
                __typename
                id
                name
            }
        }
    }
}
`

const ProgramStudentsAttributeAsyncAction = createAsyncGraphQLAction(
    ProgramStudentsAttributeQuery,
    processVectorAttributeFromGraphQLResult("students")
)

/**
 * A component for displaying the `students` attribute of an program entity.
 *
 * This component checks if the `students` attribute exists on the `program` object. If `students` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `students` array and
 * displays a placeholder message and a JSON representation for each item in the `students`.
 *
 * @component
 * @param {Object} props - The props for the ProgramStudentsAttribute component.
 * @param {Object} props.program - The object representing the program entity.
 * @param {Array} [props.program.students] - An array of students items associated with the program entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `students` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programEntity = { 
 *   students: [
 *     { id: 1, name: "Student Item 1" }, 
 *     { id: 2, name: "Student Item 2" }
 *   ] 
 * };
 *
 * <ProgramStudentsAttribute program={programEntity} />
 */
export const ProgramStudentsAttribute = ({program, filter=Boolean}) => {
    const { students: unfiltered } = program
    if (typeof unfiltered === 'undefined') return null
    const students = unfiltered.filter(filter)
    if (students.length === 0) return null
    return (
        <>
            {students.map(
                student => <div id={student.id} key={student.id}>
                    {/* <StudentMediumCard student={student} /> */}
                    {student?.student && <><UserLink user={student?.student} /> / <StudentLink student={student} /></>}
                    {!student?.student && <span><StudentLink student={student}>Student nenalezen {student?.id} / {student?.state?.name}</StudentLink></span>}
                    {/* Probably {'<StudentMediumCard student=\{student\} />'} <br /> */}
                    {/* <pre>{JSON.stringify(student, null, 4)}</pre> */}
                </div>
            )}
        </>
    )
}


export const ProgramStudentsAttributeInfinite = ({program}) => { 
    const {students} = program

    return (
        <InfiniteScroll 
            Visualiser={'StudentMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={ProgramStudentsAttributeAsyncAction}
        />
    )
}

/**
 * A lazy-loading component for displaying filtered `students` from a `program` entity.
 *
 * This component uses the `ProgramStudentsAttributeAsyncAction` to asynchronously fetch
 * the `program.students` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each student item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.program - The program entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `students` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered students or a loading/error placeholder.
 *
 * @example
 * <ProgramStudentsAttributeLazy program={{ id: "abc123" }} />
 *
 * 
 * @example
 * <ProgramStudentsAttributeLazy
 *   program={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const ProgramStudentsAttributeLazy = ({program, filter=Boolean}) => {
    const {loading, error, entity} = useAsyncAction(ProgramStudentsAttributeAsyncAction, program)
    const values = entity?.students || []
    
    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />

    return <ProgramStudentsAttribute program={entity} filter={filter} />    
}