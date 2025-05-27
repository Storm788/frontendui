/**
 * A component for displaying the `mastergroup` attribute of an group entity.
 *
 * This component checks if the `mastergroup` attribute exists on the `group` object. If `mastergroup` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `mastergroup` attribute.
 *
 * @component
 * @param {Object} props - The props for the GroupMastergroupAttribute component.
 * @param {Object} props.group - The object representing the group entity.
 * @param {*} [props.group.mastergroup] - The mastergroup attribute of the group entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `mastergroup` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const groupEntity = { mastergroup: { id: 1, name: "Sample Mastergroup" } };
 *
 * <GroupMastergroupAttribute group={groupEntity} />
 */
export const GroupMastergroupAttribute = ({group}) => {
    const {mastergroup} = group
    if (typeof mastergroup === 'undefined') return null
    return (
        <>
            Probably {'<MastergroupMediumCard mastergroup=\{mastergroup\} />'} <br />
            <pre>{JSON.stringify(mastergroup, null, 4)}</pre>
        </>
    )
}