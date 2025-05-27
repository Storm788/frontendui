/**
 * A component for displaying the `rbacobject` attribute of an studyplanlesson entity.
 *
 * This component checks if the `rbacobject` attribute exists on the `studyplanlesson` object. If `rbacobject` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `rbacobject` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudyPlanLessonRbacobjectAttribute component.
 * @param {Object} props.studyplanlesson - The object representing the studyplanlesson entity.
 * @param {*} [props.studyplanlesson.rbacobject] - The rbacobject attribute of the studyplanlesson entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `rbacobject` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanlessonEntity = { rbacobject: { id: 1, name: "Sample Rbacobject" } };
 *
 * <StudyPlanLessonRbacobjectAttribute studyplanlesson={studyplanlessonEntity} />
 */
export const StudyPlanLessonRbacobjectAttribute = ({studyplanlesson}) => {
    const {rbacobject} = studyplanlesson
    if (typeof rbacobject === 'undefined') return null
    return (
        <>
            {/* <RbacobjectMediumCard rbacobject={rbacobject} /> */}
            {/* <RbacobjectLink rbacobject={rbacobject} /> */}
            Probably {'<RbacobjectMediumCard rbacobject=\{rbacobject\} />'} <br />
            <pre>{JSON.stringify(rbacobject, null, 4)}</pre>
        </>
    )
}