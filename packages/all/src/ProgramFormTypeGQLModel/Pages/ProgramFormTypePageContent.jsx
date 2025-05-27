import { ProgramFormTypeLargeCard } from "../Components"
import { ProgramFormTypePageNavbar } from "./ProgramFormTypePageNavbar"

/**
 * Renders a page layout for a single programformtype entity, including navigation and detailed view.
 *
 * This component wraps `ProgramFormTypePageNavbar` and `ProgramFormTypeLargeCard` to provide a consistent
 * interface for displaying an individual programformtype. It also supports rendering children as 
 * nested content inside the card.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ id: string|number, name: string }} props.programformtype - The programformtype entity to display.
 * @param {React.ReactNode} [props.children] - Optional nested content rendered inside the card.
 * @returns {JSX.Element} Rendered page layout for a programformtype.
 *
 * @example
 * const programformtype = { id: 1, name: "Example ProgramFormType" };
 * <ProgramFormTypePageContent programformtype={programformtype}>
 *   <p>Additional info here.</p>
 * </ProgramFormTypePageContent>
 */
export const ProgramFormTypePageContent = ({programformtype, children, ...props}) => {
    return (<>
        <ProgramFormTypePageNavbar programformtype={programformtype} />
        <ProgramFormTypeLargeCard programformtype={programformtype} {...props} >
            ProgramFormType {JSON.stringify(programformtype)}
            {children}
        </ProgramFormTypeLargeCard>
    </>)
}