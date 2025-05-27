/**
 * A component for displaying the `createdby` attribute of an lessontype entity.
 *
 * This component checks if the `createdby` attribute exists on the `lessontype` object. If `createdby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `createdby` attribute.
 *
 * @component
 * @param {Object} props - The props for the LessonTypeCreatedbyAttribute component.
 * @param {Object} props.lessontype - The object representing the lessontype entity.
 * @param {*} [props.lessontype.createdby] - The createdby attribute of the lessontype entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `createdby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const lessontypeEntity = { createdby: { id: 1, name: "Sample Createdby" } };
 *
 * <LessonTypeCreatedbyAttribute lessontype={lessontypeEntity} />
 */
export const LessonTypeCreatedbyAttribute = ({lessontype}) => {
    const {createdby} = lessontype
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