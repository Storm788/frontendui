import Nav from 'react-bootstrap/Nav'
import { ProxyLink, MyNavbar, useHash } from '@hrbolek/uoisfrontend-shared';

import { SubjectURI } from '../Components'
/**
 * A navigation button component that generates a URL based on the subject's ID and a specific segment.
 * The button uses a `ProxyLink` to navigate while preserving hash and query parameters.
 *
 * ### Features:
 * - Dynamically constructs the URL with a hash fragment pointing to the specified segment.
 * - Displays a label for the navigation link.
 * - Integrates seamlessly with `ProxyLink` for enhanced navigation.
 *
 * @component
 * @param {Object} props - The properties for the TitleNavButton component.
 * @param {Object} props.subject - The subject object containing details about the subject.
 * @param {string|number} props.subject.id - The unique identifier for the subject.
 * @param {string} props.segment - The segment to append as a hash fragment in the URL.
 * @param {string} props.label - The text to display as the label for the navigation button.
 *
 * @returns {JSX.Element} A styled navigation button linking to the constructed URL.
 *
 * @example
 * // Example 1: Basic usage with a subject and segment
 * const subject = { id: 123 };
 * const segment = "details";
 * const label = "View Details";
 *
 * <TitleNavButton subject={subject} segment={segment} label={label} />
 * // Resulting URL: `/ug/subject/view/123#details`
 *
 * @example
 * // Example 2: Different segment and label
 * <TitleNavButton subject={{ id: 456 }} segment="settings" label="Subject Settings" />
 * // Resulting URL: `/ug/subject/view/456#settings`
 */
const TitleNavButton = ({ subject, segment, label, ...props }) => {
    // const urlbase = (segment) => `/subjects/subject/${segment}/${subject?.id}`;
    const urlbase = (segment) => `${SubjectURI}${subject?.id}#${segment}`;
    return (
        <Nav.Link as={"span"} {...props}>
            <ProxyLink to={urlbase(segment)}>{label}</ProxyLink>
        </Nav.Link>
    );
};

/**
 * Renders the navigation bar for an Subject page.
 *
 * This component uses a custom hook, `useHash()`, to determine the current hash
 * and highlights the active segment. It displays a navigation bar (using MyNavbar)
 * with several segments (e.g. "history", "roles", "graph"), each rendered as a 
 * TitleNavButton. The segments are hardcoded in this component and only rendered 
 * if an `subject` object is provided.
 *
 * @component
 * @param {Object} props - The component properties.
 * @param {Object} props.subject - The subject entity object that provides context for the page.
 * @param {string|number} props.subject.id - The unique identifier for the subject.
 * @param {Function} props.onSearchChange - Callback function to handle changes in the search input.
 *
 * @returns {JSX.Element} The rendered SubjectPageNavbar component.
 *
 * @example
 * // Example usage:
 * const subject = { id: 123, ... };
 * <SubjectPageNavbar subject={subject} onSearchChange={handleSearchChange} />
 */
export const SubjectPageNavbar = ({ subject, onSearchChange }) => {
    const [currentHash, setHash] = useHash(); // Use the custom hook to manage hash

    const segments = [
        { segment: 'history', label: 'Historie'},
        // { segment: 'permissions', label: 'Práva' },
        { segment: 'roles', label: 'Role' },
        // { segment: 'library', label: 'Knihovna' },
        { segment: 'graph', label: 'Stavy' },
    ]
    return (
        <div className='screen-only'>
        <MyNavbar onSearchChange={onSearchChange} >
            {subject && segments.map(({ segment, label }) => (
                <Nav.Item key={segment} >
                    <TitleNavButton
                        subject={subject}
                        segment={segment}
                        label={label}
                        className={segment===currentHash?"active":""} aria-current={segment===currentHash?"page":undefined}
                    />
                </Nav.Item>
            ))}
      </MyNavbar>
      </div>
    );
};