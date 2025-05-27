/**
 * A component for displaying the `exam` attribute of an studyplan entity.
 *
 * This component checks if the `exam` attribute exists on the `studyplan` object. If `exam` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `exam` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudyPlanExamAttribute component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {*} [props.studyplan.exam] - The exam attribute of the studyplan entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `exam` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { exam: { id: 1, name: "Sample Exam" } };
 *
 * <StudyPlanExamAttribute studyplan={studyplanEntity} />
 */
export const StudyPlanExamAttribute = ({studyplan}) => {
    const {exam} = studyplan
    if (typeof exam === 'undefined') return null
    return (
        <>
            {/* <ExamMediumCard exam={exam} /> */}
            {/* <ExamLink exam={exam} /> */}
            Probably {'<ExamMediumCard exam=\{exam\} />'} <br />
            <pre>{JSON.stringify(exam, null, 4)}</pre>
        </>
    )
}