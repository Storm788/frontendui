/**
 * A component for displaying the `changedby` attribute of an studyplanlesson entity.
 *
 * This component checks if the `changedby` attribute exists on the `studyplanlesson` object. If `changedby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `changedby` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudyPlanLessonChangedbyAttribute component.
 * @param {Object} props.studyplanlesson - The object representing the studyplanlesson entity.
 * @param {*} [props.studyplanlesson.changedby] - The changedby attribute of the studyplanlesson entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `changedby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanlessonEntity = { changedby: { id: 1, name: "Sample Changedby" } };
 *
 * <StudyPlanLessonChangedbyAttribute studyplanlesson={studyplanlessonEntity} />
 */
export const StudyPlanLessonChangedbyAttribute = ({studyplanlesson}) => {
    const {changedby} = studyplanlesson
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