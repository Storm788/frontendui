import { TemplateLargeCard } from "../Components"
import { TemplatePageNavbar } from "./TemplatePageNavbar"

/**
 * Renders a page layout for a single template entity, including navigation and detailed view.
 *
 * This component wraps `TemplatePageNavbar` and `TemplateLargeCard` to provide a consistent
 * interface for displaying an individual template. It also supports rendering children as 
 * nested content inside the card.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {{ id: string|number, name: string }} props.template - The template entity to display.
 * @param {React.ReactNode} [props.children] - Optional nested content rendered inside the card.
 * @returns {JSX.Element} Rendered page layout for a template.
 *
 * @example
 * const template = { id: 1, name: "Example Template" };
 * <TemplatePageContent template={template}>
 *   <p>Additional info here.</p>
 * </TemplatePageContent>
 */
export const TemplatePageContent = ({template, children, ...props}) => {
    return (<>
        <TemplatePageNavbar template={template} />
        <TemplateLargeCard template={template} {...props} >
            Template {JSON.stringify(template)}
            {children}
        </TemplateLargeCard>
    </>)
}