import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { StateCardCapsule } from "./StateCardCapsule"
import { StateMediumCard } from "./StateMediumCard"

/**
 * A large card component for displaying detailed content and layout for an state entity.
 *
 * This component wraps an `StateCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `StateMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the StateLargeCard component.
 * @param {Object} props.state - The object representing the state entity.
 * @param {string|number} props.state.id - The unique identifier for the state entity.
 * @param {string} props.state.name - The name or label of the state entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const stateEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StateLargeCard state={stateEntity}>
 *   <p>Additional content for the middle column.</p>
 * </StateLargeCard>
 */
export const StateLargeCard = ({state, children}) => {
    return (
        <StateCardCapsule state={state} >
            <Row>
                <LeftColumn>
                    <StateMediumCard state={state}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </StateCardCapsule>
    )
}
