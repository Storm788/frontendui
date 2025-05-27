/**
 * A component for displaying the `createdby` attribute of an lesson entity.
 *
 * This component checks if the `createdby` attribute exists on the `lesson` object. If `createdby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `createdby` attribute.
 *
 * @component
 * @param {Object} props - The props for the LessonCreatedbyAttribute component.
 * @param {Object} props.lesson - The object representing the lesson entity.
 * @param {*} [props.lesson.createdby] - The createdby attribute of the lesson entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `createdby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const lessonEntity = { createdby: { id: 1, name: "Sample Createdby" } };
 *
 * <LessonCreatedbyAttribute lesson={lessonEntity} />
 */
export const LessonCreatedbyAttribute = ({lesson}) => {
    const {createdby} = lesson
    if (typeof createdby === 'undefined') return null
    return (
        <>
            {/* <CreatedbyMediumCard createdby={createdby} /> */}
            {/* <CreatedbyLink createdby={createdby} /> */}
            Probably {'<CreatedbyMediumCard createdby=\{createdby\} />'} <br />
            <pre>{JSON.stringify(createdby, null, 4)}</pre>
        </>
    )
}