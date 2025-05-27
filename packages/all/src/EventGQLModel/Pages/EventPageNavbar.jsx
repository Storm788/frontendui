import Nav from 'react-bootstrap/Nav'
import { ProxyLink, MyNavbar, useHash } from '@hrbolek/uoisfrontend-shared';

import { EventURI } from '../Components'

/**
 * Allow to use HashContainer for determination which component at page will be rendered.
 * That must be manually inserted at EventPageContent, usually this should be done 
 * as children of EventLargeCard.
 * <EventLargeCard>
 *     <HashContainer>
 *         <VectorA id="history"/>
 *         <VectorB id="roles"/>
 *         <VectorC id="graph"/>
 *     </HashContainer>
 * </EventLargeCard>
 * it is usefull to define globally active "areas" like science, administration, teaching, ...
 */
const EventPageSegments = [
    { segment: 'education', label: 'Výuka'},
    { segment: 'reaserach', label: 'Tvůrčí činnost' },
    { segment: 'administration', label: 'Organizační činnost' },
    { segment: 'development', label: 'Rozvoj' },
]

/**
 * A navigation button component that generates a URL based on the event's ID and a specific segment.
 * The button uses a `ProxyLink` to navigate while preserving hash and query parameters.
 *
 * ### Features:
 * - Dynamically constructs the URL with a hash fragment pointing to the specified segment.
 * - Displays a label for the navigation link.
 * - Integrates seamlessly with `ProxyLink` for enhanced navigation.
 *
 * @component
 * @param {Object} props - The properties for the TitleNavButton component.
 * @param {Object} props.event - The event object containing details about the event.
 * @param {string|number} props.event.id - The unique identifier for the event.
 * @param {string} props.segment - The segment to append as a hash fragment in the URL.
 * @param {string} props.label - The text to display as the label for the navigation button.
 *
 * @returns {JSX.Element} A styled navigation button linking to the constructed URL.
 *
 * @example
 * // Example 1: Basic usage with a event and segment
 * const event = { id: 123 };
 * const segment = "details";
 * const label = "View Details";
 *
 * <TitleNavButton event={event} segment={segment} label={label} />
 * // Resulting URL: `/ug/event/view/123#details`
 *
 * @example
 * // Example 2: Different segment and label
 * <TitleNavButton event={{ id: 456 }} segment="settings" label="Event Settings" />
 * // Resulting URL: `/ug/event/view/456#settings`
 */
const TitleNavButton = ({ event, segment, label, ...props }) => {
    // const urlbase = (segment) => `/events/event/${segment}/${event?.id}`;
    const urlbase = (segment) => `${EventURI}${event?.id}#${segment}`;
    return (
        <Nav.Link as={"span"} {...props}>
            <ProxyLink to={urlbase(segment)}>{label}</ProxyLink>
        </Nav.Link>
    );
};

/**
 * Renders the navigation bar for an Event page.
 *
 * This component uses a custom hook, `useHash()`, to determine the current hash
 * and highlights the active segment. It displays a navigation bar (using MyNavbar)
 * with several segments (e.g. "history", "roles", "graph"), each rendered as a 
 * TitleNavButton. The segments are hardcoded in this component and only rendered 
 * if an `event` object is provided.
 *
 * @component
 * @param {Object} props - The component properties.
 * @param {Object} props.event - The event entity object that provides context for the page.
 * @param {string|number} props.event.id - The unique identifier for the event.
 * @param {Function} props.onSearchChange - Callback function to handle changes in the search input.
 *
 * @returns {JSX.Element} The rendered EventPageNavbar component.
 *
 * @example
 * // Example usage:
 * const event = { id: 123, ... };
 * <EventPageNavbar event={event} onSearchChange={handleSearchChange} />
 */
export const EventPageNavbar = ({ event, children, onSearchChange }) => {
    const [currentHash, setHash] = useHash(); // Use the custom hook to manage hash
    
    return (
        <div className='screen-only'>
        <MyNavbar onSearchChange={onSearchChange} >
            {event && EventPageSegments.map(({ segment, label }) => (
                <Nav.Item key={segment} >
                    <TitleNavButton
                        event={event}
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