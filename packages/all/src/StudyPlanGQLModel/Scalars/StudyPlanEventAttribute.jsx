import { EventLink } from '../../EventGQLModel'

/**
 * A component for displaying the `event` attribute of an studyplan entity.
 *
 * This component checks if the `event` attribute exists on the `studyplan` object. If `event` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `event` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudyPlanEventAttribute component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {*} [props.studyplan.event] - The event attribute of the studyplan entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `event` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { event: { id: 1, name: "Sample Event" } };
 *
 * <StudyPlanEventAttribute studyplan={studyplanEntity} />
 */
export const StudyPlanEventAttribute = ({studyplan}) => {
    const {event} = studyplan
    if (typeof event === 'undefined') return null
    if (event === null) return null
    return (
        <>
            {/* <EventMediumCard event={event} /> */}
            <EventLink event={event} />
            {/* Probably {'<EventMediumCard event=\{event\} />'} <br /> */}
            {/* <pre>{JSON.stringify(event, null, 4)}</pre> */}
        </>
    )
}