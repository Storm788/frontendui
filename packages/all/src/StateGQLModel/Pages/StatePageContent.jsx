import { StateLargeCard } from "../Components"
import { StatePageNavbar } from "./StatePageNavbar"

/**
 * Renders a page layout for a single state entity, including navigation and detailed view.
 *
 * This component wraps `StatePageNavbar` and `StateLargeCard` to provide a consistent
 * interface for displaying an individual state. It also supports rendering children as 
 * nested content inside the card.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ id: string|number, name: string }} props.state - The state entity to display.
 * @param {React.ReactNode} [props.children] - Optional nested content rendered inside the card.
 * @returns {JSX.Element} Rendered page layout for a state.
 *
 * @example
 * const state = { id: 1, name: "Example State" };
 * <StatePageContent state={state}>
 *   <p>Additional info here.</p>
 * </StatePageContent>
 */
export const StatePageContent = ({state, children, ...props}) => {
    return (<>
        <StatePageNavbar state={state} />
        <StateLargeCard state={state} {...props} >
            State {JSON.stringify(state)}
            {children}
        </StateLargeCard>
    </>)
}