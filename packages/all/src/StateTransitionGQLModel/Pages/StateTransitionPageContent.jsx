import { StateTransitionLargeCard } from "../Components"
import { StateTransitionPageNavbar } from "./StateTransitionPageNavbar"

/**
 * Renders a page layout for a single statetransition entity, including navigation and detailed view.
 *
 * This component wraps `StateTransitionPageNavbar` and `StateTransitionLargeCard` to provide a consistent
 * interface for displaying an individual statetransition. It also supports rendering children as 
 * nested content inside the card.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ id: string|number, name: string }} props.statetransition - The statetransition entity to display.
 * @param {React.ReactNode} [props.children] - Optional nested content rendered inside the card.
 * @returns {JSX.Element} Rendered page layout for a statetransition.
 *
 * @example
 * const statetransition = { id: 1, name: "Example StateTransition" };
 * <StateTransitionPageContent statetransition={statetransition}>
 *   <p>Additional info here.</p>
 * </StateTransitionPageContent>
 */
export const StateTransitionPageContent = ({statetransition, children, ...props}) => {
    return (<>
        <StateTransitionPageNavbar statetransition={statetransition} />
        <StateTransitionLargeCard statetransition={statetransition} {...props} >
            StateTransition {JSON.stringify(statetransition)}
            {children}
        </StateTransitionLargeCard>
    </>)
}