/**
 * A component for displaying the `rbacobject` attribute of an lesson entity.
 *
 * This component checks if the `rbacobject` attribute exists on the `lesson` object. If `rbacobject` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `rbacobject` attribute.
 *
 * @component
 * @param {Object} props - The props for the LessonRbacobjectAttribute component.
 * @param {Object} props.lesson - The object representing the lesson entity.
 * @param {*} [props.lesson.rbacobject] - The rbacobject attribute of the lesson entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `rbacobject` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const lessonEntity = { rbacobject: { id: 1, name: "Sample Rbacobject" } };
 *
 * <LessonRbacobjectAttribute lesson={lessonEntity} />
 */
export const LessonRbacobjectAttribute = ({lesson}) => {
    const {rbacobject} = lesson
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