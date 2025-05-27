/**
 * A component for displaying the `createdby` attribute of an studyplanlesson entity.
 *
 * This component checks if the `createdby` attribute exists on the `studyplanlesson` object. If `createdby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `createdby` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudyPlanLessonCreatedbyAttribute component.
 * @param {Object} props.studyplanlesson - The object representing the studyplanlesson entity.
 * @param {*} [props.studyplanlesson.createdby] - The createdby attribute of the studyplanlesson entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `createdby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanlessonEntity = { createdby: { id: 1, name: "Sample Createdby" } };
 *
 * <StudyPlanLessonCreatedbyAttribute studyplanlesson={studyplanlessonEntity} />
 */
export const StudyPlanLessonCreatedbyAttribute = ({studyplanlesson}) => {
    const {createdby} = studyplanlesson
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