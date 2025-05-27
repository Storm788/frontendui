/**
 * A component for displaying the `rbacobject` attribute of an programtitletype entity.
 *
 * This component checks if the `rbacobject` attribute exists on the `programtitletype` object. If `rbacobject` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `rbacobject` attribute.
 *
 * @component
 * @param {Object} props - The props for the ProgramTitleTypeRbacobjectAttribute component.
 * @param {Object} props.programtitletype - The object representing the programtitletype entity.
 * @param {*} [props.programtitletype.rbacobject] - The rbacobject attribute of the programtitletype entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `rbacobject` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programtitletypeEntity = { rbacobject: { id: 1, name: "Sample Rbacobject" } };
 *
 * <ProgramTitleTypeRbacobjectAttribute programtitletype={programtitletypeEntity} />
 */
export const ProgramTitleTypeRbacobjectAttribute = ({programtitletype}) => {
    const {rbacobject} = programtitletype
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