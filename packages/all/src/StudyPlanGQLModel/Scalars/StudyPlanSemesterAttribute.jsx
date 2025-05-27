import { SemesterLink } from "../../SemesterGQLModel"

/**
 * A component for displaying the `semester` attribute of an studyplan entity.
 *
 * This component checks if the `semester` attribute exists on the `studyplan` object. If `semester` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `semester` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudyPlanSemesterAttribute component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {*} [props.studyplan.semester] - The semester attribute of the studyplan entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `semester` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { semester: { id: 1, name: "Sample Semester" } };
 *
 * <StudyPlanSemesterAttribute studyplan={studyplanEntity} />
 */
export const StudyPlanSemesterAttribute = ({studyplan}) => {
    const {semester} = studyplan
    if (typeof semester === 'undefined') return null
    if (semester === null) return null
    return (
        <>
            {/* <SemesterMediumCard semester={semester} /> */}
            <SemesterLink semester={semester} />
            {/* Probably {'<SemesterMediumCard semester=\{semester\} />'} <br /> */}
            {/* <pre>{JSON.stringify(semester, null, 4)}</pre> */}
        </>
    )
}