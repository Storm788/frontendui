import { Input, Options, Select } from "@hrbolek/uoisfrontend-shared"
import { PaymentInfoReadPageAsyncAction } from "../../PaymentInfoGQLModel"
import { ProgramReadPageAsyncAction } from "../../ProgramGQLModel"
import { StateReadPageAsyncAction } from "../../StateGQLModel"

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
export const AdmissionMediumEditableContent = ({admission, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    return (
        <>           
            <Select id={"stateId"} label={"Stav"} className="form-control" defaultValue={admission?.programId} onChange={onChange} onBlur={onBlur}>
                <Options asyncAction={StateReadPageAsyncAction} params = {{limit: 100}} />
            </Select>
            <Select id={"programId"} label={"Program"} className="form-control" defaultValue={admission?.programId} onChange={onChange} onBlur={onBlur}>
                <Options asyncAction={ProgramReadPageAsyncAction} params = {{limit: 100}} />
            </Select>
            <Select id={"paymentInfoId"} label={"Platby"} className="form-control" defaultValue={admission?.programId} onChange={onChange} onBlur={onBlur}>
                <Options asyncAction={PaymentInfoReadPageAsyncAction} params = {{limit: 100}} />
            </Select>
            <Input id={"name"} label={"Název"} className="form-control" defaultValue={admission?.name|| "Název"} onChange={onChange} onBlur={onBlur} />
            <Input id={"nameEn"} label={"Anglický název"} className="form-control" defaultValue={admission?.name_en|| "Anglický název"} onChange={onChange} onBlur={onBlur} />

            <Input type="date" id={"applicationStartDate"} label={"Datum otevření"} className="form-control" defaultValue={admission?.applicationStartDate?.slice(0, 10)} onChange={onChange} onBlur={onBlur} />
            <Input type="date" id={"applicationLastDate"} label={"Datum ukončení podávání přihlášek"} className="form-control" defaultValue={admission?.applicationLastDate?.slice(0, 10)} onChange={onChange} onBlur={onBlur} />
            <Input type="date" id={"endDate"} label={"Konec přijímacího řízení"} className="form-control" defaultValue={admission?.endDate?.slice(0, 10)} onChange={onChange} onBlur={onBlur} />
            <Input type="date" id={"conditionDate"} label={"Datum splnění podmínek"} className="form-control" defaultValue={admission?.conditionDate?.slice(0, 10)} onChange={onChange} onBlur={onBlur} />
            <Input type="date" id={"paymentDate"} label={"Datum platby"} className="form-control" defaultValue={admission?.paymentDate?.slice(0, 10)} onChange={onChange} onBlur={onBlur} />
            <Input type="date" id={"conditionExtendedDate"} label={"Do kdy lze požádat"} className="form-control" defaultValue={admission?.conditionExtendedDate?.slice(0, 10)} onChange={onChange} onBlur={onBlur} />
            <Input type="date" id={"requestConditionExtendDate"} label={"Do kdy lze požádat"} className="form-control" defaultValue={admission?.requestConditionExtendDate?.slice(0, 10)} onChange={onChange} onBlur={onBlur} />
            <Input type="date" id={"requestExtraConditionsDate"} label={"Do kdy lze požádat"} className="form-control" defaultValue={admission?.requestExtraConditionsDate?.slice(0, 10)} onChange={onChange} onBlur={onBlur} />
            <Input type="date" id={"requestExtraDateDate"} label={"Do kdy lze požádat"} className="form-control" defaultValue={admission?.requestExtraDateDate?.slice(0, 10)} onChange={onChange} onBlur={onBlur} />
            <Input type="date" id={"examStartDate"} label={"Počátek zkoušek"} className="form-control" defaultValue={admission?.examStartDate?.slice(0, 10)} onChange={onChange} onBlur={onBlur} />
            <Input type="date" id={"examLastDate"} label={"Konec zkoušek"} className="form-control" defaultValue={admission?.examLastDate?.slice(0, 10)} onChange={onChange} onBlur={onBlur} />
            <Input type="date" id={"studentEntryDate"} label={"Datum zápisu"} className="form-control" defaultValue={admission?.studentEntryDate?.slice(0, 10)} onChange={onChange} onBlur={onBlur} />

            {children}
        </>
    )
}
