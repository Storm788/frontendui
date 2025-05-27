import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { StateTransitionCardCapsule } from "./StateTransitionCardCapsule"
import { StateTransitionMediumCard } from "./StateTransitionMediumCard"

/**
 * A large card component for displaying detailed content and layout for an statetransition entity.
 *
 * This component wraps an `StateTransitionCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `StateTransitionMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the StateTransitionLargeCard component.
 * @param {Object} props.statetransition - The object representing the statetransition entity.
 * @param {string|number} props.statetransition.id - The unique identifier for the statetransition entity.
 * @param {string} props.statetransition.name - The name or label of the statetransition entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const statetransitionEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StateTransitionLargeCard statetransition={statetransitionEntity}>
 *   <p>Additional content for the middle column.</p>
 * </StateTransitionLargeCard>
 */
export const StateTransitionLargeCard = ({statetransition, children}) => {
    return (
        <StateTransitionCardCapsule statetransition={statetransition} >
            <Row>
                <LeftColumn>
                    <StateTransitionMediumCard statetransition={statetransition}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </StateTransitionCardCapsule>
    )
}
