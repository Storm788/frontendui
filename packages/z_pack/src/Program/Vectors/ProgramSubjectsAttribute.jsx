import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"
import { SubjectLink } from "../../Subject"

/**
 * A component for displaying the `subjects` attribute of an program entity.
 *
 * This component checks if the `subjects` attribute exists on the `program` object. If `subjects` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `subjects` array and
 * displays a placeholder message and a JSON representation for each item in the `subjects`.
 *
 * @component
 * @param {Object} props - The props for the ProgramSubjectsAttribute component.
 * @param {Object} props.program - The object representing the program entity.
 * @param {Array} [props.program.subjects] - An array of subjects items associated with the program entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `subjects` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programEntity = { 
 *   subjects: [
 *     { id: 1, name: "Subject Item 1" }, 
 *     { id: 2, name: "Subject Item 2" }
 *   ] 
 * };
 *
 * <ProgramSubjectsAttribute program={programEntity} />
 */
export const ProgramSubjectsAttribute = ({program}) => {
    const { subjects } = program
    if (typeof subjects === 'undefined') return null
    return (
        <>
            {subjects.map(
                subject => <div id={subject.id} key={subject.id}>
                    {/* Probably {'<SubjectMediumCard subject=\{subject\} />'} <br /> */}
                    <SubjectLink subject={subject} />
                    {/* <br /> */}
                    {/* {JSON.stringify(subject)} */}
                </div>
            )}
        </>
    )
}

const SubjectsAttributeQuery = `
query ProgramQueryRead($id: id, $where: SubjectInputFilter, $skip: Int, $limit: Int) {
    result: programById(id: $id) {
        __typename
        id
        subjects(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const SubjectsAttributeAsyncAction = createAsyncGraphQLAction(
    SubjectsAttributeQuery,
    processVectorAttributeFromGraphQLResult("subjects")
)

export const ProgramSubjectsAttributeInifite = ({program}) => { 
    const {subjects} = program

    return (
        <InfiniteScroll 
            Visualiser={'SubjectMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={SubjectsAttributeAsyncAction}
        />
    )
}