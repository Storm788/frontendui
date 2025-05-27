/**
 * A component for displaying the `changedby` attribute of an user entity.
 *
 * This component checks if the `changedby` attribute exists on the `user` object. If `changedby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `changedby` attribute.
 *
 * @component
 * @param {Object} props - The props for the UserChangedbyAttribute component.
 * @param {Object} props.user - The object representing the user entity.
 * @param {*} [props.user.changedby] - The changedby attribute of the user entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `changedby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const userEntity = { changedby: { id: 1, name: "Sample Changedby" } };
 *
 * <UserChangedbyAttribute user={userEntity} />
 */
export const UserChangedbyAttribute = ({user}) => {
    const {changedby} = user
    if (typeof changedby === 'undefined') return null
    return (
        <>
            Probably {'<ChangedbyMediumCard changedby=\{changedby\} />'} <br />
            <pre>{JSON.stringify(changedby, null, 4)}</pre>
        </>
    )
}