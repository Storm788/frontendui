import { ProgramLanguageTypeLargeCard } from "../Components"
import { ProgramLanguageTypePageNavbar } from "./ProgramLanguageTypePageNavbar"

/**
 * Renders a page layout for a single programlanguagetype entity, including navigation and detailed view.
 *
 * This component wraps `ProgramLanguageTypePageNavbar` and `ProgramLanguageTypeLargeCard` to provide a consistent
 * interface for displaying an individual programlanguagetype. It also supports rendering children as 
 * nested content inside the card.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ id: string|number, name: string }} props.programlanguagetype - The programlanguagetype entity to display.
 * @param {React.ReactNode} [props.children] - Optional nested content rendered inside the card.
 * @returns {JSX.Element} Rendered page layout for a programlanguagetype.
 *
 * @example
 * const programlanguagetype = { id: 1, name: "Example ProgramLanguageType" };
 * <ProgramLanguageTypePageContent programlanguagetype={programlanguagetype}>
 *   <p>Additional info here.</p>
 * </ProgramLanguageTypePageContent>
 */
export const ProgramLanguageTypePageContent = ({programlanguagetype, children, ...props}) => {
    return (<>
        <ProgramLanguageTypePageNavbar programlanguagetype={programlanguagetype} />
        <ProgramLanguageTypeLargeCard programlanguagetype={programlanguagetype} {...props} >
            ProgramLanguageType {JSON.stringify(programlanguagetype)}
            {children}
        </ProgramLanguageTypeLargeCard>
    </>)
}