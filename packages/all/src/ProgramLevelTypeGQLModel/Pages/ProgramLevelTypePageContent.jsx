import { ProgramLevelTypeLargeCard } from "../Components"
import { ProgramLevelTypePageNavbar } from "./ProgramLevelTypePageNavbar"

/**
 * Renders a page layout for a single programleveltype entity, including navigation and detailed view.
 *
 * This component wraps `ProgramLevelTypePageNavbar` and `ProgramLevelTypeLargeCard` to provide a consistent
 * interface for displaying an individual programleveltype. It also supports rendering children as 
 * nested content inside the card.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ id: string|number, name: string }} props.programleveltype - The programleveltype entity to display.
 * @param {React.ReactNode} [props.children] - Optional nested content rendered inside the card.
 * @returns {JSX.Element} Rendered page layout for a programleveltype.
 *
 * @example
 * const programleveltype = { id: 1, name: "Example ProgramLevelType" };
 * <ProgramLevelTypePageContent programleveltype={programleveltype}>
 *   <p>Additional info here.</p>
 * </ProgramLevelTypePageContent>
 */
export const ProgramLevelTypePageContent = ({programleveltype, children, ...props}) => {
    return (<>
        <ProgramLevelTypePageNavbar programleveltype={programleveltype} />
        <ProgramLevelTypeLargeCard programleveltype={programleveltype} {...props} >
            ProgramLevelType {JSON.stringify(programleveltype)}
            {children}
        </ProgramLevelTypeLargeCard>
    </>)
}