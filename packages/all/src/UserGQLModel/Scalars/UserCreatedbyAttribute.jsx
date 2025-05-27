/**
 * A component for displaying the `createdby` attribute of an user entity.
 *
 * This component checks if the `createdby` attribute exists on the `user` object. If `createdby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `createdby` attribute.
 *
 * @component
 * @param {Object} props - The props for the UserCreatedbyAttribute component.
 * @param {Object} props.user - The object representing the user entity.
 * @param {*} [props.user.createdby] - The createdby attribute of the user entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `createdby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const userEntity = { createdby: { id: 1, name: "Sample Createdby" } };
 *
 * <UserCreatedbyAttribute user={userEntity} />
 */
export const UserCreatedbyAttribute = ({user}) => {
    const {createdby} = user
    if (typeof createdby === 'undefined') return null
    return (
        <>
            Probably {'<CreatedbyMediumCard createdby=\{createdby\} />'} <br />
            <pre>{JSON.stringify(createdby, null, 4)}</pre>
        </>
    )
}