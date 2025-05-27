import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { StateTransitionLink } from "./StateTransitionLink"

/**
 * A specialized card component that displays an `StateTransitionLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `StateTransitionLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `statetransition` object.
 *
 * @component
 * @param {Object} props - The props for the StateTransitionCardCapsule component.
 * @param {Object} props.statetransition - The object representing the statetransition entity.
 * @param {string|number} props.statetransition.id - The unique identifier for the statetransition entity.
 * @param {string} props.statetransition.name - The display name for the statetransition entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { StateTransitionCardCapsule } from './StateTransitionCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const statetransitionEntity = { id: 123, name: "Example Entity" };
 *
 * <StateTransitionCardCapsule statetransition={statetransitionEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </StateTransitionCardCapsule>
 */
export const StateTransitionCardCapsule = ({statetransition, children, title=<><PersonFill /> <StateTransitionLink statetransition={statetransition} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
