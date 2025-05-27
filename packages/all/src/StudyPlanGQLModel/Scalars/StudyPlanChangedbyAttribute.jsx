/**
 * A component for displaying the `changedby` attribute of an studyplan entity.
 *
 * This component checks if the `changedby` attribute exists on the `studyplan` object. If `changedby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `changedby` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudyPlanChangedbyAttribute component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {*} [props.studyplan.changedby] - The changedby attribute of the studyplan entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `changedby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { changedby: { id: 1, name: "Sample Changedby" } };
 *
 * <StudyPlanChangedbyAttribute studyplan={studyplanEntity} />
 */
export const StudyPlanChangedbyAttribute = ({studyplan}) => {
    const {changedby} = studyplan
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