/**
 * A component for displaying the `guarantors` attribute of an subject entity.
 *
 * This component checks if the `guarantors` attribute exists on the `subject` object. If `guarantors` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `guarantors` attribute.
 *
 * @component
 * @param {Object} props - The props for the SubjectGuarantorsAttribute component.
 * @param {Object} props.subject - The object representing the subject entity.
 * @param {*} [props.subject.guarantors] - The guarantors attribute of the subject entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `guarantors` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const subjectEntity = { guarantors: { id: 1, name: "Sample Guarantors" } };
 *
 * <SubjectGuarantorsAttribute subject={subjectEntity} />
 */
export const SubjectGuarantorsAttribute = ({subject}) => {
    const {guarantors} = subject
    if (typeof guarantors === 'undefined') return null
    return (
        <>
            Probably {'<GuarantorsMediumCard guarantors=\{guarantors\} />'} <br />
            <pre>{JSON.stringify(guarantors, null, 4)}</pre>
        </>
    )
}