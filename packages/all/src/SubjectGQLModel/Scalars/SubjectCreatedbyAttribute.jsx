/**
 * A component for displaying the `createdby` attribute of an subject entity.
 *
 * This component checks if the `createdby` attribute exists on the `subject` object. If `createdby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `createdby` attribute.
 *
 * @component
 * @param {Object} props - The props for the SubjectCreatedbyAttribute component.
 * @param {Object} props.subject - The object representing the subject entity.
 * @param {*} [props.subject.createdby] - The createdby attribute of the subject entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `createdby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const subjectEntity = { createdby: { id: 1, name: "Sample Createdby" } };
 *
 * <SubjectCreatedbyAttribute subject={subjectEntity} />
 */
export const SubjectCreatedbyAttribute = ({subject}) => {
    const {createdby} = subject
    if (typeof createdby === 'undefined') return null
    return (
        <>
            Probably {'<CreatedbyMediumCard createdby=\{createdby\} />'} <br />
            <pre>{JSON.stringify(createdby, null, 4)}</pre>
        </>
    )
}