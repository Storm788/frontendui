/**
 * A component for displaying the `plan` attribute of an studyplanlesson entity.
 *
 * This component checks if the `plan` attribute exists on the `studyplanlesson` object. If `plan` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `plan` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudyPlanLessonPlanAttribute component.
 * @param {Object} props.studyplanlesson - The object representing the studyplanlesson entity.
 * @param {*} [props.studyplanlesson.plan] - The plan attribute of the studyplanlesson entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `plan` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanlessonEntity = { plan: { id: 1, name: "Sample Plan" } };
 *
 * <StudyPlanLessonPlanAttribute studyplanlesson={studyplanlessonEntity} />
 */
export const StudyPlanLessonPlanAttribute = ({studyplanlesson}) => {
    const {plan} = studyplanlesson
    if (typeof plan === 'undefined') return null
    return (
        <>
            {/* <PlanMediumCard plan={plan} /> */}
            {/* <PlanLink plan={plan} /> */}
            Probably {'<PlanMediumCard plan=\{plan\} />'} <br />
            <pre>{JSON.stringify(plan, null, 4)}</pre>
        </>
    )
}