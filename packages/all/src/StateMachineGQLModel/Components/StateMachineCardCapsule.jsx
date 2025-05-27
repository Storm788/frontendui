import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { StateMachineLink } from "./StateMachineLink"

/**
 * A specialized card component that displays an `StateMachineLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `StateMachineLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `statemachine` object.
 *
 * @component
 * @param {Object} props - The props for the StateMachineCardCapsule component.
 * @param {Object} props.statemachine - The object representing the statemachine entity.
 * @param {string|number} props.statemachine.id - The unique identifier for the statemachine entity.
 * @param {string} props.statemachine.name - The display name for the statemachine entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { StateMachineCardCapsule } from './StateMachineCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const statemachineEntity = { id: 123, name: "Example Entity" };
 *
 * <StateMachineCardCapsule statemachine={statemachineEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </StateMachineCardCapsule>
 */
export const StateMachineCardCapsule = ({statemachine, children, title=<><PersonFill /> <StateMachineLink statemachine={statemachine} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
