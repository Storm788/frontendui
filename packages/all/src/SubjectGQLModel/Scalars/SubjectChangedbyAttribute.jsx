/**
 * A component for displaying the `changedby` attribute of an subject entity.
 *
 * This component checks if the `changedby` attribute exists on the `subject` object. If `changedby` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `changedby` attribute.
 *
 * @component
 * @param {Object} props - The props for the SubjectChangedbyAttribute component.
 * @param {Object} props.subject - The object representing the subject entity.
 * @param {*} [props.subject.changedby] - The changedby attribute of the subject entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `changedby` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const subjectEntity = { changedby: { id: 1, name: "Sample Changedby" } };
 *
 * <SubjectChangedbyAttribute subject={subjectEntity} />
 */
export const SubjectChangedbyAttribute = ({subject}) => {
    const {changedby} = subject
    if (typeof changedby === 'undefined') return null
    return (
        <>
            Probably {'<ChangedbyMediumCard changedby=\{changedby\} />'} <br />
            <pre>{JSON.stringify(changedby, null, 4)}</pre>
        </>
    )
}