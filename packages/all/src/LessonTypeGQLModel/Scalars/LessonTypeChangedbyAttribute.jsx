/**
 * A component for displaying the `changedby` attribute of an lessontype entity.
 *
 * This component checks if the `changedby` attribute exists on the `lessontype` object. If `changedby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `changedby` attribute.
 *
 * @component
 * @param {Object} props - The props for the LessonTypeChangedbyAttribute component.
 * @param {Object} props.lessontype - The object representing the lessontype entity.
 * @param {*} [props.lessontype.changedby] - The changedby attribute of the lessontype entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `changedby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const lessontypeEntity = { changedby: { id: 1, name: "Sample Changedby" } };
 *
 * <LessonTypeChangedbyAttribute lessontype={lessontypeEntity} />
 */
export const LessonTypeChangedbyAttribute = ({lessontype}) => {
    const {changedby} = lessontype
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