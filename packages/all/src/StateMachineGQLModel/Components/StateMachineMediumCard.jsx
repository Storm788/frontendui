import { PersonFill } from "react-bootstrap-icons"
import { StateMachineLink } from "./StateMachineLink"
import { StateMachineCardCapsule } from "./StateMachineCardCapsule"
import { StateMachineMediumContent } from "./StateMachineMediumContent"

/**
 * A card component that displays detailed content for an statemachine entity.
 *
 * This component combines `StateMachineCardCapsule` and `StateMachineMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the statemachine entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the StateMachineMediumCard component.
 * @param {Object} props.statemachine - The object representing the statemachine entity.
 * @param {string|number} props.statemachine.id - The unique identifier for the statemachine entity.
 * @param {string} props.statemachine.name - The name or label of the statemachine entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const statemachineEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StateMachineMediumCard statemachine={statemachineEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </StateMachineMediumCard>
 */
export const StateMachineMediumCard = ({statemachine, children}) => {
    return (
        <StateMachineCardCapsule title={<><PersonFill /> <StateMachineLink statemachine={statemachine} /></>}>
            <StateMachineMediumContent statemachine={statemachine}>
                {children}
            </StateMachineMediumContent>
        </StateMachineCardCapsule>
    )
}
