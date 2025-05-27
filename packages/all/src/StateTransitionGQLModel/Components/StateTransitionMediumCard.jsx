import { PersonFill } from "react-bootstrap-icons"
import { StateTransitionLink } from "./StateTransitionLink"
import { StateTransitionCardCapsule } from "./StateTransitionCardCapsule"
import { StateTransitionMediumContent } from "./StateTransitionMediumContent"

/**
 * A card component that displays detailed content for an statetransition entity.
 *
 * This component combines `StateTransitionCardCapsule` and `StateTransitionMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the statetransition entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the StateTransitionMediumCard component.
 * @param {Object} props.statetransition - The object representing the statetransition entity.
 * @param {string|number} props.statetransition.id - The unique identifier for the statetransition entity.
 * @param {string} props.statetransition.name - The name or label of the statetransition entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const statetransitionEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StateTransitionMediumCard statetransition={statetransitionEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </StateTransitionMediumCard>
 */
export const StateTransitionMediumCard = ({statetransition, children}) => {
    return (
        <StateTransitionCardCapsule title={<><PersonFill /> <StateTransitionLink statetransition={statetransition} /></>}>
            <StateTransitionMediumContent statetransition={statetransition}>
                {children}
            </StateTransitionMediumContent>
        </StateTransitionCardCapsule>
    )
}
