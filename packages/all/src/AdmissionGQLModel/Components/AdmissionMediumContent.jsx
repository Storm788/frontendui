import { Col, Row } from "react-bootstrap"
import { ProgramLink } from "../../ProgramGQLModel"
import { CreatedBy } from "../../UserGQLModel/Components/CreatedBy"
import { ChangedBy } from "../../UserGQLModel/Components/ChangedBy"
/**
 * A component that displays medium-level content for an admission entity.
 *
 * This component renders a label "AdmissionMediumContent" followed by a serialized representation of the `admission` object
 * and any additional child content. It is designed to handle and display information about an admission entity object.
 *
 * @component
 * @param {Object} props - The properties for the AdmissionMediumContent component.
 * @param {Object} props.admission - The object representing the admission entity.
 * @param {string|number} props.admission.id - The unique identifier for the admission entity.
 * @param {string} props.admission.name - The name or label of the admission entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `admission` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const admissionEntity = { id: 123, name: "Sample Entity" };
 * 
 * <AdmissionMediumContent admission={admissionEntity}>
 *   <p>Additional information about the entity.</p>
 * </AdmissionMediumContent>
 */
export const AdmissionMediumContent = ({admission, children}) => {
    const {
        name, program, createdby, changedby,
        nameEn,
        stateId,
        programId,
        paymentInfoId,
        applicationStartDate,
        applicationLastDate,
        endDate,
        conditionDate,
        paymentDate,
        conditionExtendedDate,
        requestConditionExtendDate,
        requestExtraConditionsDate,
        requestExtraDateDate,
        examStartDate,
        examLastDate,
        studentEntryDate,
        paymentInfo,
        state,
        created,
        lastchange
    } = admission
    return (
        <>
            <Row>
                <Col>Program</Col>
                <Col>{admission?.program && <ProgramLink program={admission?.program} />}</Col>
            </Row>
            <Row>
                <Col>Název</Col>
                <Col>{name}</Col>
            </Row>
            <Row>
                <Col>applicationStartDate</Col>
                <Col>{applicationStartDate && `${new Date(applicationStartDate).toLocaleDateString()}`}</Col>
            </Row>
            <Row>
                <Col>applicationLastDate</Col>
                <Col>{applicationLastDate && `${new Date(applicationLastDate).toLocaleDateString()}`}</Col>
            </Row>
            <Row>
                <Col>endDate</Col>
                <Col>{endDate && `${new Date(endDate).toLocaleDateString()}`}</Col>
            </Row>
            <Row>
                <Col>JSON</Col>
                <Col><pre>{JSON.stringify(admission, null, 2)}</pre></Col>
            </Row>
            {children}
            <Row>
                <Col>Vytvořil@{created && `${new Date(created).toLocaleDateString()}`}</Col>
                <Col><CreatedBy createdby={admission?.createdby} /></Col>
            </Row>
            <Row>
                <Col>Upravil@{lastchange && `${new Date(lastchange).toLocaleDateString()}`}</Col>
                <Col><ChangedBy changedby={admission?.changedby} /></Col>
            </Row>
        </>
    )
}
