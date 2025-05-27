import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { StateMachineCardCapsule } from "./StateMachineCardCapsule"
import { StateMachineMediumCard } from "./StateMachineMediumCard"

/**
 * A large card component for displaying detailed content and layout for an statemachine entity.
 *
 * This component wraps an `StateMachineCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `StateMachineMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the StateMachineLargeCard component.
 * @param {Object} props.statemachine - The object representing the statemachine entity.
 * @param {string|number} props.statemachine.id - The unique identifier for the statemachine entity.
 * @param {string} props.statemachine.name - The name or label of the statemachine entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const statemachineEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StateMachineLargeCard statemachine={statemachineEntity}>
 *   <p>Additional content for the middle column.</p>
 * </StateMachineLargeCard>
 */
export const StateMachineLargeCard = ({statemachine, children}) => {
    return (
        <StateMachineCardCapsule statemachine={statemachine} >
            <Row>
                <LeftColumn>
                    <StateMachineMediumCard statemachine={statemachine}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </StateMachineCardCapsule>
    )
}
