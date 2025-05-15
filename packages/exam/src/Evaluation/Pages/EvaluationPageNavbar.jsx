import Nav from 'react-bootstrap/Nav'
import { ProxyLink, MyNavbar, useHash } from '@hrbolek/uoisfrontend-shared';

import { EvaluationURI } from '../Components'
/**
 * A navigation button component that generates a URL based on the evaluation's ID and a specific segment.
 * The button uses a `ProxyLink` to navigate while preserving hash and query parameters.
 *
 * ### Features:
 * - Dynamically constructs the URL with a hash fragment pointing to the specified segment.
 * - Displays a label for the navigation link.
 * - Integrates seamlessly with `ProxyLink` for enhanced navigation.
 *
 * @component
 * @param {Object} props - The properties for the TitleNavButton component.
 * @param {Object} props.evaluation - The evaluation object containing details about the evaluation.
 * @param {string|number} props.evaluation.id - The unique identifier for the evaluation.
 * @param {string} props.segment - The segment to append as a hash fragment in the URL.
 * @param {string} props.label - The text to display as the label for the navigation button.
 *
 * @returns {JSX.Element} A styled navigation button linking to the constructed URL.
 *
 * @example
 * // Example 1: Basic usage with a evaluation and segment
 * const evaluation = { id: 123 };
 * const segment = "details";
 * const label = "View Details";
 *
 * <TitleNavButton evaluation={evaluation} segment={segment} label={label} />
 * // Resulting URL: `/ug/evaluation/view/123#details`
 *
 * @example
 * // Example 2: Different segment and label
 * <TitleNavButton evaluation={{ id: 456 }} segment="settings" label="Evaluation Settings" />
 * // Resulting URL: `/ug/evaluation/view/456#settings`
 */
const TitleNavButton = ({ evaluation, segment, label, ...props }) => {
    // const urlbase = (segment) => `/evaluations/evaluation/${segment}/${evaluation?.id}`;
    const urlbase = (segment) => `${EvaluationURI}${evaluation?.id}#${segment}`;
    return (
        <Nav.Link as={"span"} {...props}>
            <ProxyLink to={urlbase(segment)}>{label}</ProxyLink>
        </Nav.Link>
    );
};

/**
 * Renders the navigation bar for an Evaluation page.
 *
 * This component uses a custom hook, `useHash()`, to determine the current hash
 * and highlights the active segment. It displays a navigation bar (using MyNavbar)
 * with several segments (e.g. "history", "roles", "graph"), each rendered as a 
 * TitleNavButton. The segments are hardcoded in this component and only rendered 
 * if an `evaluation` object is provided.
 *
 * @component
 * @param {Object} props - The component properties.
 * @param {Object} props.evaluation - The evaluation entity object that provides context for the page.
 * @param {string|number} props.evaluation.id - The unique identifier for the evaluation.
 * @param {Function} props.onSearchChange - Callback function to handle changes in the search input.
 *
 * @returns {JSX.Element} The rendered EvaluationPageNavbar component.
 *
 * @example
 * // Example usage:
 * const evaluation = { id: 123, ... };
 * <EvaluationPageNavbar evaluation={evaluation} onSearchChange={handleSearchChange} />
 */
export const EvaluationPageNavbar = ({ evaluation, onSearchChange }) => {
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
            {evaluation && segments.map(({ segment, label }) => (
                <Nav.Item key={segment} >
                    <TitleNavButton
                        evaluation={evaluation}
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