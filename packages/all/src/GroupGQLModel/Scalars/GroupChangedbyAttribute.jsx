/**
 * A component for displaying the `changedby` attribute of an group entity.
 *
 * This component checks if the `changedby` attribute exists on the `group` object. If `changedby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `changedby` attribute.
 *
 * @component
 * @param {Object} props - The props for the GroupChangedbyAttribute component.
 * @param {Object} props.group - The object representing the group entity.
 * @param {*} [props.group.changedby] - The changedby attribute of the group entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `changedby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const groupEntity = { changedby: { id: 1, name: "Sample Changedby" } };
 *
 * <GroupChangedbyAttribute group={groupEntity} />
 */
export const GroupChangedbyAttribute = ({group}) => {
    const {changedby} = group
    if (typeof changedby === 'undefined') return null
    return (
        <>
            Probably {'<ChangedbyMediumCard changedby=\{changedby\} />'} <br />
            <pre>{JSON.stringify(changedby, null, 4)}</pre>
        </>
    )
}