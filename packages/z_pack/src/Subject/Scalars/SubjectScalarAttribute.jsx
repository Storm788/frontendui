/**
 * A component for displaying the `scalar` attribute of an subject entity.
 *
 * This component checks if the `scalar` attribute exists on the `subject` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the SubjectScalarAttribute component.
 * @param {Object} props.subject - The object representing the subject entity.
 * @param {*} [props.subject.scalar] - The scalar attribute of the subject entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const subjectEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <SubjectScalarAttribute subject={subjectEntity} />
 */
export const SubjectScalarAttribute = ({subject}) => {
    const {scalar} = subject
    if (typeof scalar === 'undefined') return null
    return (
        <>
            Probably {'<ScalarMediumCard scalar=\{scalar\} />'} <br />
            {JSON.stringify(scalar)}
        </>
    )
}