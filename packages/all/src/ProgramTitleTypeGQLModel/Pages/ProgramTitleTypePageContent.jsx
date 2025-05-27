import { ProgramTitleTypeLargeCard } from "../Components"
import { ProgramTitleTypePageNavbar } from "./ProgramTitleTypePageNavbar"

/**
 * Renders a page layout for a single programtitletype entity, including navigation and detailed view.
 *
 * This component wraps `ProgramTitleTypePageNavbar` and `ProgramTitleTypeLargeCard` to provide a consistent
 * interface for displaying an individual programtitletype. It also supports rendering children as 
 * nested content inside the card.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ id: string|number, name: string }} props.programtitletype - The programtitletype entity to display.
 * @param {React.ReactNode} [props.children] - Optional nested content rendered inside the card.
 * @returns {JSX.Element} Rendered page layout for a programtitletype.
 *
 * @example
 * const programtitletype = { id: 1, name: "Example ProgramTitleType" };
 * <ProgramTitleTypePageContent programtitletype={programtitletype}>
 *   <p>Additional info here.</p>
 * </ProgramTitleTypePageContent>
 */
export const ProgramTitleTypePageContent = ({programtitletype, children, ...props}) => {
    return (<>
        <ProgramTitleTypePageNavbar programtitletype={programtitletype} />
        <ProgramTitleTypeLargeCard programtitletype={programtitletype} {...props} >
            ProgramTitleType {JSON.stringify(programtitletype)}
            {children}
        </ProgramTitleTypeLargeCard>
    </>)
}