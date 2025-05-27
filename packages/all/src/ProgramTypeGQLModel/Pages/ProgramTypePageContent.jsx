import { ProgramTypeLargeCard } from "../Components"
import { ProgramTypePageNavbar } from "./ProgramTypePageNavbar"

/**
 * Renders a page layout for a single programtype entity, including navigation and detailed view.
 *
 * This component wraps `ProgramTypePageNavbar` and `ProgramTypeLargeCard` to provide a consistent
 * interface for displaying an individual programtype. It also supports rendering children as 
 * nested content inside the card.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ id: string|number, name: string }} props.programtype - The programtype entity to display.
 * @param {React.ReactNode} [props.children] - Optional nested content rendered inside the card.
 * @returns {JSX.Element} Rendered page layout for a programtype.
 *
 * @example
 * const programtype = { id: 1, name: "Example ProgramType" };
 * <ProgramTypePageContent programtype={programtype}>
 *   <p>Additional info here.</p>
 * </ProgramTypePageContent>
 */
export const ProgramTypePageContent = ({programtype, children, ...props}) => {
    return (<>
        <ProgramTypePageNavbar programtype={programtype} />
        <ProgramTypeLargeCard programtype={programtype} {...props} >
            ProgramType {JSON.stringify(programtype)}
            {children}
        </ProgramTypeLargeCard>
    </>)
}