/**
 * A component for displaying the `rbacobject` attribute of an studyplan entity.
 *
 * This component checks if the `rbacobject` attribute exists on the `studyplan` object. If `rbacobject` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `rbacobject` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudyPlanRbacobjectAttribute component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {*} [props.studyplan.rbacobject] - The rbacobject attribute of the studyplan entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `rbacobject` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { rbacobject: { id: 1, name: "Sample Rbacobject" } };
 *
 * <StudyPlanRbacobjectAttribute studyplan={studyplanEntity} />
 */
export const StudyPlanRbacobjectAttribute = ({studyplan}) => {
    const {rbacobject} = studyplan
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