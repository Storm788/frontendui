import Nav from 'react-bootstrap/Nav'
import { ProxyLink, MyNavbar, useHash } from '@hrbolek/uoisfrontend-shared';

import { TopicURI } from '../Components'

/**
 * Allow to use HashContainer for determination which component at page will be rendered.
 * That must be manually inserted at TopicPageContent, usually this should be done 
 * as children of TopicLargeCard.
 * <TopicLargeCard>
 *     <HashContainer>
 *         <VectorA id="history"/>
 *         <VectorB id="roles"/>
 *         <VectorC id="graph"/>
 *     </HashContainer>
 * </TopicLargeCard>
 * it is usefull to define globally active "areas" like science, administration, teaching, ...
 */
const TopicPageSegments = [
    { segment: 'education', label: 'Výuka'},
    { segment: 'reaserach', label: 'Tvůrčí činnost' },
    { segment: 'administration', label: 'Organizační činnost' },
    { segment: 'development', label: 'Rozvoj' },
]

/**
 * A navigation button component that generates a URL based on the topic's ID and a specific segment.
 * The button uses a `ProxyLink` to navigate while preserving hash and query parameters.
 *
 * ### Features:
 * - Dynamically constructs the URL with a hash fragment pointing to the specified segment.
 * - Displays a label for the navigation link.
 * - Integrates seamlessly with `ProxyLink` for enhanced navigation.
 *
 * @component
 * @param {Object} props - The properties for the TitleNavButton component.
 * @param {Object} props.topic - The topic object containing details about the topic.
 * @param {string|number} props.topic.id - The unique identifier for the topic.
 * @param {string} props.segment - The segment to append as a hash fragment in the URL.
 * @param {string} props.label - The text to display as the label for the navigation button.
 *
 * @returns {JSX.Element} A styled navigation button linking to the constructed URL.
 *
 * @example
 * // Example 1: Basic usage with a topic and segment
 * const topic = { id: 123 };
 * const segment = "details";
 * const label = "View Details";
 *
 * <TitleNavButton topic={topic} segment={segment} label={label} />
 * // Resulting URL: `/ug/topic/view/123#details`
 *
 * @example
 * // Example 2: Different segment and label
 * <TitleNavButton topic={{ id: 456 }} segment="settings" label="Topic Settings" />
 * // Resulting URL: `/ug/topic/view/456#settings`
 */
const TitleNavButton = ({ topic, segment, label, ...props }) => {
    // const urlbase = (segment) => `/topics/topic/${segment}/${topic?.id}`;
    const urlbase = (segment) => `${TopicURI}${topic?.id}#${segment}`;
    return (
        <Nav.Link as={"span"} {...props}>
            <ProxyLink to={urlbase(segment)}>{label}</ProxyLink>
        </Nav.Link>
    );
};

/**
 * Renders the navigation bar for an Topic page.
 *
 * This component uses a custom hook, `useHash()`, to determine the current hash
 * and highlights the active segment. It displays a navigation bar (using MyNavbar)
 * with several segments (e.g. "history", "roles", "graph"), each rendered as a 
 * TitleNavButton. The segments are hardcoded in this component and only rendered 
 * if an `topic` object is provided.
 *
 * @component
 * @param {Object} props - The component properties.
 * @param {Object} props.topic - The topic entity object that provides context for the page.
 * @param {string|number} props.topic.id - The unique identifier for the topic.
 * @param {Function} props.onSearchChange - Callback function to handle changes in the search input.
 *
 * @returns {JSX.Element} The rendered TopicPageNavbar component.
 *
 * @example
 * // Example usage:
 * const topic = { id: 123, ... };
 * <TopicPageNavbar topic={topic} onSearchChange={handleSearchChange} />
 */
export const TopicPageNavbar = ({ topic, children, onSearchChange }) => {
    const [currentHash, setHash] = useHash(); // Use the custom hook to manage hash
    
    return (
        <div className='screen-only'>
        <MyNavbar onSearchChange={onSearchChange} >
            {topic && TopicPageSegments.map(({ segment, label }) => (
                <Nav.Item key={segment} >
                    <TitleNavButton
                        topic={topic}
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