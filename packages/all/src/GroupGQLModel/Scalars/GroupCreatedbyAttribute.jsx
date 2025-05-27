/**
 * A component for displaying the `createdby` attribute of an group entity.
 *
 * This component checks if the `createdby` attribute exists on the `group` object. If `createdby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `createdby` attribute.
 *
 * @component
 * @param {Object} props - The props for the GroupCreatedbyAttribute component.
 * @param {Object} props.group - The object representing the group entity.
 * @param {*} [props.group.createdby] - The createdby attribute of the group entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `createdby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const groupEntity = { createdby: { id: 1, name: "Sample Createdby" } };
 *
 * <GroupCreatedbyAttribute group={groupEntity} />
 */
export const GroupCreatedbyAttribute = ({group}) => {
    const {createdby} = group
    if (typeof createdby === 'undefined') return null
    return (
        <>
            Probably {'<CreatedbyMediumCard createdby=\{createdby\} />'} <br />
            <pre>{JSON.stringify(createdby, null, 4)}</pre>
        </>
    )
}