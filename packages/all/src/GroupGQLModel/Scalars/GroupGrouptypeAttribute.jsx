/**
 * A component for displaying the `grouptype` attribute of an group entity.
 *
 * This component checks if the `grouptype` attribute exists on the `group` object. If `grouptype` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `grouptype` attribute.
 *
 * @component
 * @param {Object} props - The props for the GroupGrouptypeAttribute component.
 * @param {Object} props.group - The object representing the group entity.
 * @param {*} [props.group.grouptype] - The grouptype attribute of the group entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `grouptype` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const groupEntity = { grouptype: { id: 1, name: "Sample Grouptype" } };
 *
 * <GroupGrouptypeAttribute group={groupEntity} />
 */
export const GroupGrouptypeAttribute = ({group}) => {
    const {grouptype} = group
    if (typeof grouptype === 'undefined') return null
    return (
        <>
            Probably {'<GrouptypeMediumCard grouptype=\{grouptype\} />'} <br />
            <pre>{JSON.stringify(grouptype, null, 4)}</pre>
        </>
    )
}