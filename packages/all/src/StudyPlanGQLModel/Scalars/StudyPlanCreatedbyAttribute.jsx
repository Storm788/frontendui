/**
 * A component for displaying the `createdby` attribute of an studyplan entity.
 *
 * This component checks if the `createdby` attribute exists on the `studyplan` object. If `createdby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `createdby` attribute.
 *
 * @component
 * @param {Object} props - The props for the StudyPlanCreatedbyAttribute component.
 * @param {Object} props.studyplan - The object representing the studyplan entity.
 * @param {*} [props.studyplan.createdby] - The createdby attribute of the studyplan entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `createdby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { createdby: { id: 1, name: "Sample Createdby" } };
 *
 * <StudyPlanCreatedbyAttribute studyplan={studyplanEntity} />
 */
export const StudyPlanCreatedbyAttribute = ({studyplan}) => {
    const {createdby} = studyplan
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