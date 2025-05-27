import { UserLink } from "./UserLink"


/**
 * A React component that conditionally renders a `UserLink` for the provided `createdby` user entity.
 *
 * If the `createdby` prop is defined, it renders a `UserLink` (which links to the user's detail page).
 * All additional props are forwarded to the underlying `UserLink` component.
 * If `createdby` is not provided, the component renders nothing.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} [props.createdby] - The user entity representing the creator.
 * @param {string|number} props.createdby.id - The unique identifier of the user.
 * @param {string} props.createdby.name - The display name of the user.
 * @param {...any} [props] - Additional props passed to the `UserLink` component.
 *
 * @returns {JSX.Element|null} The rendered `UserLink` for the creator, or `null` if not provided.
 *
 * @example
 * // Usage with an entity having a `createdby` property:
 * const entity = { createdby: { id: 42, name: "Alice" } };
 * <CreatedBy createdby={entity.createdby} />
 */
export const CreatedBy = ({ createdby, ...props }) => {
    if (!createdby) return null
    // if (typeof createdby === 'undefined') return null
    return (<>
        {createdby && <UserLink user={createdby} {...props} />}
    </>)
}