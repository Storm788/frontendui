/**
 * A component for displaying the `scalar` attribute of an admission entity.
 *
 * This component checks if the `scalar` attribute exists on the `admission` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the AdmissionScalarAttribute component.
 * @param {Object} props.admission - The object representing the admission entity.
 * @param {*} [props.admission.scalar] - The scalar attribute of the admission entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const admissionEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <AdmissionScalarAttribute admission={admissionEntity} />
 */
export const AdmissionScalarAttribute = ({admission}) => {
    const {scalar} = admission
    if (typeof scalar === 'undefined') return null
    return (
        <>
            Probably {'<ScalarMediumCard scalar=\{scalar\} />'} <br />
            {JSON.stringify(scalar)}
        </>
    )
}