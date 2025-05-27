/**
 * A component for displaying the `event` attribute of an studyplanlesson entity.
 *
 * This component checks if the `event` attribute exists on the `studyplanlesson` object. If `event` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `event` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudyPlanLessonEventAttribute component.
 * @param {Object} props.studyplanlesson - The object representing the studyplanlesson entity.
 * @param {*} [props.studyplanlesson.event] - The event attribute of the studyplanlesson entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `event` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanlessonEntity = { event: { id: 1, name: "Sample Event" } };
 *
 * <StudyPlanLessonEventAttribute studyplanlesson={studyplanlessonEntity} />
 */
export const StudyPlanLessonEventAttribute = ({studyplanlesson}) => {
    const {event} = studyplanlesson
    if (typeof event === 'undefined') return null
    return (
        <>
            {/* <EventMediumCard event={event} /> */}
            {/* <EventLink event={event} /> */}
            Probably {'<EventMediumCard event=\{event\} />'} <br />
            <pre>{JSON.stringify(event, null, 4)}</pre>
        </>
    )
}