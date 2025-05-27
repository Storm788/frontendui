/**
 * A component for displaying the `changedby` attribute of an lesson entity.
 *
 * This component checks if the `changedby` attribute exists on the `lesson` object. If `changedby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `changedby` attribute.
 *
 * @component
 * @param {Object} props - The props for the LessonChangedbyAttribute component.
 * @param {Object} props.lesson - The object representing the lesson entity.
 * @param {*} [props.lesson.changedby] - The changedby attribute of the lesson entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `changedby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const lessonEntity = { changedby: { id: 1, name: "Sample Changedby" } };
 *
 * <LessonChangedbyAttribute lesson={lessonEntity} />
 */
export const LessonChangedbyAttribute = ({lesson}) => {
    const {changedby} = lesson
    if (typeof changedby === 'undefined') return null
    return (
        <>
            {/* <ChangedbyMediumCard changedby={changedby} /> */}
            {/* <ChangedbyLink changedby={changedby} /> */}
            Probably {'<ChangedbyMediumCard changedby=\{changedby\} />'} <br />
            <pre>{JSON.stringify(changedby, null, 4)}</pre>
        </>
    )
}