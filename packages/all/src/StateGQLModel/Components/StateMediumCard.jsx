import { PersonFill } from "react-bootstrap-icons"
import { StateLink } from "./StateLink"
import { StateCardCapsule } from "./StateCardCapsule"
import { StateMediumContent } from "./StateMediumContent"

/**
 * A card component that displays detailed content for an state entity.
 *
 * This component combines `StateCardCapsule` and `StateMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the state entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the StateMediumCard component.
 * @param {Object} props.state - The object representing the state entity.
 * @param {string|number} props.state.id - The unique identifier for the state entity.
 * @param {string} props.state.name - The name or label of the state entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const stateEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StateMediumCard state={stateEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </StateMediumCard>
 */
export const StateMediumCard = ({state, children}) => {
    return (
        <StateCardCapsule title={<><PersonFill /> <StateLink state={state} /></>}>
            <StateMediumContent state={state}>
                {children}
            </StateMediumContent>
        </StateCardCapsule>
    )
}
