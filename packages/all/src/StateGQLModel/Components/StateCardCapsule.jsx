import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { StateLink } from "./StateLink"

/**
 * A specialized card component that displays an `StateLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `StateLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `state` object.
 *
 * @component
 * @param {Object} props - The props for the StateCardCapsule component.
 * @param {Object} props.state - The object representing the state entity.
 * @param {string|number} props.state.id - The unique identifier for the state entity.
 * @param {string} props.state.name - The display name for the state entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { StateCardCapsule } from './StateCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const stateEntity = { id: 123, name: "Example Entity" };
 *
 * <StateCardCapsule state={stateEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </StateCardCapsule>
 */
export const StateCardCapsule = ({state, children, title=<><PersonFill /> <StateLink state={state} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
