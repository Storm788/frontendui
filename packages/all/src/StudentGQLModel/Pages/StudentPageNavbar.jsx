import Nav from 'react-bootstrap/Nav'
import { ProxyLink, MyNavbar, useHash } from '@hrbolek/uoisfrontend-shared';

import { StudentURI } from '../Components'

/**
 * Allow to use HashContainer for determination which component at page will be rendered.
 * That must be manually inserted at StudentPageContent, usually this should be done 
 * as children of StudentLargeCard.
 * <StudentLargeCard>
 *     <HashContainer>
 *         <VectorA id="history"/>
 *         <VectorB id="roles"/>
 *         <VectorC id="graph"/>
 *     </HashContainer>
 * </StudentLargeCard>
 * it is usefull to define globally active "areas" like science, administration, teaching, ...
 */
const StudentPageSegments = [
    { segment: 'education', label: 'Výuka'},
    { segment: 'reaserach', label: 'Tvůrčí činnost' },
    { segment: 'administration', label: 'Organizační činnost' },
    { segment: 'development', label: 'Rozvoj' },
]

/**
 * A navigation button component that generates a URL based on the student's ID and a specific segment.
 * The button uses a `ProxyLink` to navigate while preserving hash and query parameters.
 *
 * ### Features:
 * - Dynamically constructs the URL with a hash fragment pointing to the specified segment.
 * - Displays a label for the navigation link.
 * - Integrates seamlessly with `ProxyLink` for enhanced navigation.
 *
 * @component
 * @param {Object} props - The properties for the TitleNavButton component.
 * @param {Object} props.student - The student object containing details about the student.
 * @param {string|number} props.student.id - The unique identifier for the student.
 * @param {string} props.segment - The segment to append as a hash fragment in the URL.
 * @param {string} props.label - The text to display as the label for the navigation button.
 *
 * @returns {JSX.Element} A styled navigation button linking to the constructed URL.
 *
 * @example
 * // Example 1: Basic usage with a student and segment
 * const student = { id: 123 };
 * const segment = "details";
 * const label = "View Details";
 *
 * <TitleNavButton student={student} segment={segment} label={label} />
 * // Resulting URL: `/ug/student/view/123#details`
 *
 * @example
 * // Example 2: Different segment and label
 * <TitleNavButton student={{ id: 456 }} segment="settings" label="Student Settings" />
 * // Resulting URL: `/ug/student/view/456#settings`
 */
const TitleNavButton = ({ student, segment, label, ...props }) => {
    // const urlbase = (segment) => `/students/student/${segment}/${student?.id}`;
    const urlbase = (segment) => `${StudentURI}${student?.id}#${segment}`;
    return (
        <Nav.Link as={"span"} {...props}>
            <ProxyLink to={urlbase(segment)}>{label}</ProxyLink>
        </Nav.Link>
    );
};

/**
 * Renders the navigation bar for an Student page.
 *
 * This component uses a custom hook, `useHash()`, to determine the current hash
 * and highlights the active segment. It displays a navigation bar (using MyNavbar)
 * with several segments (e.g. "history", "roles", "graph"), each rendered as a 
 * TitleNavButton. The segments are hardcoded in this component and only rendered 
 * if an `student` object is provided.
 *
 * @component
 * @param {Object} props - The component properties.
 * @param {Object} props.student - The student entity object that provides context for the page.
 * @param {string|number} props.student.id - The unique identifier for the student.
 * @param {Function} props.onSearchChange - Callback function to handle changes in the search input.
 *
 * @returns {JSX.Element} The rendered StudentPageNavbar component.
 *
 * @example
 * // Example usage:
 * const student = { id: 123, ... };
 * <StudentPageNavbar student={student} onSearchChange={handleSearchChange} />
 */
export const StudentPageNavbar = ({ student, children, onSearchChange }) => {
    const [currentHash, setHash] = useHash(); // Use the custom hook to manage hash
    
    return (
        <div className='screen-only'>
        <MyNavbar onSearchChange={onSearchChange} >
            {student && StudentPageSegments.map(({ segment, label }) => (
                <Nav.Item key={segment} >
                    <TitleNavButton
                        student={student}
                        segment={segment}
                        label={label}
                        className={segment===currentHash?"active":""} aria-current={segment===currentHash?"page":undefined}
                    />
                </Nav.Item>
            ))}
            {children}
      </MyNavbar>
      </div>
    );
};