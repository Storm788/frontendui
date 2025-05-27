/**
 * A component for displaying the `rbacobject` attribute of an lessontype entity.
 *
 * This component checks if the `rbacobject` attribute exists on the `lessontype` object. If `rbacobject` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `rbacobject` attribute.
 *
 * @component
 * @param {Object} props - The props for the LessonTypeRbacobjectAttribute component.
 * @param {Object} props.lessontype - The object representing the lessontype entity.
 * @param {*} [props.lessontype.rbacobject] - The rbacobject attribute of the lessontype entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `rbacobject` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const lessontypeEntity = { rbacobject: { id: 1, name: "Sample Rbacobject" } };
 *
 * <LessonTypeRbacobjectAttribute lessontype={lessontypeEntity} />
 */
export const LessonTypeRbacobjectAttribute = ({lessontype}) => {
    const {rbacobject} = lessontype
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