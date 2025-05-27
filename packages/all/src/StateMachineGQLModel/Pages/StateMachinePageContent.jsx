import { StateMachineLargeCard } from "../Components"
import { StateMachinePageNavbar } from "./StateMachinePageNavbar"

/**
 * Renders a page layout for a single statemachine entity, including navigation and detailed view.
 *
 * This component wraps `StateMachinePageNavbar` and `StateMachineLargeCard` to provide a consistent
 * interface for displaying an individual statemachine. It also supports rendering children as 
 * nested content inside the card.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ id: string|number, name: string }} props.statemachine - The statemachine entity to display.
 * @param {React.ReactNode} [props.children] - Optional nested content rendered inside the card.
 * @returns {JSX.Element} Rendered page layout for a statemachine.
 *
 * @example
 * const statemachine = { id: 1, name: "Example StateMachine" };
 * <StateMachinePageContent statemachine={statemachine}>
 *   <p>Additional info here.</p>
 * </StateMachinePageContent>
 */
export const StateMachinePageContent = ({statemachine, children, ...props}) => {
    return (<>
        <StateMachinePageNavbar statemachine={statemachine} />
        <StateMachineLargeCard statemachine={statemachine} {...props} >
            StateMachine {JSON.stringify(statemachine)}
            {children}
        </StateMachineLargeCard>
    </>)
}