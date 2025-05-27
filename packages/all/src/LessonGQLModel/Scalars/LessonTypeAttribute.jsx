/**
 * A component for displaying the `type` attribute of an lesson entity.
 *
 * This component checks if the `type` attribute exists on the `lesson` object. If `type` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `type` attribute.
 *
 * @component
 * @param {Object} props - The props for the LessonTypeAttribute component.
 * @param {Object} props.lesson - The object representing the lesson entity.
 * @param {*} [props.lesson.type] - The type attribute of the lesson entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `type` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const lessonEntity = { type: { id: 1, name: "Sample Type" } };
 *
 * <LessonTypeAttribute lesson={lessonEntity} />
 */
export const LessonTypeAttribute = ({lesson}) => {
    const {type} = lesson
    if (typeof type === 'undefined') return null
    return (
        <>
            {/* <TypeMediumCard type={type} /> */}
            {/* <TypeLink type={type} /> */}
            Probably {'<TypeMediumCard type=\{type\} />'} <br />
            <pre>{JSON.stringify(type, null, 4)}</pre>
        </>
    )
}