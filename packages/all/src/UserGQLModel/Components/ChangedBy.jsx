import { UserLink } from "./UserLink"


/**
 * A React component that conditionally renders a `UserLink` for the provided `changedby` user entity.
 *
 * If the `changedby` prop is defined, it renders a `UserLink` (which links to the user's detail page).
 * All additional props are forwarded to the underlying `UserLink` component.
 * If `changedby` is not provided, the component renders nothing.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} [props.changedby] - The user entity representing the editor.
 * @param {string|number} props.changedby.id - The unique identifier of the user.
 * @param {string} props.changedby.name - The display name of the user.
 * @param {...any} [props] - Additional props passed to the `UserLink` component.
 *
 * @returns {JSX.Element|null} The rendered `UserLink` for the editor, or `null` if not provided.
 *
 * @example
 * // Usage with an entity having a `changedby` property:
 * const entity = { changedby: { id: 42, name: "Alice" } };
 * <Changedby changedby={entity.changedby} />
 */
export const ChangedBy = ({ changedby, ...props }) => {
    if (!changedby) return null
    // if (typeof changedby === 'undefined') return null
    return (<>
        {changedby && <UserLink user={changedby} {...props} />}
    </>)
}